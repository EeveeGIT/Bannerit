import { forwardRef } from "react";
import { BannerSettings } from "@/lib/types";
import { getBannerStyle, getLogoPositionStyle } from "@/lib/bannerUtils";

interface BannerPreviewProps {
  settings: BannerSettings;
}

const BannerPreview = forwardRef<HTMLDivElement, BannerPreviewProps>((props, ref) => {
  const { settings } = props;
  const bannerStyle = getBannerStyle(settings);
  const logoStyle = getLogoPositionStyle(settings.logoPosition);
  
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
              className="font-heading font-bold text-center"
              style={{
                fontFamily: settings.headingFont,
                fontSize: `${settings.headingSize}px`,
                color: settings.headingColor,
                textAlign: settings.headingAlign
              }}
            >
              {settings.headingText}
            </h2>
            <p 
              className="mt-1"
              style={{
                fontFamily: settings.subTextFont,
                fontSize: `${settings.subTextSize}px`,
                color: settings.subTextColor
              }}
            >
              {settings.subText}
            </p>
            
            {settings.showCta && (
              <a 
                href={settings.ctaUrl}
                className="mt-3 px-4 py-1 rounded text-sm font-medium"
                style={{
                  backgroundColor: settings.ctaBackgroundColor,
                  color: settings.ctaTextColor
                }}
                onClick={(e) => e.preventDefault()}
              >
                {settings.ctaText}
              </a>
            )}
          </div>
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
