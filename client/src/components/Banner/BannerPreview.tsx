import { forwardRef } from "react";
import { BannerSettings } from "@/lib/types";
import { getBannerStyle, getLogoPositionStyle, getFontWeight } from "@/lib/bannerUtils";

interface BannerPreviewProps {
  settings: BannerSettings;
}

const BannerPreview = forwardRef<HTMLDivElement, BannerPreviewProps>((props, ref) => {
  const { settings } = props;
  const bannerStyle = getBannerStyle(settings);
  const logoStyle = getLogoPositionStyle(settings.logoPosition, settings.logoSize || 64);
  
  // Construct click URL with UTM parameters if they exist
  const constructClickUrl = () => {
    if (!settings.clickUrl) return '#';
    
    const url = new URL(settings.clickUrl.startsWith('http') ? settings.clickUrl : `https://${settings.clickUrl}`);
    
    if (settings.utmSource) url.searchParams.append('utm_source', settings.utmSource);
    if (settings.utmMedium) url.searchParams.append('utm_medium', settings.utmMedium);
    if (settings.utmCampaign) url.searchParams.append('utm_campaign', settings.utmCampaign);
    
    return url.toString();
  };
  
  return (
    <div className="lg:w-1/2 h-[250px] lg:h-full p-4 bg-neutral-200 flex items-center justify-center overflow-auto">
      <div className="relative bg-white shadow-lg rounded-md p-4 overflow-hidden">
        {/* Banner Preview */}
        <div 
          id="banner-preview" 
          ref={ref}
          className={`relative ${settings.backgroundType === 'animation' ? `bg-animation-${settings.backgroundValue}` : ''} rounded overflow-hidden`} 
          style={{
            width: `${settings.width}px`, 
            height: `${settings.height}px`,
            ...bannerStyle
          }}
        >
          {/* Logo */}
          {settings.logoPath && (
            <img 
              src={settings.logoPath} 
              alt="Logo" 
              className="absolute z-10 rounded" 
              style={logoStyle}
            />
          )}
          
          {/* Banner Text */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h2 
              className="font-heading text-center"
              style={{
                fontFamily: settings.headingFont,
                fontSize: `${settings.headingSize}px`,
                color: settings.headingColor,
                textAlign: settings.headingAlign,
                fontWeight: getFontWeight(settings.headingWeight)
              }}
            >
              {settings.headingText}
            </h2>
            <p 
              className="mt-1"
              style={{
                fontFamily: settings.subTextFont,
                fontSize: `${settings.subTextSize}px`,
                color: settings.subTextColor,
                fontWeight: getFontWeight(settings.subTextWeight)
              }}
            >
              {settings.subText}
            </p>
            
            {settings.footerPosition !== "bottom" && (
              <p 
                className="mt-1"
                style={{
                  fontFamily: settings.footerTextFont,
                  fontSize: `${settings.footerTextSize}px`,
                  color: settings.footerTextColor,
                  fontWeight: getFontWeight(settings.footerTextWeight)
                }}
              >
                {settings.footerText}
              </p>
            )}
            
            {settings.showCta && (
              <a 
                href={settings.ctaUrl}
                className="mt-3 px-4 py-1 rounded text-sm font-medium z-20"
                style={{
                  backgroundColor: settings.ctaBackgroundColor,
                  color: settings.ctaTextColor,
                  borderRadius: `${settings.buttonBorderRadius || 4}px`
                }}
                onClick={(e) => e.preventDefault()}
              >
                {settings.ctaText}
              </a>
            )}
          </div>
          
          {/* Footer Text at Bottom */}
          {settings.footerPosition === "bottom" && (
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <p 
                style={{
                  fontFamily: settings.footerTextFont,
                  fontSize: `${settings.footerTextSize}px`,
                  color: settings.footerTextColor,
                  fontWeight: getFontWeight(settings.footerTextWeight)
                }}
              >
                {settings.footerText}
              </p>
            </div>
          )}
          
          {/* Clickable Layer */}
          {settings.isClickable && (
            <a 
              href={constructClickUrl()}
              className="absolute inset-0 z-10 cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.preventDefault()}
            >
              <span className="sr-only">Click banner</span>
            </a>
          )}
        </div>
        
        {/* Size Indicator */}
        <div className="mt-2 text-xs text-neutral-500 text-center">
          {settings.width} × {settings.height} px 
          {settings.width === 728 && settings.height === 90 ? ' · Leaderboard Banner' : ''}
          {settings.width === 300 && settings.height === 250 ? ' · Medium Rectangle' : ''}
          {settings.width === 300 && settings.height === 600 ? ' · Half Page' : ''}
          {settings.width === 320 && settings.height === 50 ? ' · Mobile Banner' : ''}
          {settings.width === 160 && settings.height === 600 ? ' · Skyscraper' : ''}
        </div>
      </div>
    </div>
  );
});

BannerPreview.displayName = "BannerPreview";

export default BannerPreview;
