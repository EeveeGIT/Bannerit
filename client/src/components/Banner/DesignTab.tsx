// client/src/components/Banner/DesignTab.tsx
import { useState } from "react";
import { BannerSettings } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import LogoUploader from "../LogoUploader";

// Animation backgrounds
const ANIMATIONS = [
  { id: "1", gradient: "linear-gradient(-45deg, #ED2D26, #f4817d, #ED2D26)" },
  { id: "2", gradient: "linear-gradient(-45deg, #202020, #4b4b4b, #202020)" },
  { id: "3", gradient: "linear-gradient(-45deg, #fff7ea, #e7dccb, #fff7ea)" },
];

// Predefined banner sizes
const BANNER_SIZES = [
  { id: "300x600", label: "300 × 600", width: 300, height: 600 },
  { id: "300x300", label: "300 × 300", width: 300, height: 300 },
  { id: "320x320", label: "320 × 320", width: 320, height: 320 },
  { id: "468x400", label: "468 × 400", width: 468, height: 400 },
  { id: "980x400", label: "980 × 400", width: 980, height: 400 },
  { id: "300x431", label: "300 × 431", width: 300, height: 431 },
  { id: "custom", label: "Custom Size", width: 0, height: 0 },
];

// Brändivärit
const DEFAULT_BRAND_COLORS = ["#ED2D26", "#f4817d", "#fff7ea", "#202020"];

interface DesignTabProps {
  settings: BannerSettings;
  onSettingsChange: (s: Partial<BannerSettings>) => void;
}

export default function DesignTab({ settings, onSettingsChange }: DesignTabProps) {
  const [uploadingBackground, setUploadingBackground] = useState(false);
  const { toast } = useToast();

  const [selectedSize, setSelectedSize] = useState(() => {
    const match = BANNER_SIZES.find(
      (sz) => sz.width === settings.width && sz.height === settings.height
    );
    return match ? match.id : "custom";
  });

  const [customW, setCustomW] = useState(settings.width);
  const [customH, setCustomH] = useState(settings.height);

  const handleSizeChange = (id: string) => {
    setSelectedSize(id);
    const preset = BANNER_SIZES.find((sz) => sz.id === id);
    if (preset && id !== "custom") {
      onSettingsChange({ width: preset.width, height: preset.height });
    }
  };

  const handleCustomSize = () => {
    if (customW > 0 && customH > 0) {
      onSettingsChange({ width: customW, height: customH });
    }
  };

  const handleBgType = (t: string) => {
    let val = settings.backgroundValue;
    if (t === "animation" && !/^\d+$/.test(val)) val = "1";
    if (t === "color" && !/^#/.test(val)) val = DEFAULT_BRAND_COLORS[0];
    onSettingsChange({ backgroundType: t as any, backgroundValue: val });
  };

  const handleUploadBg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const fd = new FormData();
    fd.append("background", e.target.files[0]);
    setUploadingBackground(true);
    try {
      const res = await fetch("/api/upload/background", {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      const { filePath } = await res.json();
      onSettingsChange({ backgroundType: "image", backgroundValue: filePath });
      toast({ title: "Background uploaded", description: "Taustakuva on nyt ladattu." });
    } catch {
      toast({
        title: "Upload failed",
        description: "Taustakuvaa ei voitu ladata.",
        variant: "destructive",
      });
    } finally {
      setUploadingBackground(false);
    }
  };

  return (
    <div role="tabpanel" className="space-y-6">
      {/* Banner Size */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Banner Size</h3>
        <div className="grid grid-cols-2 gap-3">
          <Select value={selectedSize} onValueChange={handleSizeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {BANNER_SIZES.map((sz) => (
                <SelectItem key={sz.id} value={sz.id}>
                  {sz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                type="number"
                placeholder="Width"
                value={customW}
                onChange={(e) => setCustomW(+e.target.value)}
                onBlur={handleCustomSize}
                disabled={selectedSize !== "custom"}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">px</span>
            </div>
            <div className="flex-1 relative">
              <Input
                type="number"
                placeholder="Height"
                value={customH}
                onChange={(e) => setCustomH(+e.target.value)}
                onBlur={handleCustomSize}
                disabled={selectedSize !== "custom"}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Background</h3>
        <div className="grid grid-cols-2 gap-3">
          <Select value={settings.backgroundType} onValueChange={handleBgType}>
            <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="animation">Animated</SelectItem>
              <SelectItem value="color">Solid</SelectItem>
              <SelectItem value="image">Image</SelectItem>
            </SelectContent>
          </Select>
          <label className="w-full flex justify-center items-center px-3 py-2 bg-white border rounded-md cursor-pointer hover:bg-neutral-50">
            {uploadingBackground ? "Uploading…" : "Upload"}
            <input type="file" accept="image/*" className="hidden" onChange={handleUploadBg} />
          </label>
        </div>
        {settings.backgroundType === "animation" && (
          <div className="grid grid-cols-3 gap-2">
            {ANIMATIONS.map((a) => (
              <button
                key={a.id}
                className={`h-16 rounded-md overflow-hidden ring-offset-2 ${
                  settings.backgroundValue === a.id
                    ? "ring-2 ring-primary"
                    : "hover:ring-2 hover:ring-primary focus:ring-2 focus:ring-primary"
                }`}
                style={{ backgroundImage: a.gradient, backgroundSize: "400% 400%" }}
                onClick={() =>
                  onSettingsChange({
                    backgroundType: "animation",
                    backgroundValue: a.id,
                  })
                }
              />
            ))}
          </div>
        )}
        {settings.backgroundType === "color" && (
          <div className="grid grid-cols-4 gap-2">
            {DEFAULT_BRAND_COLORS.map((c, i) => (
              <button
                key={i}
                className={`h-10 rounded-md ring-offset-2 ${
                  settings.backgroundValue === c
                    ? "ring-2 ring-primary"
                    : "hover:ring-2 hover:ring-primary focus:ring-2 focus:ring-primary"
                }`}
                style={{ backgroundColor: c }}
                onClick={() =>
                  onSettingsChange({
                    backgroundType: "color",
                    backgroundValue: c,
                    brandColors: DEFAULT_BRAND_COLORS,
                  })
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Logo */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Logo</h3>
        <LogoUploader onLoad={(url) => onSettingsChange({ logoPath: url })} />

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Logo position</label>
          <Select
            value={settings.logoPosition}
            onValueChange={(value) =>
              onSettingsChange({ logoPosition: value as BannerSettings["logoPosition"] })
            }
          >
            <SelectTrigger><SelectValue placeholder="Position" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="top-left">Top Left</SelectItem>
              <SelectItem value="top-center">Top Center</SelectItem>
              <SelectItem value="top-right">Top Right</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
              <SelectItem value="bottom-center">Bottom Center</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Logo Size & Offsets */}
        <div className="space-y-2">
          <label className="text-xs text-neutral-500">Logo Size: {settings.logoSize}px</label>
          <input
            type="range"
            min={32}
            max={128}
            step={4}
            value={settings.logoSize}
            onChange={(e) => onSettingsChange({ logoSize: Number(e.target.value) })}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-neutral-500">X-offset: {settings.logoOffsetX}px</label>
          <input
            type="range"
            min={-200}
            max={200}
            value={settings.logoOffsetX}
            onChange={(e) => onSettingsChange({ logoOffsetX: Number(e.target.value) })}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-neutral-500">Y-offset: {settings.logoOffsetY}px</label>
          <input
            type="range"
            min={-200}
            max={200}
            value={settings.logoOffsetY}
            onChange={(e) => onSettingsChange({ logoOffsetY: Number(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
