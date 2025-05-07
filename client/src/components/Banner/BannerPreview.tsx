import React, { forwardRef, useState, useEffect } from "react";
export type TextAlign = "left" | "right" | "center" | "justify" | "start" | "end";
import { getBannerStyle, getLogoPositionStyle, getFontWeight } from "@/lib/bannerUtils";
import { BannerSettings } from "@/lib/types";

interface BannerPreviewProps {
  settings: BannerSettings;
}

const BannerPreview = forwardRef<HTMLDivElement, BannerPreviewProps>(({ settings }, ref) => {
  const {
    headingOffsetX = 0,
    headingOffsetY = 0,
    subOffsetX = 0,
    subOffsetY = 0,
    ctaOffsetX = 0,
    ctaOffsetY = 0,
    logoOffsetX = 0,
    logoOffsetY = 0,
    footerOffsetX = 0,
    footerOffsetY = 0,
  } = settings;

  const bannerStyle = getBannerStyle(settings);
  const logoBaseStyle = getLogoPositionStyle(settings.logoPosition, settings.width, settings.height);

  const logoStyle = {
    ...logoBaseStyle,
    transform: `${logoBaseStyle.transform ?? ""} translate(${logoOffsetX}px, ${logoOffsetY}px)`,
  };

  // Animaatiotekstin tila Headingille
  const [animatedHeading, setAnimatedHeading] = useState(
    settings.headingAnimationTexts?.[0] || settings.headingText || "Default Heading"
  );

  useEffect(() => {
    if (settings.isHeadingAnimated && settings.headingAnimationTexts?.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        setAnimatedHeading(settings.headingAnimationTexts[index] || settings.headingText || "Default Heading");
        index = (index + 1) % settings.headingAnimationTexts.length;
      }, 1200); // Vaihtoväli 1.2 sekuntia
      return () => clearInterval(interval);
    } else {
      setAnimatedHeading(settings.headingText || "Default Heading"); // Palauta kiinteä teksti, jos animaatio ei ole käytössä
    }
  }, [settings.isHeadingAnimated, settings.headingAnimationTexts, settings.headingText]);

  // Animaatiotekstin tila Subtextille
  const [animatedSubText, setAnimatedSubText] = useState(
    settings.subTextAnimationTexts?.[0] || settings.subText || "Default Subtext"
  );

  useEffect(() => {
    const subAnimationTextsLength = settings.subAnimationTexts?.length ?? 0;
    if (settings.isSubTextAnimated && subAnimationTextsLength > 0) {
      let index = 0;
      const interval = setInterval(() => {
        setAnimatedSubText(settings.subAnimationTexts?.[index] || settings.subText || "Default Subtext");
        index = (index + 1) % subAnimationTextsLength;
      }, 1200); // Vaihtoväli 1.2 sekuntia
      return () => clearInterval(interval);
    } else {
      setAnimatedSubText(settings.subText || "Default Subtext"); // Palauta kiinteä teksti, jos animaatio ei ole käytössä
    }
  }, [settings.isSubTextAnimated, settings.subTextAnimationTexts, settings.subText]);

  return (
    <div className="lg:w-1/2 h-[250px] lg:h-full p-4 bg-neutral-200 flex items-center justify-center overflow-auto">
      <div className="relative bg-white shadow-lg rounded-md p-4 overflow-hidden">
        {/* Click Layer */}
        {settings.ctaUrl && (
          <a
            href={settings.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-20"
            style={{ textDecoration: "none" }}
          />
        )}

        <div
          id="banner-preview"
          ref={ref}
          className={`relative ${
            settings.backgroundType === "animation" ? `bg-animation-${settings.backgroundValue}` : ""
          } rounded overflow-hidden`}
          style={{
            width: `${settings.width}px`,
            height: `${settings.height}px`,
            ...bannerStyle,
          }}
        >
          {/* Logo */}
          {settings.logoPath && (
            <img
              src={settings.logoPath}
              alt="Logo"
              className="absolute z-10 rounded"
              style={{
                ...logoStyle,
                width: `${settings.logoSize || 100}px`,
                height: `${settings.logoSize || 100}px`,
              }}
            />
          )}

          {/* Tekstisisältö */}
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            {/* Heading */}
            <h1
              className="text-center"
              style={{
                fontFamily: settings.headingFont,
                fontSize: `${settings.headingSize || 24}px`,
                fontWeight: getFontWeight(settings.headingWeight),
                color: settings.headingColor || "#fff7ea",
                textAlign: (settings.headingAlign as TextAlign) || "left",
                transform: `translate(${headingOffsetX}px, ${headingOffsetY}px)`,
              }}
            >
              {settings.isHeadingAnimated ? animatedHeading : settings.headingText}
            </h1>

            {/* Subtext */}
            {settings.subText && (
              <p
                className="text-center mt-2"
                style={{
                  fontFamily: settings.subTextFont,
                  fontSize: `${settings.subTextSize || 16}px`,
                  fontWeight: getFontWeight(settings.subTextWeight),
                  color: settings.subTextColor || "#000",
                  textAlign: (settings.subTextAlign as TextAlign) || "center",
                  transform: `translate(${subOffsetX}px, ${subOffsetY}px)`,
                }}
              >
                {settings.isSubTextAnimated ? animatedSubText : settings.subText}
              </p>
            )}

            {/* Footer Text */}
            {settings.footerText && (
              <p
                className="absolute bottom-4 text-center"
                style={{
                  fontFamily: settings.footerTextFont,
                  fontSize: `${settings.footerTextSize || 12}px`,
                  fontWeight: getFontWeight(settings.footerTextWeight),
                  color: settings.footerTextColor || "#000",
                  textAlign: (settings.footerTextAlign as TextAlign) || "center",
                  transform: `translate(${footerOffsetX}px, ${footerOffsetY}px)`,
                }}
              >
                {settings.footerText}
              </p>
            )}

            {/* CTA Button */}
            {settings.ctaText && (
              <a
                href={settings.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 rounded inline-block text-center"
                style={{
                  backgroundColor: settings.ctaBackgroundColor || "#000",
                  color: settings.ctaTextColor || "#fff",
                  borderRadius: `${settings.ctaBorderRadius || 0}px`, // Lisätty kulmien pyöristys
                  transform: `translate(${ctaOffsetX}px, ${ctaOffsetY}px)`,
                  textDecoration: "none",
                }}
              >
                {settings.ctaText}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

BannerPreview.displayName = "BannerPreview";
export default BannerPreview;