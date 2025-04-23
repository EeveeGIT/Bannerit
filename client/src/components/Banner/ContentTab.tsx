import { useState } from "react";
import { BannerSettings } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ColorPicker from "./ColorPicker";

// Font options
const HEADING_FONTS = ["Poppins", "Roboto", "Montserrat", "Open Sans", "Playfair Display"];
const SUBHEADING_FONTS = ["Poppins", "Inter", "Roboto", "Montserrat", "Open Sans"];
const FOOTER_FONTS = ["Poppins", "Inter", "Roboto", "Montserrat", "Open Sans"];

// Font weight options
const FONT_WEIGHTS = [
  { value: "normal", label: "Normal (400)" },
  { value: "medium", label: "Medium (500)" },
  { value: "semibold", label: "Semibold (600)" },
  { value: "bold", label: "Bold (700)" },
  { value: "extrabold", label: "Extra Bold (800)" }
];

interface ContentTabProps {
  settings: BannerSettings;
  onSettingsChange: (settings: Partial<BannerSettings>) => void;
}

export default function ContentTab({ settings, onSettingsChange }: ContentTabProps) {
  const [showHeadingColorPicker, setShowHeadingColorPicker] = useState(false);
  const [showSubTextColorPicker, setShowSubTextColorPicker] = useState(false);
  const [showFooterTextColorPicker, setShowFooterTextColorPicker] = useState(false);
  const [showCtaBackgroundColorPicker, setShowCtaBackgroundColorPicker] = useState(false);
  const [showCtaTextColorPicker, setShowCtaTextColorPicker] = useState(false);

  const handleHeadingAlign = (align: string) => {
    onSettingsChange({ headingAlign: align as "left" | "center" | "right" });
  };

  return (
    <div role="tabpanel" className="space-y-6">
      {/* Headline Text */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Headline Text</h3>
        <Input
          type="text"
          placeholder="Your headline text"
          value={settings.headingText}
          onChange={(e) => onSettingsChange({ headingText: e.target.value })}
        />
        
        <div className="grid grid-cols-2 gap-3">
          <Select 
            value={settings.headingFont} 
            onValueChange={(value) => onSettingsChange({ headingFont: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {HEADING_FONTS.map(font => (
                <SelectItem key={font} value={font}>{font}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex rounded-md overflow-hidden">
            <button 
              className={`flex-1 bg-white border border-r-0 border-neutral-300 py-2 hover:bg-neutral-50 text-neutral-700 ${settings.headingAlign === 'left' ? 'bg-neutral-100' : ''}`}
              onClick={() => handleHeadingAlign('left')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              className={`flex-1 bg-white border border-neutral-300 py-2 hover:bg-neutral-50 text-neutral-700 ${settings.headingAlign === 'center' ? 'bg-neutral-100' : ''}`}
              onClick={() => handleHeadingAlign('center')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3 5a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm-3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              className={`flex-1 bg-white border border-l-0 border-neutral-300 py-2 hover:bg-neutral-50 text-neutral-700 ${settings.headingAlign === 'right' ? 'bg-neutral-100' : ''}`}
              onClick={() => handleHeadingAlign('right')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm7 5a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zm-7 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Input
              type="number"
              placeholder="Font size"
              value={settings.headingSize}
              onChange={(e) => onSettingsChange({ headingSize: Number(e.target.value) })}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-xs">px</span>
          </div>
          
          <div className="relative">
            <Input
              type="text"
              placeholder="Color"
              value={settings.headingColor}
              onChange={(e) => onSettingsChange({ headingColor: e.target.value })}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border border-neutral-300"
              style={{ backgroundColor: settings.headingColor }}
              onClick={() => setShowHeadingColorPicker(true)}
            />
          </div>
        </div>
        
        <Select 
          value={settings.headingWeight} 
          onValueChange={(value) => onSettingsChange({ headingWeight: value as "normal" | "medium" | "semibold" | "bold" | "extrabold" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select font weight" />
          </SelectTrigger>
          <SelectContent>
            {FONT_WEIGHTS.map(weight => (
              <SelectItem key={weight.value} value={weight.value}>{weight.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Subheading Text */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Subheading Text</h3>
        <Input
          type="text"
          placeholder="Your subheading text"
          value={settings.subText}
          onChange={(e) => onSettingsChange({ subText: e.target.value })}
        />
        
        <div className="grid grid-cols-2 gap-3">
          <Select 
            value={settings.subTextFont} 
            onValueChange={(value) => onSettingsChange({ subTextFont: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {SUBHEADING_FONTS.map(font => (
                <SelectItem key={font} value={font}>{font}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Input
              type="number"
              placeholder="Font size"
              value={settings.subTextSize}
              onChange={(e) => onSettingsChange({ subTextSize: Number(e.target.value) })}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-xs">px</span>
          </div>
        </div>
        
        <div className="relative">
          <Input
            type="text"
            placeholder="Color"
            value={settings.subTextColor}
            onChange={(e) => onSettingsChange({ subTextColor: e.target.value })}
          />
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border border-neutral-300"
            style={{ backgroundColor: settings.subTextColor }}
            onClick={() => setShowSubTextColorPicker(true)}
          />
        </div>
        
        <Select 
          value={settings.subTextWeight} 
          onValueChange={(value) => onSettingsChange({ subTextWeight: value as "normal" | "medium" | "semibold" | "bold" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select font weight" />
          </SelectTrigger>
          <SelectContent>
            {FONT_WEIGHTS.filter(w => w.value !== "extrabold").map(weight => (
              <SelectItem key={weight.value} value={weight.value}>{weight.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Footer Text */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Footer Text</h3>
        <Input
          type="text"
          placeholder="Your footer text"
          value={settings.footerText}
          onChange={(e) => onSettingsChange({ footerText: e.target.value })}
        />
        
        <div className="grid grid-cols-2 gap-3">
          <Select 
            value={settings.footerTextFont} 
            onValueChange={(value) => onSettingsChange({ footerTextFont: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {FOOTER_FONTS.map(font => (
                <SelectItem key={font} value={font}>{font}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Input
              type="number"
              placeholder="Font size"
              value={settings.footerTextSize}
              onChange={(e) => onSettingsChange({ footerTextSize: Number(e.target.value) })}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-xs">px</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Color"
              value={settings.footerTextColor}
              onChange={(e) => onSettingsChange({ footerTextColor: e.target.value })}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border border-neutral-300"
              style={{ backgroundColor: settings.footerTextColor }}
              onClick={() => setShowFooterTextColorPicker(true)}
            />
          </div>
          
          <Select 
            value={settings.footerTextWeight} 
            onValueChange={(value) => onSettingsChange({ footerTextWeight: value as "normal" | "medium" | "semibold" | "bold" })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font weight" />
            </SelectTrigger>
            <SelectContent>
              {FONT_WEIGHTS.filter(w => w.value !== "extrabold").map(weight => (
                <SelectItem key={weight.value} value={weight.value}>{weight.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Call to Action Button */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-neutral-900">Call to Action Button</h3>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="showCta" 
              checked={settings.showCta} 
              onCheckedChange={(checked) => onSettingsChange({ showCta: checked === true })}
            />
            <Label htmlFor="showCta">Show button</Label>
          </div>
        </div>
        
        <Input
          type="text"
          placeholder="Button text"
          value={settings.ctaText}
          onChange={(e) => onSettingsChange({ ctaText: e.target.value })}
          disabled={!settings.showCta}
        />
        
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Background color"
              value={settings.ctaBackgroundColor}
              onChange={(e) => onSettingsChange({ ctaBackgroundColor: e.target.value })}
              disabled={!settings.showCta}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border border-neutral-300"
              style={{ backgroundColor: settings.ctaBackgroundColor }}
              onClick={() => settings.showCta && setShowCtaBackgroundColorPicker(true)}
              disabled={!settings.showCta}
            />
          </div>
          
          <div className="relative">
            <Input
              type="text"
              placeholder="Text color"
              value={settings.ctaTextColor}
              onChange={(e) => onSettingsChange({ ctaTextColor: e.target.value })}
              disabled={!settings.showCta}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border border-neutral-300"
              style={{ backgroundColor: settings.ctaTextColor }}
              onClick={() => settings.showCta && setShowCtaTextColorPicker(true)}
              disabled={!settings.showCta}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="buttonBorderRadius">Button Corner Radius</Label>
          <div className="flex items-center space-x-2">
            <input
              id="buttonBorderRadius"
              type="range"
              min="0"
              max="20"
              step="1"
              value={settings.buttonBorderRadius || 4}
              onChange={(e) => onSettingsChange({ buttonBorderRadius: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              disabled={!settings.showCta}
            />
            <span className="text-sm text-neutral-500">{settings.buttonBorderRadius || 4}px</span>
          </div>
        </div>
        
        <Input
          type="text"
          placeholder="URL"
          value={settings.ctaUrl}
          onChange={(e) => onSettingsChange({ ctaUrl: e.target.value })}
          disabled={!settings.showCta}
        />
      </div>
      
      {/* Banner Click Settings */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-neutral-900">Banner Click Settings</h3>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="isClickable" 
              checked={settings.isClickable} 
              onCheckedChange={(checked) => onSettingsChange({ isClickable: checked === true })}
            />
            <Label htmlFor="isClickable">Make entire banner clickable</Label>
          </div>
        </div>
        
        <Input
          type="text"
          placeholder="Destination URL"
          value={settings.clickUrl}
          onChange={(e) => onSettingsChange({ clickUrl: e.target.value })}
          disabled={!settings.isClickable}
        />
        
        <h4 className="text-sm font-medium text-neutral-700">UTM Parameters</h4>
        
        <div className="grid grid-cols-3 gap-3">
          <Input
            type="text"
            placeholder="Source"
            value={settings.utmSource}
            onChange={(e) => onSettingsChange({ utmSource: e.target.value })}
            disabled={!settings.isClickable}
          />
          
          <Input
            type="text"
            placeholder="Medium"
            value={settings.utmMedium}
            onChange={(e) => onSettingsChange({ utmMedium: e.target.value })}
            disabled={!settings.isClickable}
          />
          
          <Input
            type="text"
            placeholder="Campaign"
            value={settings.utmCampaign}
            onChange={(e) => onSettingsChange({ utmCampaign: e.target.value })}
            disabled={!settings.isClickable}
          />
        </div>
      </div>

      {/* Color Pickers */}
      {showHeadingColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-80">
            <h3 className="font-medium mb-3">Heading Color</h3>
            <ColorPicker
              color={settings.headingColor}
              onChange={(color) => {
                onSettingsChange({ headingColor: color });
                setShowHeadingColorPicker(false);
              }}
              onClose={() => setShowHeadingColorPicker(false)}
            />
          </div>
        </div>
      )}

      {showSubTextColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-80">
            <h3 className="font-medium mb-3">Subheading Color</h3>
            <ColorPicker
              color={settings.subTextColor}
              onChange={(color) => {
                onSettingsChange({ subTextColor: color });
                setShowSubTextColorPicker(false);
              }}
              onClose={() => setShowSubTextColorPicker(false)}
            />
          </div>
        </div>
      )}

      {showCtaBackgroundColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-80">
            <h3 className="font-medium mb-3">Button Background Color</h3>
            <ColorPicker
              color={settings.ctaBackgroundColor}
              onChange={(color) => {
                onSettingsChange({ ctaBackgroundColor: color });
                setShowCtaBackgroundColorPicker(false);
              }}
              onClose={() => setShowCtaBackgroundColorPicker(false)}
            />
          </div>
        </div>
      )}

      {showCtaTextColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-80">
            <h3 className="font-medium mb-3">Button Text Color</h3>
            <ColorPicker
              color={settings.ctaTextColor}
              onChange={(color) => {
                onSettingsChange({ ctaTextColor: color });
                setShowCtaTextColorPicker(false);
              }}
              onClose={() => setShowCtaTextColorPicker(false)}
            />
          </div>
        </div>
      )}
      
      {showFooterTextColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-80">
            <h3 className="font-medium mb-3">Footer Text Color</h3>
            <ColorPicker
              color={settings.footerTextColor}
              onChange={(color) => {
                onSettingsChange({ footerTextColor: color });
                setShowFooterTextColorPicker(false);
              }}
              onClose={() => setShowFooterTextColorPicker(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
