import { useState, useRef } from "react";
import BannerPreview from "@/components/Banner/BannerPreview";
import DesignTab from "@/components/Banner/DesignTab";
import ContentTab from "@/components/Banner/ContentTab";
import CodeTab from "@/components/Banner/CodeTab";
import Header from "@/components/Banner/Header";
import { BannerSettings } from "@/lib/types";
import { generateHtmlCode } from "@/lib/htmlGenerator";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

export default function BannerCreator() {
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"design" | "content" | "code">("design");
  const [bannerSettings, setBannerSettings] = useState<BannerSettings>({
    width: 300,
    height: 600,
    backgroundType: "animation",
    backgroundValue: "7", // Red gradient animation as default
    backgroundSize: "cover",
    backgroundPosition: "center",
    headingText: "Your Brand Message",
    headingFont: "Poppins",
    headingSize: 24,
    headingColor: "#fff7ea", // Cream color as requested
    headingAlign: "center",
    headingWeight: "bold",
    subText: "Discover our amazing products",
    subTextFont: "Poppins",
    subTextSize: 14,
    subTextColor: "#fff7ea", // Cream color as requested
    subTextWeight: "medium",
    footerText: "Terms and conditions apply",
    footerTextFont: "Poppins",
    footerTextSize: 10,
    footerTextColor: "#fff7ea", // Cream color as requested
    footerTextWeight: "normal",
    footerPosition: "default",
    showCta: false,
    ctaText: "Learn More",
    ctaBackgroundColor: "#fff7ea", // Cream color as requested for button
    ctaTextColor: "#202020", // Dark text for CTA button as requested
    ctaUrl: "https://example.com",
    logoPath: "",
    logoPosition: "top-left",
    logoSize: 64,
    logoMargin: 8,
    brandColors: ["#ED2D26", "#f4817d", "#fff7ea", "#202020"],
    isClickable: false,
    clickUrl: "https://example.com",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    buttonBorderRadius: 4
  });

  const handleSettingsChange = (newSettings: Partial<BannerSettings>) => {
    setBannerSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleExportBanner = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current, { 
          backgroundColor: null,
          scale: 2 // Higher quality
        });
        
        const link = document.createElement('a');
        link.download = `banner-${bannerSettings.width}x${bannerSettings.height}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        toast({
          title: "Banner exported",
          description: "Your banner has been exported as an image.",
        });
      } catch (error) {
        console.error('Error exporting banner:', error);
        toast({
          title: "Export failed",
          description: "Failed to export banner. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleSaveProject = () => {
    try {
      localStorage.setItem('bannerProject', JSON.stringify(bannerSettings));
      toast({
        title: "Project saved",
        description: "Your banner project has been saved locally.",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Failed to save project. Please try again.",
        variant: "destructive"
      });
    }
  };

  const htmlCode = generateHtmlCode(bannerSettings);

  return (
    <div className="flex flex-col h-screen">
      <Header onExport={handleExportBanner} onSave={handleSaveProject} />
      
      <main className="flex-1 overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          <BannerPreview 
            settings={bannerSettings} 
            ref={previewRef}
          />
          
          <div className="lg:w-1/2 h-full flex flex-col">
            {/* Tabs Navigation */}
            <div className="bg-white border-b border-neutral-200 px-4">
              <ul className="flex overflow-x-auto" role="tablist">
                <li className="mr-1">
                  <button 
                    className={`px-4 py-3 font-medium text-sm ${activeTab === 'design' ? 'border-b-2 border-primary text-primary' : 'text-neutral-600 hover:text-neutral-900'}`} 
                    role="tab" 
                    aria-selected={activeTab === 'design'} 
                    onClick={() => setActiveTab('design')}
                  >
                    Design
                  </button>
                </li>
                <li className="mr-1">
                  <button 
                    className={`px-4 py-3 font-medium text-sm ${activeTab === 'content' ? 'border-b-2 border-primary text-primary' : 'text-neutral-600 hover:text-neutral-900'}`} 
                    role="tab" 
                    aria-selected={activeTab === 'content'} 
                    onClick={() => setActiveTab('content')}
                  >
                    Content
                  </button>
                </li>
                <li className="mr-1">
                  <button 
                    className={`px-4 py-3 font-medium text-sm ${activeTab === 'code' ? 'border-b-2 border-primary text-primary' : 'text-neutral-600 hover:text-neutral-900'}`} 
                    role="tab" 
                    aria-selected={activeTab === 'code'} 
                    onClick={() => setActiveTab('code')}
                  >
                    Code
                  </button>
                </li>
              </ul>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto bg-white p-4">
              {activeTab === 'design' && (
                <DesignTab 
                  settings={bannerSettings} 
                  onSettingsChange={handleSettingsChange} 
                />
              )}
              
              {activeTab === 'content' && (
                <ContentTab 
                  settings={bannerSettings} 
                  onSettingsChange={handleSettingsChange} 
                />
              )}
              
              {activeTab === 'code' && (
                <CodeTab 
                  htmlCode={htmlCode} 
                  settings={bannerSettings} 
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
