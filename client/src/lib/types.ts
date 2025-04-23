export interface BannerSettings {
  width: number;
  height: number;
  backgroundType: "color" | "animation" | "image";
  backgroundValue: string; // hex color, animation id, or image url
  headingText: string;
  headingFont: string;
  headingSize: number;
  headingColor: string;
  headingAlign: "left" | "center" | "right";
  headingWeight: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  subText: string;
  subTextFont: string;
  subTextSize: number;
  subTextColor: string;
  subTextWeight: "normal" | "medium" | "semibold" | "bold";
  footerText: string;
  footerTextFont: string;
  footerTextSize: number;
  footerTextColor: string;
  footerTextWeight: "normal" | "medium" | "semibold" | "bold";
  showCta: boolean;
  ctaText: string;
  ctaBackgroundColor: string;
  ctaTextColor: string;
  ctaUrl: string;
  logoPath?: string;
  logoPosition: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center" | "center";
  logoSize: number; // Size in pixels
  brandColors: string[]; // Array of custom brand colors
  isClickable: boolean;
  clickUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  buttonBorderRadius: number; // For CTA button rounded corners
}
