import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
}

export default function ColorPicker({ color, onChange, onClose }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(color);
  
  // Convert hex to RGB for color input
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };
  
  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };
  
  // Handle color input change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };
  
  // Handle hex input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^#?([a-f\d]{0,6})$/i.test(value)) {
      const hex = value.startsWith('#') ? value : `#${value}`;
      setSelectedColor(hex);
    }
  };
  
  // Common colors palette
  const colorPalette = [
    "#F87171", "#FB923C", "#FBBF24", "#A3E635", "#4ADE80", 
    "#2DD4BF", "#22D3EE", "#38BDF8", "#818CF8", "#A78BFA", 
    "#F472B6", "#111827", "#374151", "#6B7280", "#FFFFFF"
  ];
  
  const handleApply = () => {
    onChange(selectedColor);
  };
  
  return (
    <div className="space-y-4">
      <input
        type="color"
        value={selectedColor}
        onChange={handleColorChange}
        className="w-full h-12 p-0 bg-transparent border-0 cursor-pointer"
      />
      
      <div className="grid grid-cols-5 gap-2">
        {colorPalette.map((color, idx) => (
          <button
            key={idx}
            className="w-full h-10 rounded hover:ring-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded" style={{ backgroundColor: selectedColor }} />
        <Input
          value={selectedColor}
          onChange={handleHexChange}
          placeholder="#FFFFFF"
          className="flex-1"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
}
