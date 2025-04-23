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
  subText: string;
  subTextFont: string;
  subTextSize: number;
  subTextColor: string;
  showCta: boolean;
  ctaText: string;
  ctaBackgroundColor: string;
  ctaTextColor: string;
  ctaUrl: string;
  logoPath?: string;
  logoPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
}
