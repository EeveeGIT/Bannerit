import { BannerSettings } from "./types";
import { animationBackgrounds, getFontWeight } from "./bannerUtils";

// Helper function to convert font weight strings to numeric values for HTML
function getFontWeightValue(weight: string): number {
  return getFontWeight(weight);
}

// Generate the full HTML code for the banner
export function generateHtmlCode(settings: BannerSettings): string {
  // Start with the opening div
  let htmlCode = `<div class="banner" style="width: ${settings.width}px; height: ${settings.height}px; position: relative; overflow: hidden;`;
  
  // Add background styles
  if (settings.backgroundType === "color") {
    htmlCode += ` background-color: ${settings.backgroundValue};`;
  } else if (settings.backgroundType === "image") {
    htmlCode += ` background-image: url('${settings.backgroundValue}'); background-size: ${settings.backgroundSize || 'cover'}; background-position: ${settings.backgroundPosition || 'center'};`;
  } else if (settings.backgroundType === "animation") {
    const animation = animationBackgrounds[settings.backgroundValue as keyof typeof animationBackgrounds];
    if (animation) {
      htmlCode += ` background-image: ${animation.gradient}; background-size: 400% 400%; animation: gradient ${animation.duration} ease infinite;`;
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
  
  // Add font imports with various weights
  htmlCode += `    @import url('https://fonts.googleapis.com/css2?family=${settings.headingFont.replace(' ', '+')}:wght@400;500;600;700;800&family=${settings.subTextFont.replace(' ', '+')}:wght@400;500;600;700&family=${settings.footerTextFont.replace(' ', '+')}:wght@400;500;600;700&display=swap');\n`;
  
  htmlCode += `  </style>\n`;
  
  // Add logo if present
  if (settings.logoPath) {
    const logoStyle = getLogoPositionStyleString(settings.logoPosition);
    htmlCode += `  <img src="${settings.logoPath}" alt="Logo" style="position: absolute; ${logoStyle} width: ${settings.logoSize || 64}px; height: auto; z-index: 10;"/>\n`;
  }
  
  // Add text content container
  htmlCode += `  <div style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: ${settings.headingAlign};">\n`;
  
  // Get font weight values
  const headingWeightValue = getFontWeightValue(settings.headingWeight);
  const subTextWeightValue = getFontWeightValue(settings.subTextWeight);
  const footerTextWeightValue = getFontWeightValue(settings.footerTextWeight);
  
  // Add heading text
  htmlCode += `    <h2 style="font-family: '${settings.headingFont}', sans-serif; font-size: ${settings.headingSize}px; font-weight: ${headingWeightValue}; color: ${settings.headingColor}; margin: 0;">${settings.headingText}</h2>\n`;
  
  // Add subheading text
  htmlCode += `    <p style="font-family: '${settings.subTextFont}', sans-serif; font-size: ${settings.subTextSize}px; font-weight: ${subTextWeightValue}; color: ${settings.subTextColor}; margin: 4px 0 0 0;">${settings.subText}</p>\n`;
  
  // Add footer text (only if not in bottom position)
  if (settings.footerPosition !== "bottom") {
    htmlCode += `    <p style="font-family: '${settings.footerTextFont}', sans-serif; font-size: ${settings.footerTextSize}px; font-weight: ${footerTextWeightValue}; color: ${settings.footerTextColor}; margin: 4px 0 0 0;">${settings.footerText}</p>\n`;
  }
  
  // Add CTA button if enabled
  if (settings.showCta) {
    htmlCode += `    <a href="${settings.ctaUrl}" style="display: inline-block; margin-top: 12px; padding: 6px 16px; background-color: ${settings.ctaBackgroundColor}; color: ${settings.ctaTextColor}; text-decoration: none; border-radius: ${settings.buttonBorderRadius || 4}px; font-family: '${settings.subTextFont}', sans-serif; font-size: 14px; font-weight: 500; z-index: 20;">${settings.ctaText}</a>\n`;
  }
  
  // Close text container
  htmlCode += `  </div>\n`;
  
  // Add footer text at bottom if position is bottom
  if (settings.footerPosition === "bottom" && settings.footerText) {
    htmlCode += `  <div style="position: absolute; bottom: 8px; left: 0; right: 0; text-align: center; z-index: 5;">
    <p style="font-family: '${settings.footerTextFont}', sans-serif; font-size: ${settings.footerTextSize}px; font-weight: ${footerTextWeightValue}; color: ${settings.footerTextColor}; margin: 0;">${settings.footerText}</p>
  </div>\n`;
  }

  // Add clickable layer if enabled
  if (settings.isClickable && settings.clickUrl) {
    // Construct click URL with UTM parameters
    let clickUrl = settings.clickUrl;
    if (!clickUrl.startsWith('http')) {
      clickUrl = `https://${clickUrl}`;
    }
    
    // Add UTM parameters if they exist
    const urlObj = new URL(clickUrl);
    if (settings.utmSource) urlObj.searchParams.append('utm_source', settings.utmSource);
    if (settings.utmMedium) urlObj.searchParams.append('utm_medium', settings.utmMedium);
    if (settings.utmCampaign) urlObj.searchParams.append('utm_campaign', settings.utmCampaign);
    
    htmlCode += `  <a href="${urlObj.toString()}" target="_blank" rel="noopener noreferrer" style="position: absolute; inset: 0; z-index: 10; cursor: pointer; text-decoration: none;"></a>\n`;
  }
  
  // Close main div
  htmlCode += `</div>`;
  
  return htmlCode;
}

// Helper function for logo position styling
function getLogoPositionStyleString(position: string): string {
  switch (position) {
    case "top-left":
      return "top: 8px; left: 8px;";
    case "top-center":
      return "top: 8px; left: 50%; transform: translateX(-50%);";
    case "top-right":
      return "top: 8px; right: 8px;";
    case "bottom-left":
      return "bottom: 8px; left: 8px;";
    case "bottom-center":
      return "bottom: 8px; left: 50%; transform: translateX(-50%);";
    case "bottom-right":
      return "bottom: 8px; right: 8px;";
    case "center":
      return "top: 50%; left: 50%; transform: translate(-50%, -50%);";
    default:
      return "top: 8px; left: 8px;";
  }
}
