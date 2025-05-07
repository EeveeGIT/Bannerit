import { BannerSettings } from "./types";
import { animationBackgrounds } from "./bannerUtils";

function getFontWeightValue(weight: string): number {
  switch (weight) {
    case "normal": return 400;
    case "medium": return 500;
    case "semibold": return 600;
    case "bold": return 700;
    case "extrabold": return 800;
    default: return 400;
  }
}

function getLogoPositionStyle(position: string): string {
  switch (position) {
    case "top-left": return "top: 25px; left: 35px;";
    case "top-center": return "top: 25px; left: 50%; transform: translateX(-50%);";
    case "top-right": return "top: 25px; right: 35px;";
    case "center": return "top: 50%; left: 50%; transform: translate(-50%, -50%);";
    case "bottom-left": return "bottom: 25px; left: 35px;";
    case "bottom-center": return "bottom: 25px; left: 50%; transform: translateX(-50%);";
    case "bottom-right": return "bottom: 25px; right: 35px;";
    default: return "bottom: 25px; left: 35px;";
  }
}

export function generateHtmlCode(s: BannerSettings): string {
  const key = s.backgroundValue as keyof typeof animationBackgrounds;
  const anim = animationBackgrounds[key] || animationBackgrounds["1"];

  const containerStyle = `width:${s.width}px;height:${s.height}px;position:relative;overflow:hidden;`;
  const bannerStyle = [
    "width:100%",
    "height:100%",
    s.backgroundType === "color"
      ? `background-color:${s.backgroundValue}`
      : s.backgroundType === "image"
        ? `background-image:url('${s.backgroundValue}');background-size:${s.backgroundSize};background-position:${s.backgroundPosition}`
        : `background-image:${anim.gradient};background-size:400% 400%;animation:gradient ${anim.duration} ease infinite`,
    "display:flex",
    "flex-direction:column",
    "justify-content:center",
    "align-items:center",
    "text-align:center",
    "position:relative",
    "overflow:hidden"
  ].join(';') + ';';

  const hW = getFontWeightValue(s.headingWeight);
  const subW = getFontWeightValue(s.subTextWeight);
  const fW = getFontWeightValue(s.footerTextWeight);

  // JS animaatiot: otsikko ja alaotsikko
  const headingScript = s.isHeadingAnimated && s.headingAnimationTexts.length > 0 ? `
    const headingTexts = ${JSON.stringify(s.headingAnimationTexts)};
    let hIdx = 0;
    const headingEl = document.getElementById('mainHeading');
    setInterval(() => {
      headingEl.style.opacity = 0;
      setTimeout(() => {
        hIdx = (hIdx + 1) % headingTexts.length;
        headingEl.textContent = headingTexts[hIdx];
        headingEl.style.opacity = 1;
      }, 400);
    }, 1500);
  ` : "";

  const subScript = s.isSubTextAnimated && s.subTextAnimationTexts.length > 0 ? `
    const subTexts = ${JSON.stringify(s.subTextAnimationTexts)};
    let sIdx = 0;
    const subEl = document.getElementById('cityText');
    setInterval(() => {
      subEl.style.opacity = 0;
      setTimeout(() => {
        sIdx = (sIdx + 1) % subTexts.length;
        subEl.textContent = subTexts[sIdx];
        subEl.style.opacity = 1;
      }, 400);
    }, 1500);
  ` : "";

  const animationScript = `<script>${headingScript}${subScript}</script>`;

  const logoStyle = `${getLogoPositionStyle(s.logoPosition)} transform: translate(${s.logoOffsetX}px, ${s.logoOffsetY}px); width:${s.logoSize}px; height:auto; position:absolute; z-index:2;`;

  return `<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=${s.width}, initial-scale=1.0" />
  <title>Banner Preview</title>
  <link href="https://fonts.googleapis.com/css2?family=${s.headingFont.replace(/ /g, '+')}:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @keyframes gradient { 0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%} }
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #222;
      height: 100vh;
      font-family: '${s.headingFont}', sans-serif;
      color: #fff7ea;
    }
    .container { ${containerStyle} }
    .banner { ${bannerStyle} }
    .main-text {
      font-size: ${s.headingSize}px;
      font-weight: ${hW};
      margin-bottom: ${s.headingMarginBottom}px;
      margin-top: ${s.headingMarginTop}px;
      color: ${s.headingColor};
      transform: translate(${s.headingOffsetX}px, ${s.headingOffsetY}px);
      transition: opacity 0.4s ease;
    }
    .subtext {
      font-size: ${s.subTextSize}px;
      font-weight: ${subW};
      color: ${s.subTextColor};
      margin-bottom: ${s.subtextMarginBottom}px;
      transform: translate(${s.subOffsetX}px, ${s.subOffsetY}px);
      transition: opacity 0.4s ease;
    }
    .cta-button {
      background: linear-gradient(90deg, #FFF7EA, #F3ECD8, #FFF7EA);
      background-size: 200% 200%;
      color: ${s.ctaTextColor};
      border: none;
      padding: 10px 20px;
      font-size: 20px;
      border-radius: ${s.buttonBorderRadius}px;
      cursor: pointer;
      transition: background-position 0.5s ease, transform 0.2s ease, box-shadow 0.2s ease;
      margin-bottom: 25px;
      text-decoration: none;
      position: relative;
      z-index: 3;
    }
    .cta-button:hover {
      background-position: right center;
      transform: scale(1.05);
      box-shadow: 0 4px 20px rgba(255, 247, 234, 1);
    }
    .footer-text {
      font-size: ${s.footerTextSize}px;
      font-weight: ${fW};
      color: ${s.footerTextColor};
      text-align: ${s.footerTextAlign};
      position: absolute;
      ${s.footerPosition === "bottom" ? `bottom: ${s.footerOffsetY + 10}px;` : `top: ${s.footerOffsetY}px;`}
      right: ${s.footerOffsetX}px;
      left: ${s.footerOffsetX}px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="banner">
      <a href="${s.clickUrl || s.ctaUrl || '#'}" target="_blank" style="position:absolute; inset:0; z-index:1;"></a>

      ${s.logoPath ? `<img src="${s.logoPath}" alt="Logo" style="${logoStyle}" />` : ""}

      <div class="main-text" id="mainHeading">${s.isHeadingAnimated && s.headingAnimationTexts.length > 0 ? s.headingAnimationTexts[0] : s.headingText}</div>

      <div class="subtext" id="cityText">${s.isSubTextAnimated && s.subTextAnimationTexts.length > 0 ? s.subTextAnimationTexts[0] : s.subText}</div>

      ${s.showCta && s.ctaText ? `<a href="${s.ctaUrl || '#'}" class="cta-button" target="_blank">${s.ctaText}</a>` : ""}

      <div class="footer-text">${s.footerText}</div>
    </div>
  </div>
  ${animationScript}
</body>
</html>`;
}
