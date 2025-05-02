import { BannerSettings } from "./types";

// Define animation keyframes
export const animationKeyframes = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;

// Animation backgrounds with their properties
export const animationBackgrounds = {
  "1": {
    gradient: "linear-gradient(-45deg, #ED2D26, #f4817d, #ED2D26)",
    duration: "10s"
  },
  "2": {
    gradient: "linear-gradient(-45deg, #202020, #4b4b4b, #202020)",
    duration: "10s"
  },
  "3": {
    gradient: "linear-gradient(-45deg, #fff7ea, #e7dccb, #fff7ea)",
    duration: "10s"
  },

};

// Helper function to convert font weight strings to numeric values
export const getFontWeight = (weight: string): number => {
  switch (weight) {
    case "normal": return 400;
    case "medium": return 500;
    case "semibold": return 600;
    case "bold": return 700;
    case "extrabold": return 800;
    default: return 400;
  }
};

// Get CSS style for the banner based on settings
export const getBannerStyle = (settings: BannerSettings): React.CSSProperties => {
  const style: React.CSSProperties = {};
  
  // Set background based on type
  if (settings.backgroundType === "color") {
    style.backgroundColor = settings.backgroundValue;
  } else if (settings.backgroundType === "image") {
    style.backgroundImage = `url(${settings.backgroundValue})`;
    style.backgroundSize = settings.backgroundSize || "cover";
    style.backgroundPosition = settings.backgroundPosition || "center";
  } else if (settings.backgroundType === "animation") {
    const animation = animationBackgrounds[settings.backgroundValue as keyof typeof animationBackgrounds];
    if (animation) {
      style.backgroundImage = animation.gradient;
      style.backgroundSize = "400% 400%";
      style.animation = `gradient ${animation.duration} ease infinite`;
    }
  }
  
  return style;
};

// Get styles for logo positioning
export function getLogoPositionStyle(
  position: BannerSettings["logoPosition"],
  bannerWidth: number,
  bannerHeight: number
): { top: number; left: number; transform?: string } {
  switch (position) {
    case "top-left":
      return { top: 0, left: 0 };
    case "top-center":
      return { top: 0, left: bannerWidth / 2, transform: "translateX(-50%)" };
    case "top-right":
      return { top: 0, left: bannerWidth };
    case "center":
      return {
        top: bannerHeight / 2,
        left: bannerWidth / 2,
        transform: "translate(-50%, -50%)",
      };
    case "bottom-left":
      return { top: bannerHeight, left: 0 };
    case "bottom-center":
      return {
        top: bannerHeight,
        left: bannerWidth / 2,
        transform: "translateX(-50%)",
      };
    case "bottom-right":
      return { top: bannerHeight, left: bannerWidth };
    default:
      return { top: 0, left: 0 };
  }
}
