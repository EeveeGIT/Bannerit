import { BannerSettings } from "./types";
import { animationBackgrounds } from "./bannerUtils";

// Generate the full HTML code for the banner
export function generateHtmlCode(settings: BannerSettings): string {
  // Start with the opening div
  let htmlCode = `<div class="banner" style="width: ${settings.width}px; height: ${settings.height}px; position: relative; overflow: hidden;`;
  
  // Add background styles
  if (settings.backgroundType === "color") {
    htmlCode += ` background-color: ${settings.backgroundValue};`;
  } else if (settings.backgroundType === "image") {
    htmlCode += ` background-image: url('${settings.backgroundValue}'); background-size: cover; background-position: center;`;
  } else if (settings.backgroundType === "animation") {
    const animation = animationBackgrounds[settings.backgroundValue as keyof typeof animationBackgrounds];
    if (animation) {
      htmlCode += ` background: ${animation.gradient}; background-size: 400% 400%; animation: gradient ${animation.duration} ease infinite;`;
    }
  }
  
  // Close the opening div tag
  htmlCode += `">\n`;
  
  // Add the style tag with animations and font imports
  htmlCode += `  <style>\n`;
  
  // Add animation keyframes if needed
  if (settings.backgroundType === "animation") {
    htmlCode += `    @keyframes gradient {\n`;
    htmlCode += `      0% { background-position: 0% 50%; }\n`;
    htmlCode += `      50% { background-position: 100% 50%; }\n`;
    htmlCode += `      100% { background-position: 0% 50%; }\n`;
    htmlCode += `    }\n`;
  }
  
  // Add font imports
  htmlCode += `    @import url('https://fonts.googleapis.com/css2?family=${settings.headingFont.replace(' ', '+')}:wght@700&family=${settings.subTextFont.replace(' ', '+')}&display=swap');\n`;
  
  htmlCode += `  </style>\n`;
  
  // Add logo if present
  if (settings.logoPath) {
    const logoStyle = getLogoPositionStyleString(settings.logoPosition);
    htmlCode += `  <img src="${settings.logoPath}" alt="Logo" style="position: absolute; ${logoStyle} width: 64px; height: auto; z-index: 10;"/>\n`;
  }
  
  // Add text content container
  htmlCode += `  <div style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: ${settings.headingAlign};">\n`;
  
  // Add heading text
  htmlCode += `    <h2 style="font-family: '${settings.headingFont}', sans-serif; font-size: ${settings.headingSize}px; font-weight: 700; color: ${settings.headingColor}; margin: 0;">${settings.headingText}</h2>\n`;
  
  // Add subheading text
  htmlCode += `    <p style="font-family: '${settings.subTextFont}', sans-serif; font-size: ${settings.subTextSize}px; color: ${settings.subTextColor}; margin: 4px 0 0 0;">${settings.subText}</p>\n`;
  
  // Add CTA button if enabled
  if (settings.showCta) {
    htmlCode += `    <a href="${settings.ctaUrl}" style="display: inline-block; margin-top: 12px; padding: 6px 16px; background-color: ${settings.ctaBackgroundColor}; color: ${settings.ctaTextColor}; text-decoration: none; border-radius: 4px; font-family: '${settings.subTextFont}', sans-serif; font-size: 14px; font-weight: 500;">${settings.ctaText}</a>\n`;
  }
  
  // Close text container
  htmlCode += `  </div>\n`;
  
  // Close main div
  htmlCode += `</div>`;
  
  return htmlCode;
}

// Helper function for logo position styling
function getLogoPositionStyleString(position: string): string {
  switch (position) {
    case "top-left":
      return "top: 8px; left: 8px;";
    case "top-right":
      return "top: 8px; right: 8px;";
    case "bottom-left":
      return "bottom: 8px; left: 8px;";
    case "bottom-right":
      return "bottom: 8px; right: 8px;";
    case "center":
      return "top: 50%; left: 50%; transform: translate(-50%, -50%);";
    default:
      return "top: 8px; left: 8px;";
  }
}
