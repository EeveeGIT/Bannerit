import React, { useState } from "react";

interface ContentTabProps {
  settings: {
    headingSize?: number;
    isHeadingAnimated?: boolean;
    headingText?: string;
    headingAnimationTexts?: string[];
    headingAlign?: "left" | "center" | "right";
    headingColor?: string;
    subText?: string;
    isSubTextAnimated?: boolean; // New property for animated subtext
    subAnimationTexts?: string[]; // New property for animated subtext
    subTextColor?: string;
    subTextSize?: number; // New property for subtext size
    footerText?: string;
    footerTextColor?: string;
    footerTextSize?: number; // New property for footer text size
    ctaText?: string;
    ctaBackgroundColor?: string;
    ctaTextColor?: string;
    ctaUrl?: string; // New property for CTA URL
  };
  onSettingsChange: (newSettings: Partial<ContentTabProps["settings"]>) => void;
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
      {/* Headline Size */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Headline Size</h3>
        <div className="space-y-2">
          <label className="text-sm text-neutral-700">
            Size: {settings.headingSize || 24}px
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={settings.headingSize || 24} // Default to 24px if not set
            onChange={(e) =>
              onSettingsChange({
                headingSize: Math.max(10, Math.min(100, parseInt(e.target.value, 10))),
              })
            }
            className="w-full"
          />
        </div>
      </div>

      {/* Subtext */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Subtext</h3>

        {/* Fixed or Animated Text */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-neutral-700">
            <input
              type="radio"
              name="subTextType"
              checked={!settings.isSubTextAnimated}
              onChange={() => onSettingsChange({ isSubTextAnimated: false })}
            />
            Fixed Text
          </label>
          <label className="text-sm text-neutral-700">
            <input
              type="radio"
              name="subTextType"
              checked={settings.isSubTextAnimated}
              onChange={() => onSettingsChange({ isSubTextAnimated: true })}
            />
            Animated Text
          </label>
        </div>

        {/* Fixed Text Input */}
        {!settings.isSubTextAnimated && (
          <input
            type="text"
            placeholder="Your subtext"
            value={settings.subText}
            onChange={(e) => onSettingsChange({ subText: e.target.value })}
            className="w-full p-2 border border-neutral-300 rounded-md"
          />
        )}

        {/* Animated Text Input */}
        {settings.isSubTextAnimated && (
          <textarea
            placeholder="Enter animation texts, separated by commas"
            value={settings.subAnimationTexts?.join(", ") || ""}
            onChange={(e) =>
              onSettingsChange({
                subAnimationTexts: e.target.value.split(",").map((text) => text.trim()),
              })
            }
            rows={3}
            className="w-full p-2 border border-neutral-300 rounded-md"
          />
        )}

        {/* Subtext Size */}
        <div className="space-y-3">
          <h3 className="font-medium text-neutral-900">Subtext Size</h3>
          <div className="space-y-2">
            <label className="text-sm text-neutral-700">
              Size: {settings.subTextSize || 16}px
            </label>
            <input
              type="range"
              min="10"
              max="50"
              value={settings.subTextSize || 16} // Default to 16px if not set
              onChange={(e) =>
                onSettingsChange({
                  subTextSize: Math.max(10, Math.min(50, parseInt(e.target.value, 10))),
                })
              }
              className="w-full"
            />
          </div>
        </div>

        {/* Subtext Color */}
        <div className="relative">
          <input
            type="text"
            placeholder="Subtext Color"
            value={settings.subTextColor}
            onChange={(e) => onSettingsChange({ subTextColor: e.target.value })}
            className="w-full p-2 border border-neutral-300 rounded-md"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border border-neutral-300"
            style={{ backgroundColor: settings.subTextColor }}
            onClick={() => setShowSubTextColorPicker(true)}
          />
        </div>
      </div>

      {/* Footer Text */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Footer Text</h3>
        <input
          type="text"
          placeholder="Your footer text"
          value={settings.footerText}
          onChange={(e) => onSettingsChange({ footerText: e.target.value })}
          className="w-full p-2 border border-neutral-300 rounded-md"
        />

        {/* Footer Text Size */}
        <div className="space-y-3">
          <h3 className="font-medium text-neutral-900">Footer Text Size</h3>
          <div className="space-y-2">
            <label className="text-sm text-neutral-700">
              Size: {settings.footerTextSize || 12}px
            </label>
            <input
              type="range"
              min="10"
              max="50"
              value={settings.footerTextSize || 12} // Default to 12px if not set
              onChange={(e) =>
                onSettingsChange({
                  footerTextSize: Math.max(10, Math.min(50, parseInt(e.target.value, 10))),
                })
              }
              className="w-full"
            />
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Footer Text Color"
            value={settings.footerTextColor}
            onChange={(e) => onSettingsChange({ footerTextColor: e.target.value })}
            className="w-full p-2 border border-neutral-300 rounded-md"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border border-neutral-300"
            style={{ backgroundColor: settings.footerTextColor }}
            onClick={() => setShowFooterTextColorPicker(true)}
          />
        </div>
      </div>

      {/* CTA Button */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">CTA Button</h3>
        <input
          type="text"
          placeholder="Your CTA text"
          value={settings.ctaText}
          onChange={(e) => onSettingsChange({ ctaText: e.target.value })}
          className="w-full p-2 border border-neutral-300 rounded-md"
        />
        <div className="relative">
          <input
            type="text"
            placeholder="CTA Background Color"
            value={settings.ctaBackgroundColor}
            onChange={(e) => onSettingsChange({ ctaBackgroundColor: e.target.value })}
            className="w-full p-2 border border-neutral-300 rounded-md"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border border-neutral-300"
            style={{ backgroundColor: settings.ctaBackgroundColor }}
            onClick={() => setShowCtaBackgroundColorPicker(true)}
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="CTA Text Color"
            value={settings.ctaTextColor}
            onChange={(e) => onSettingsChange({ ctaTextColor: e.target.value })}
            className="w-full p-2 border border-neutral-300 rounded-md"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border border-neutral-300"
            style={{ backgroundColor: settings.ctaTextColor }}
            onClick={() => setShowCtaTextColorPicker(true)}
          />
        </div>

        {/* CTA URL */}
        <div className="space-y-3">
          <h3 className="font-medium text-neutral-900">CTA URL</h3>
          <input
            type="text"
            placeholder="Enter CTA URL"
            value={settings.ctaUrl || ""}
            onChange={(e) => onSettingsChange({ ctaUrl: e.target.value })}
            className="w-full p-2 border border-neutral-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}