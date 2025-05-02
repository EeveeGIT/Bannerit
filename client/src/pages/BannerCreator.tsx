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

/* ------------------------------------------------------------------ */
/* Alustavat asetukset ------------------------------------------------*/
/* ------------------------------------------------------------------ */

const DEFAULT_SETTINGS: BannerSettings = {
  width: 300,
  height: 600,
  headingAnimationTexts: [],
  subTextAnimationTexts: [],
  isHeadingAnimated: false,

  backgroundType: "animation",
  backgroundValue: "7", // punainen gradientti
  backgroundSize: "cover",
  backgroundPosition: "center",

  headingText: "Your Brand Message",
  headingFont: "Poppins",
  headingSize: 24,
  headingColor: "#fff7ea",
  headingAlign: "center",
  headingWeight: "bold",

  subText: "Discover our amazing products",
  subTextFont: "Poppins",
  subTextSize: 14,
  subTextColor: "#fff7ea",
  subTextWeight: "medium",
  subTextAlign: "center",

  footerText: "Terms and conditions apply",
  footerTextFont: "Poppins",
  footerTextSize: 10,
  footerTextColor: "#fff7ea",
  footerTextWeight: "normal",
  footerPosition: "default",

  showCta: false,
  ctaText: "Learn More",
  ctaBackgroundColor: "#fff7ea",
  ctaTextColor: "#202020",
  ctaUrl: "https://example.com",

  logoPath: "https://jobly.almamedia.fi/nostobannerit/nostoboksi_il/2024_test/jobly_logo.svg",
  logoPosition: "top-center",
  logoSize: 64,
  logoMargin: 8,
  headingOffsetX: 0,
  headingOffsetY: 0,
  subOffsetX: 0,
  subOffsetY: 0,
  ctaOffsetX: 0,
  ctaOffsetY: 0,
  logoOffsetX: 0,
  logoOffsetY: 0,
  footerOffsetX: 0,
  footerOffsetY: 0,
  brandColors: ["#ED2D26", "#f4817d", "#fff7ea", "#202020"],

  isClickable: false,
  clickUrl: "https://example.com",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",

  buttonBorderRadius: 4,
  buttonOffsetX: 0,
  buttonOffsetY: 0
};

/* ------------------------------------------------------------------ */
/* Pääkomponentti -----------------------------------------------------*/
/* ------------------------------------------------------------------ */

export default function BannerCreator() {
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] =
    useState<"design" | "content" | "code">("design");

  const [bannerSettings, setBannerSettings] =
    useState<BannerSettings>(DEFAULT_SETTINGS);

  /* ---------------- Handlerit ---------------- */

  const onSettingsChange = (partial: Partial<BannerSettings>) =>
    setBannerSettings(prev => ({ ...prev, ...partial }));

  const handleExportBanner = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2
      });

      const link = document.createElement("a");
      link.download = `banner-${bannerSettings.width}x${bannerSettings.height}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast({
        title: "Banner exported",
        description: "Your banner has been exported as an image."
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Export failed",
        description: "Failed to export banner. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSaveProject = () => {
    try {
      localStorage.setItem("bannerProject", JSON.stringify(bannerSettings));
      toast({
        title: "Project saved",
        description: "Your banner project has been saved locally."
      });
    } catch {
      toast({
        title: "Save failed",
        description: "Failed to save project. Please try again.",
        variant: "destructive"
      });
    }
  };

  /* ---------------- Render ---------------- */

  const htmlCode = generateHtmlCode(bannerSettings);

  return (
    <div className="flex flex-col h-screen">
      {/* yläpalkki */}
      <Header onExport={handleExportBanner} onSave={handleSaveProject} />

      <main className="flex-1 overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* vasen: bannerin esikatselu */}
          <BannerPreview ref={previewRef} settings={bannerSettings} />

          {/* oikea: välilehdet */}
          <section className="lg:w-1/2 h-full flex flex-col">
            {/* Tabs-nav */}
            <nav className="bg-white border-b border-neutral-200 px-4">
              <ul className="flex overflow-x-auto text-sm font-medium">
                {(["design", "content", "code"] as const).map(tab => (
                  <li key={tab} className="mr-1">
                    <button
                      role="tab"
                      aria-selected={activeTab === tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 ${
                        activeTab === tab
                          ? "border-b-2 border-primary text-primary"
                          : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Tab-sisältö */}
            <div className="flex-1 overflow-y-auto bg-white p-4">
              {activeTab === "design" && (
                <DesignTab
                  settings={bannerSettings}
                  onSettingsChange={onSettingsChange}
                />
              )}

              {activeTab === "content" && (
                <ContentTab
                  settings={bannerSettings}
                  onSettingsChange={onSettingsChange}
                />
              )}

              {activeTab === "code" && (
                <CodeTab htmlCode={htmlCode} settings={bannerSettings} />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
