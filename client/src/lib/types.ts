export interface BannerSettings {
  width: number;
  height: number;
  backgroundType: string;
  backgroundValue: string;
  backgroundSize: string;
  backgroundPosition: string;
  headingText: string;
  headingFont: string;
  headingSize: number;
  headingColor: string;
  headingAlign: "left" | "center" | "right";
  headingWeight: string;
  subText: string;
  subTextFont: string;
  subTextSize: number;
  subTextColor: string;
  subTextWeight: string;
  subTextAlign: "left" | "center" | "right";
  isSubTextAnimated?: boolean;
  subAnimationTexts?: string[];
  footerText: string;
  footerTextFont: string;
  footerTextSize: number;
  footerTextColor: string;
  footerTextWeight: string; 
  footerTextAlign?: "left" | "center" | "right";
  footerPosition: "top" | "bottom"; 
  showCta: boolean;
  ctaText: string;
  ctaBackgroundColor: string;
  ctaTextColor: string;
  ctaBorderRadius?: number; // Lisää tämä ominaisuus
  ctaUrl?: string;
  logoPath: string;
  logoPosition: string;
  logoSize: number;
  logoMargin: number;
  brandColors: string[];
  isClickable: boolean;
  clickUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  buttonBorderRadius: number;
  buttonOffsetX: number;
  buttonOffsetY: number;
  headingOffsetX: number;
  headingOffsetY: number;
  subOffsetX: number;
  subOffsetY: number;
  ctaOffsetX: number;
  ctaOffsetY: number;
  logoOffsetX: number;
  logoOffsetY: number;
  footerOffsetX: number;
  footerOffsetY: number;
  headingAnimationTexts: string[];
  subTextAnimationTexts: string[];
  isHeadingAnimated: boolean;
}

const defaultSettings: BannerSettings = {
  width: 300,
  height: 600,
  backgroundType: "color",
  backgroundValue: "#ffffff",
  backgroundSize: "cover",
  backgroundPosition: "center",
  headingText: "Default Heading",
  headingFont: "Arial",
  headingSize: 24,
  headingColor: "#000000",
  headingAlign: "center",
  headingWeight: "bold",
  subText: "Default Subtext",
  subTextFont: "Arial",
  subTextSize: 16,
  subTextColor: "#000000",
  subTextWeight: "normal",
  subTextAlign: "center",
  isSubTextAnimated: false,
  subAnimationTexts: [],
  footerText: "Default Footer",
  footerTextFont: "Arial",
  footerTextSize: 12,
  footerTextColor: "#000000",
  footerTextWeight: "normal",
  footerPosition: "bottom",
  footerTextAlign: "center",
  showCta: false,
  ctaText: "Click Me",
  ctaBackgroundColor: "#007bff",
  ctaTextColor: "#ffffff",
  ctaUrl: "",
  logoPath: "",
  logoPosition: "top-center",
  logoSize: 64,
  logoMargin: 0,
  brandColors: ["#ff0000", "#000000", "#f5f5f5"],
  isClickable: false,
  clickUrl: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  buttonBorderRadius: 4,
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
  headingAnimationTexts: ["Animated Heading 1", "Animated Heading 2"],
  subTextAnimationTexts: ["Animated Subtext 1", "Animated Subtext 2"],
  isHeadingAnimated: false,
  
  buttonOffsetX: 0,
  buttonOffsetY: 0
};