export interface BannerSettings {
  // Bannerin koko
  width: number;
  height: number;

  // Taustat
  backgroundType: "color" | "image" | "animation";
  backgroundValue: string;
  backgroundSize: "cover" | "contain" | "auto";
  backgroundPosition: 
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";

  // Otsikko
  headingText: string;
  headingFont: string;
  headingSize: number;
  headingColor: string;
  headingAlign: "left" | "center" | "right";
  headingWeight: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  headingOffsetX: number;
  headingOffsetY: number;
  headingMarginTop: number;    // px
  headingMarginBottom: number; // px
  isHeadingAnimated: boolean;
  headingAnimationTexts: string[];

  // Alaotsikko
  subText: string;
  subTextFont: string;
  subTextSize: number;
  subTextColor: string;
  subTextWeight: "normal" | "medium" | "semibold" | "bold";
  subTextAlign: "left" | "center" | "right";
  subOffsetX: number;
  subOffsetY: number;
  subtextMarginBottom: number; // px
  isSubTextAnimated: boolean;
  subTextAnimationTexts: string[];

  // CTA-nappi
  showCta: boolean;
  ctaText: string;
  ctaBackgroundColor: string;
  ctaTextColor: string;
  buttonBorderRadius: number;
  ctaUrl: string;
  ctaOffsetX: number;
  ctaOffsetY: number;
  ctaBorderRadius?: number; // Optional property for CTA button border radius


  // Logo
  logoPath: string;
  logoPosition: 
    | "top-left"
    | "top-center"
    | "top-right"
    | "center"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  logoSize: number;
  logoOffsetX: number;
  logoOffsetY: number;

  // Footer
  footerText: string;
  footerTextFont: string;
  footerTextSize: number;
  footerTextColor: string;
  footerTextWeight: "normal" | "medium" | "semibold" | "bold";
  footerTextAlign: "left" | "center" | "right";
  footerPosition: "top" | "bottom";
  footerOffsetX: number;
  footerOffsetY: number;

  // Click & Analytics
  isClickable: boolean;
  clickUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;

  // Brändivärit
  brandColors: string[];
}

// Oletusasetukset
export const defaultSettings: BannerSettings = {
  width: 300,
  height: 600,

  backgroundType: "animation",
  backgroundValue: "1",
  backgroundSize: "cover",
  backgroundPosition: "center",

  headingText: "Default Heading",
  headingFont: "Poppins",
  headingSize: 24,
  headingColor: "#fff7ea",
  headingAlign: "center",
  headingWeight: "bold",
  headingOffsetX: 0,
  headingOffsetY: 0,
  headingMarginTop: 50,
  headingMarginBottom: 5,
  isHeadingAnimated: false,
  headingAnimationTexts: [],

  subText: "Default Subtext",
  subTextFont: "Poppins",
  subTextSize: 14,
  subTextColor: "#fff7ea",
  subTextWeight: "medium",
  subTextAlign: "center",
  subOffsetX: 0,
  subOffsetY: 0,
  subtextMarginBottom: 10,
  isSubTextAnimated: false,
  subTextAnimationTexts: [],

  showCta: false,
  ctaText: "Click Me",
  ctaBackgroundColor: "#fff7ea",
  ctaTextColor: "#202020",
  buttonBorderRadius: 4,
  ctaUrl: "",
  ctaOffsetX: 0,
  ctaOffsetY: 0,

  logoPath: "",
  logoPosition: "top-center",
  logoSize: 64,
  logoOffsetX: 0,
  logoOffsetY: 0,

  footerText: "Default Footer",
  footerTextFont: "Poppins",
  footerTextSize: 10,
  footerTextColor: "#fff7ea",
  footerTextWeight: "normal",
  footerTextAlign: "center",
  footerPosition: "bottom",
  footerOffsetX: 0,
  footerOffsetY: 0,

  isClickable: false,
  clickUrl: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",

  brandColors: ["#ED2D26", "#f4817d", "#fff7ea", "#202020"],
};
