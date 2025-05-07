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

  // Bannerin animaatiot
  headingAnimationTexts: [],
  subTextAnimationTexts: [],
  isHeadingAnimated: false,

  backgroundType: "animation",
  backgroundValue: "7", // Punainen gradientti
  backgroundSize: "cover",
  backgroundPosition: "center",

  // Otsikko
  headingText: "Your Brand Message",
  headingFont: "Poppins",
  headingSize: 24,
  headingColor: "#fff7ea",
  headingAlign: "center",
  headingWeight: "bold",
  headingOffsetX: 0,
  headingOffsetY: 0,
  headingMarginTop: 50,
  headingMarginBottom: 5,

  // Alaotsikko
  subText: "Discover our amazing products",
  subTextFont: "Poppins",
  subTextSize: 14,
  subTextColor: "#fff7ea",
  subTextWeight: "medium",
  subTextAlign: "center",
  subOffsetX: 0,
  subOffsetY: 0,
  subtextMarginBottom: 10,
  isSubTextAnimated: false,

  // Footer
  footerText: "Terms and conditions apply",
  footerTextFont: "Poppins",
  footerTextSize: 10,
  footerTextColor: "#fff7ea",
  footerTextWeight: "normal",
  footerTextAlign: "center",
  footerPosition: "bottom",
  footerOffsetX: 0,
  footerOffsetY: 0,

  // CTA
  showCta: false,
  ctaText: "Learn More",
  ctaBackgroundColor: "#fff7ea",
  ctaTextColor: "#202020",
  ctaUrl: "https://example.com",
  buttonBorderRadius: 4,
  ctaOffsetX: 0,
  ctaOffsetY: 0,

  // Logo
  logoPath: "https://jobly.almamedia.fi/nostobannerit/nostoboksi_il/2024_test/jobly_logo.svg",
  logoPosition: "top-center",
  logoSize: 64,
  logoOffsetX: 0,
  logoOffsetY: 0,

  // Brändivärit ja klikkaus
  brandColors: ["#ED2D26", "#f4817d", "#fff7ea", "#202020"],
  isClickable: false,
  clickUrl: "https://example.com",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
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

  // Päivittää osasetukset
  const onSettingsChange = (partial: Partial<BannerSettings>) =>
    setBannerSettings((prev) => ({ ...prev, ...partial }));

  // Vie bannerin PNG-kuvaksi
  const handleExportBanner = async () => {
    if (!previewRef.current) return;
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = `banner-${bannerSettings.width}x${bannerSettings.height}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast({ title: "Banner exported", description: "Your banner has been exported as an image." });
    } catch (err) {
      console.error(err);
      toast({ title: "Export failed", description: "Failed to export banner.", variant: "destructive" });
    }
  };

  // Tallenna projekti localStorageen
  const handleSaveProject = () => {
    try {
      localStorage.setItem("bannerProject", JSON.stringify(bannerSettings));
      toast({ title: "Project saved", description: "Saved locally." });
    } catch {
      toast({ title: "Save failed", description: "Failed to save.", variant: "destructive" });
    }
  };

  const htmlCode = generateHtmlCode(bannerSettings);

  return (
    <div className="flex flex-col h-screen">
      <Header onExport={handleExportBanner} onSave={handleSaveProject} />
      <main className="flex-1 overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          <BannerPreview ref={previewRef} settings={bannerSettings} />
          <section className="lg:w-1/2 h-full flex flex-col">
            <nav className="bg-white border-b border-neutral-200 px-4">
              <ul className="flex overflow-x-auto text-sm font-medium">
                {(["design", "content", "code"] as const).map((tab) => (
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
            <div className="flex-1 overflow-y-auto bg-white p-4">
              {activeTab === "design" && (
                <DesignTab settings={bannerSettings} onSettingsChange={onSettingsChange} />
              )}
              {activeTab === "content" && (
                <ContentTab settings={bannerSettings} onSettingsChange={onSettingsChange} />
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
