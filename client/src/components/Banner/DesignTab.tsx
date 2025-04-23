import { useState, useEffect } from "react";
import { BannerSettings } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import ColorPicker from "./ColorPicker";

// Animation backgrounds
const ANIMATIONS = [
  { id: "1", gradient: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)" },
  { id: "2", gradient: "linear-gradient(-45deg, #3B82F6, #6366F1, #8B5CF6, #A855F7)" },
  { id: "3", gradient: "linear-gradient(-45deg, #10B981, #059669, #047857, #065F46)" },
  { id: "4", gradient: "linear-gradient(-45deg, #F59E0B, #FBBF24, #F59E0B, #D97706)" },
  { id: "5", gradient: "linear-gradient(-45deg, #111827, #1F2937, #374151, #4B5563)" },
  { id: "6", gradient: "linear-gradient(-45deg, #6366F1, #4F46E5, #4338CA, #3730A3)" },
];

// Logo design elements
const LOGO_ELEMENTS = [
  { id: "1", path: "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_1280.png" },
  { id: "2", path: "https://cdn.pixabay.com/photo/2017/01/31/13/14/animal-2023924_1280.png" },
  { id: "3", path: "https://cdn.pixabay.com/photo/2017/01/13/01/22/rocket-1976107_1280.png" },
  { id: "4", path: "https://cdn.pixabay.com/photo/2016/11/07/13/04/yoga-1805784_1280.png" },
];

// Predefined banner sizes
const BANNER_SIZES = [
  { id: "728x90", label: "Leaderboard - 728 × 90", width: 728, height: 90 },
  { id: "300x250", label: "Medium Rectangle - 300 × 250", width: 300, height: 250 },
  { id: "300x600", label: "Half Page - 300 × 600", width: 300, height: 600 },
  { id: "320x50", label: "Mobile Banner - 320 × 50", width: 320, height: 50 },
  { id: "160x600", label: "Skyscraper - 160 × 600", width: 160, height: 600 },
  { id: "custom", label: "Custom Size", width: 0, height: 0 },
];

// Brand colors
const DEFAULT_BRAND_COLORS = ["#3B82F6", "#10B981", "#6366F1", "#F59E0B"];

interface DesignTabProps {
  settings: BannerSettings;
  onSettingsChange: (settings: Partial<BannerSettings>) => void;
}

export default function DesignTab({ settings, onSettingsChange }: DesignTabProps) {
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBackground, setUploadingBackground] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAddBrandColorPicker, setShowAddBrandColorPicker] = useState(false);
  const [newBrandColor, setNewBrandColor] = useState("#000000");
  const [selectedSize, setSelectedSize] = useState(() => {
    const matchingSize = BANNER_SIZES.find(
      size => size.width === settings.width && size.height === settings.height
    );
    return matchingSize ? matchingSize.id : "custom";
  });
  const [customWidth, setCustomWidth] = useState(settings.width);
  const [customHeight, setCustomHeight] = useState(settings.height);
  const { toast } = useToast();
  
  // Use DEFAULT_BRAND_COLORS if settings.brandColors is not available
  const brandColorsToDisplay = settings.brandColors || DEFAULT_BRAND_COLORS;

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    
    const selectedPreset = BANNER_SIZES.find(preset => preset.id === size);
    if (selectedPreset && size !== "custom") {
      onSettingsChange({ 
        width: selectedPreset.width, 
        height: selectedPreset.height 
      });
    }
  };

  const handleCustomSizeChange = () => {
    if (customWidth > 0 && customHeight > 0) {
      onSettingsChange({ width: customWidth, height: customHeight });
    }
  };

  const handleBackgroundTypeChange = (type: string) => {
    let value = settings.backgroundValue;
    
    if (type === "animation" && !settings.backgroundValue.match(/^\d+$/)) {
      value = "2"; // Default animation
    } else if (type === "color" && !settings.backgroundValue.match(/^#/)) {
      value = "#3B82F6"; // Default color
    }
    
    onSettingsChange({ 
      backgroundType: type as "animation" | "color" | "image", 
      backgroundValue: value 
    });
  };

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("logo", file);
    
    setUploadingLogo(true);
    
    try {
      const response = await fetch("/api/upload/logo", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to upload logo");
      }
      
      const data = await response.json();
      onSettingsChange({ logoPath: data.filePath });
      toast({
        title: "Logo uploaded",
        description: "Your logo has been uploaded successfully.",
      });
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload logo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleUploadBackground = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("background", file);
    
    setUploadingBackground(true);
    
    try {
      const response = await fetch("/api/upload/background", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to upload background");
      }
      
      const data = await response.json();
      onSettingsChange({ 
        backgroundType: "image", 
        backgroundValue: data.filePath 
      });
      toast({
        title: "Background uploaded",
        description: "Your background image has been uploaded successfully.",
      });
    } catch (error) {
      console.error("Error uploading background:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload background. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingBackground(false);
    }
  };

  const handleAddCustomColor = () => {
    setShowColorPicker(true);
  };

  const handleSelectAnimation = (animationId: string) => {
    onSettingsChange({ 
      backgroundType: "animation", 
      backgroundValue: animationId 
    });
  };

  const handleSelectLogoElement = (logoPath: string) => {
    onSettingsChange({ logoPath });
  };

  const handleSelectColor = (color: string) => {
    onSettingsChange({ 
      backgroundType: "color", 
      backgroundValue: color 
    });
  };

  const handleColorPickerChange = (color: string) => {
    if (!brandColors.includes(color)) {
      setBrandColors([...brandColors.slice(0, 3), color]);
    }
    setShowColorPicker(false);
    onSettingsChange({ 
      backgroundType: "color", 
      backgroundValue: color 
    });
  };

  return (
    <div role="tabpanel" className="space-y-6">
      {/* Banner Size */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Banner Size</h3>
        <div className="grid grid-cols-2 gap-3">
          <Select value={selectedSize} onValueChange={handleSizeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select banner size" />
            </SelectTrigger>
            <SelectContent>
              {BANNER_SIZES.map(size => (
                <SelectItem key={size.id} value={size.id}>{size.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                type="number"
                placeholder="Width"
                value={customWidth}
                onChange={(e) => setCustomWidth(Number(e.target.value))}
                onBlur={handleCustomSizeChange}
                disabled={selectedSize !== "custom"}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-xs">px</span>
            </div>
            <div className="flex-1 relative">
              <Input
                type="number"
                placeholder="Height"
                value={customHeight}
                onChange={(e) => setCustomHeight(Number(e.target.value))}
                onBlur={handleCustomSizeChange}
                disabled={selectedSize !== "custom"}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-xs">px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Background</h3>
        <div className="grid grid-cols-2 gap-3">
          <Select 
            value={settings.backgroundType} 
            onValueChange={handleBackgroundTypeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select background type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="animation">Animated Background</SelectItem>
              <SelectItem value="color">Solid Color</SelectItem>
              <SelectItem value="image">Image</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex space-x-2">
            <label className="w-full flex justify-center items-center px-3 py-2 bg-white border border-neutral-300 rounded-md shadow-sm hover:bg-neutral-50 text-neutral-700 text-sm cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              {uploadingBackground ? "Uploading..." : "Upload"}
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleUploadBackground} 
                disabled={uploadingBackground}
              />
            </label>
          </div>
        </div>
        
        {/* Background Animation Selector */}
        {settings.backgroundType === "animation" && (
          <div className="grid grid-cols-3 gap-2">
            {ANIMATIONS.map(animation => (
              <button 
                key={animation.id}
                className={`bg-animation-${animation.id} h-16 rounded-md overflow-hidden hover:ring-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary ${settings.backgroundValue === animation.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleSelectAnimation(animation.id)}
                style={{ background: animation.gradient, backgroundSize: '400% 400%' }}
              />
            ))}
          </div>
        )}
        
        {/* Color Selector */}
        {settings.backgroundType === "color" && (
          <div className="grid grid-cols-5 gap-2">
            {brandColors.map((color, index) => (
              <button 
                key={index}
                className={`w-full h-10 rounded-md hover:ring-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary ${settings.backgroundValue === color ? 'ring-2 ring-primary' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleSelectColor(color)}
              />
            ))}
            <button 
              className="w-full h-10 flex items-center justify-center border border-dashed border-neutral-300 rounded-md hover:bg-neutral-50 text-neutral-500"
              onClick={handleAddCustomColor}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Logo */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Logo</h3>
        <div className="flex space-x-3">
          <label className="flex-1 flex justify-center items-center px-3 py-2 bg-white border border-neutral-300 rounded-md shadow-sm hover:bg-neutral-50 text-neutral-700 text-sm cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            {uploadingLogo ? "Uploading..." : "Upload Logo"}
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleUploadLogo} 
              disabled={uploadingLogo}
            />
          </label>
          
          <Select 
            value={settings.logoPosition} 
            onValueChange={(value) => onSettingsChange({ logoPosition: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select logo position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top-left">Top Left</SelectItem>
              <SelectItem value="top-right">Top Right</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
              <SelectItem value="center">Center</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Logo Elements */}
        <div className="grid grid-cols-4 gap-2">
          {LOGO_ELEMENTS.map(logo => (
            <button 
              key={logo.id}
              className={`p-2 border ${settings.logoPath === logo.path ? 'border-primary' : 'border-neutral-200'} rounded-md hover:border-primary focus:outline-none focus:border-primary`}
              onClick={() => handleSelectLogoElement(logo.path)}
            >
              <img src={logo.path} alt="Logo element" className="w-full h-auto" />
            </button>
          ))}
        </div>
      </div>

      {/* Color Picker Dialog */}
      {/* Brand Colors */}
      <div className="space-y-3">
        <h3 className="font-medium text-neutral-900">Brand Colors</h3>
        <div className="grid grid-cols-4 gap-2">
          {settings.brandColors && settings.brandColors.map((color, index) => (
            <div key={index} className="relative">
              <button 
                className="w-full h-10 rounded-md hover:ring-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ backgroundColor: color }}
                onClick={() => onSettingsChange({ 
                  backgroundType: "color", 
                  backgroundValue: color 
                })}
              />
              <button 
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm hover:bg-neutral-100"
                onClick={() => {
                  const updatedColors = [...(settings.brandColors || [])];
                  updatedColors.splice(index, 1);
                  onSettingsChange({ brandColors: updatedColors });
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <button 
            className="w-full h-10 flex items-center justify-center border border-dashed border-neutral-300 rounded-md hover:bg-neutral-50 text-neutral-500"
            onClick={() => setShowAddBrandColorPicker(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {showColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-80">
            <h3 className="font-medium mb-3">Choose Custom Color</h3>
            <ColorPicker
              color={settings.backgroundType === "color" ? settings.backgroundValue : "#3B82F6"}
              onChange={handleColorPickerChange}
              onClose={() => setShowColorPicker(false)}
            />
          </div>
        </div>
      )}
      
      {showAddBrandColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md w-80">
            <h3 className="font-medium mb-3">Add Brand Color</h3>
            <ColorPicker
              color={newBrandColor}
              onChange={(color) => {
                // Add new color to brand colors
                const updatedColors = [...(settings.brandColors || []), color];
                onSettingsChange({ brandColors: updatedColors });
                setShowAddBrandColorPicker(false);
              }}
              onClose={() => setShowAddBrandColorPicker(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
