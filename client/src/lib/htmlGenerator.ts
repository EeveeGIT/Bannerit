// client/src/lib/htmlGenerator.ts

import { BannerSettings } from "./types";
import { animationBackgrounds } from "./bannerUtils";

// Simple font‐weight converter, same as before
function getFontWeightValue(weight: string): number {
  const map: Record<string, number> = {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  };
  return map[weight] ?? 400;
}

// Position helper (exactly like before)
function getLogoPositionStyle(position: string): string {
  switch (position) {
    case "top-left":    return "top:8px; left:8px;";
    case "top-center":  return "top:8px; left:50%; transform:translateX(-50%);";
    case "top-right":   return "top:8px; right:8px;";
    case "center":      return "top:50%; left:50%; transform:translate(-50%,-50%);";
    case "bottom-left": return "bottom:8px; left:8px;";
    case "bottom-center":return "bottom:8px; left:50%; transform:translateX(-50%);";
    case "bottom-right":return "bottom:8px; right:8px;";
    default:            return "top:8px; left:8px;";
  }
}

export function generateHtmlCode(settings: BannerSettings): string {
  // pick animation (fallback to “1”)
  const anim = animationBackgrounds[settings.backgroundValue as keyof typeof animationBackgrounds]
             ?? animationBackgrounds["1"];

  // container inline styles
  const containerStyle = [
    `width:${settings.width}px`,
    `height:${settings.height}px`,
    `position:relative`,
    `overflow:hidden`,
    // background...
    settings.backgroundType === "color"
      ? `background-color:${settings.backgroundValue}`
      : settings.backgroundType === "image"
        ? `background-image:url('${settings.backgroundValue}');background-size:${settings.backgroundSize};background-position:${settings.backgroundPosition}`
        : `background-image:${anim.gradient};background-size:400% 400%;animation:gradient  ${anim.duration} ease infinite`,
    `display:flex`,
    `flex-direction:column`,
    `justify-content:center`,
    `align-items:center`,
    `text-align:center`
  ].join(";");

  // heading + subtext + footer weights
  const hW = getFontWeightValue(settings.headingWeight);
  const sW = getFontWeightValue(settings.subTextWeight);
  const fW = getFontWeightValue(settings.footerTextWeight);

  // build the HTML (all inline)
  return `<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=${settings.width}, initial-scale=1">
  <title>Banner Preview</title>
  <link href="https://fonts.googleapis.com/css2?family=${settings.headingFont.replace(/ /g,"+")}:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @keyframes gradient {
      0%   { background-position:0% 50%; }
      50%  { background-position:100% 50%; }
      100% { background-position:0% 50%; }
    }
  </style>
</head>
<body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:#222;height:100vh;">
  <div class="banner" style="${containerStyle}">
    <!-- click‐layer -->
    ${settings.isClickable && settings.clickUrl
      ? `<a href="${
          settings.clickUrl.startsWith("http")
            ? settings.clickUrl
            : `https://${settings.clickUrl}`
        }" target="_blank" style="position:absolute;inset:0;z-index:1;text-decoration:none;"></a>`
      : ``}

    <!-- logo -->
    ${settings.logoPath
      ? `<img src="${settings.logoPath}" alt="Logo" style="position:absolute;${getLogoPositionStyle(settings.logoPosition)}width:${settings.logoSize}px;height:auto;z-index:2;">`
      : ``}

    <!-- heading -->
    <h2 style="
      margin:0;
      font-family:'${settings.headingFont}',sans-serif;
      font-size:${settings.headingSize}px;
      font-weight:${hW};
      color:${settings.headingColor};
    ">${settings.headingText}</h2>

    <!-- subtext -->
    <p style="
      margin:4px 0 0;
      font-family:'${settings.subTextFont}',sans-serif;
      font-size:${settings.subTextSize}px;
      font-weight:${sW};
      color:${settings.subTextColor};
    ">${settings.subText}</p>

    <!-- CTA -->
    ${settings.showCta
      ? `<a href="${settings.ctaUrl}" style="
          display:inline-block;
          margin:12px 0 0;
          padding:6px 16px;
          background-color:${settings.ctaBackgroundColor};
          color:${settings.ctaTextColor};
          text-decoration:none;
          border-radius:${settings.buttonBorderRadius}px;
          font-family:'${settings.subTextFont}',sans-serif;
          font-size:14px;
          font-weight:500;
          z-index:2;
        ">${settings.ctaText}</a>`
      : ``}

    <!-- footer -->
    ${settings.footerText
      ? `<div style="
          position:absolute;
          ${settings.footerPosition === "bottom"
            ? `bottom:${settings.footerOffsetY}px`
            : `top:${settings.footerOffsetY}px`};
          left:${settings.footerOffsetX}px;
          right:${settings.footerOffsetX}px;
          font-family:'${settings.footerTextFont}',sans-serif;
          font-size:${settings.footerTextSize}px;
          font-weight:${fW};
          color:${settings.footerTextColor};
          text-align:center;
          z-index:2;
        ">${settings.footerText}</div>`
      : ``}
  </div>
</body>
</html>`;
}
