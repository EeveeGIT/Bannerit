// client/src/lib/htmlGenerator.ts

import { BannerSettings } from "./types";
import { animationBackgrounds } from "./bannerUtils";

// Muuntaa font-weight‐tekstin numeroksi
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

export function generateHtmlCode(s: BannerSettings): string {
  // Valitaan gradient‐animaatio
  const key = s.backgroundValue as keyof typeof animationBackgrounds;
  const anim = animationBackgrounds[key] || animationBackgrounds["1"];

  // Container‐tyylit (koko + sijainti)
  const containerStyle = [
    `width:${s.width}px`,
    `height:${s.height}px`,
    `position:relative`,
    `overflow:hidden`
  ].join(';') + ';';

  // Banner‐tyylit (tausta + flex‐layout)
  const bannerStyle = [
    `width:100%`,
    `height:100%`,
    s.backgroundType === "color"
      ? `background-color:${s.backgroundValue}`
      : s.backgroundType === "image"
        ? `background-image:url('${s.backgroundValue}');background-size:${s.backgroundSize};background-position:${s.backgroundPosition}`
        : `background-image:${anim.gradient};background-size:400% 400%;animation:gradient ${anim.duration} ease infinite`,
    `display:flex`,
    `flex-direction:column`,
    `justify-content:center`,
    `align-items:center`,
    `text-align:center`,
    `position:relative`,
    `overflow:hidden`
  ].join(';') + ';';

  // Font‐painot
  const hW = getFontWeightValue(s.headingWeight);
  const subW = getFontWeightValue(s.subTextWeight);
  const fW = getFontWeightValue(s.footerTextWeight);

  return `<!DOCTYPE html>
<html lang="fi">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=${s.width}, initial-scale=1.0"/>
  <title>Banner Preview</title>
  <link href="https://fonts.googleapis.com/css2?family=${s.headingFont.replace(/ /g,'+')}":wght@400;500;600;700;800&family=${s.subTextFont.replace(/ /g,'+')}:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    @keyframes gradient { 0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%} }
    body { margin:0; padding:0; display:flex; justify-content:center; align-items:center; background:#222; height:100vh; font-family:'Poppins',sans-serif; color:#fff7ea; }
    .container { ${containerStyle} }
    .banner    { ${bannerStyle} }
    .main-text {
      font-family:'${s.headingFont}',sans-serif;
      font-size:${s.headingSize}px;
      font-weight:${hW};
      color:${s.headingColor};
      text-align:${s.headingAlign};
      margin:${s.headingMarginTop}px 0 ${s.headingMarginBottom}px;
      transform:translate(${s.headingOffsetX}px,${s.headingOffsetY}px);
      transition:opacity 0.4s ease-in-out;
    }
    .subtext {
      font-family:'${s.subTextFont}',sans-serif;
      font-size:${s.subTextSize}px;
      font-weight:${subW};
      color:${s.subTextColor};
      text-align:${s.subTextAlign};
      margin-bottom:${s.subtextMarginBottom}px;
      transform:translate(${s.subOffsetX}px,${s.subOffsetY}px);
    }
    .cta-button {
      display:inline-block;
      background:${s.ctaBackgroundColor};
      color:${s.ctaTextColor};
      padding:6px 16px;
      font-family:'${s.subTextFont}',sans-serif;
      font-size:14px;
      font-weight:500;
      border-radius:${s.buttonBorderRadius}px;
      text-decoration:none;
      transform:translate(${s.ctaOffsetX}px,${s.ctaOffsetY}px);
      cursor:pointer;
      transition:transform 0.2s ease;
    }
    .footer-text {
      font-family:'${s.footerTextFont}',sans-serif;
      font-size:${s.footerTextSize}px;
      font-weight:${fW};
      color:${s.footerTextColor};
      text-align:${s.footerTextAlign};
      position:absolute;
      ${s.footerPosition === 'bottom' ? `bottom:${s.footerOffsetY}px;` : `top:${s.footerOffsetY}px;`}
      left:${s.footerOffsetX}px;
      right:${s.footerOffsetX}px;
      transform:translate(0,0);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="banner">
      ${s.isClickable && s.clickUrl
        ? `<a href="${s.clickUrl.startsWith('http') ? s.clickUrl : `https://${s.clickUrl}`}" style="position:absolute;inset:0;z-index:1;cursor:pointer" target="_blank"></a>`
        : ''}
      ${s.logoPath
        ? `<img src="${s.logoPath}" alt="Logo" style="position:absolute;top:${s.logoOffsetY}px;left:${s.logoOffsetX}px;width:${s.logoSize}px;height:auto;z-index:2;"/>`
        : ''}
      <div class="main-text">${s.headingText}</div>
      <div class="subtext" id="cityText">${s.subText}</div>
      ${s.showCta
        ? `<a href="${s.ctaUrl}" class="cta-button" target="_blank">${s.ctaText}</a>`
        : ''}
      <div class="footer-text">${s.footerText}</div>
    </div>
  </div>
  <script>
    const cities=['Helsinki','Espoo','Tampere','Oulu','Turku','Vantaa','Jyväskylä','Rovaniemi','Lahti','Kuopio'];
    let idx=0,el=document.getElementById('cityText');
    setInterval(()=>{el.style.opacity=0;setTimeout(()=>{idx=(idx+1)%cities.length;el.textContent=cities[idx];el.style.opacity=1;},500);},2000);
  </script>
</body>
</html>`;
}
