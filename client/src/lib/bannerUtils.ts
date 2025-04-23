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
    gradient: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
    duration: "15s"
  },
  "2": {
    gradient: "linear-gradient(-45deg, #3B82F6, #6366F1, #8B5CF6, #A855F7)",
    duration: "8s"
  },
  "3": {
    gradient: "linear-gradient(-45deg, #10B981, #059669, #047857, #065F46)",
    duration: "12s"
  },
  "4": {
    gradient: "linear-gradient(-45deg, #F59E0B, #FBBF24, #F59E0B, #D97706)",
    duration: "10s"
  },
  "5": {
    gradient: "linear-gradient(-45deg, #111827, #1F2937, #374151, #4B5563)",
    duration: "15s"
  },
  "6": {
    gradient: "linear-gradient(-45deg, #6366F1, #4F46E5, #4338CA, #3730A3)",
    duration: "12s"
  },
  "7": {
    gradient: "linear-gradient(-45deg, #ED2D26, #f4817d, #ED2D26)",
    duration: "10s"
  }
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
export const getLogoPositionStyle = (position: string, size: number = 64): React.CSSProperties => {
  const style: React.CSSProperties = {
    width: `${size}px`,
    height: "auto"
  };
  
  switch (position) {
    case "top-left":
      style.top = "8px";
      style.left = "8px";
      break;
    case "top-center":
      style.top = "8px";
      style.left = "50%";
      style.transform = "translateX(-50%)";
      break;
    case "top-right":
      style.top = "8px";
      style.right = "8px";
      break;
    case "bottom-left":
      style.bottom = "8px";
      style.left = "8px";
      break;
    case "bottom-center":
      style.bottom = "8px";
      style.left = "50%";
      style.transform = "translateX(-50%)";
      break;
    case "bottom-right":
      style.bottom = "8px";
      style.right = "8px";
      break;
    case "center":
      style.top = "50%";
      style.left = "50%";
      style.transform = "translate(-50%, -50%)";
      break;
    default:
      style.top = "8px";
      style.left = "8px";
  }
  
  return style;
};
