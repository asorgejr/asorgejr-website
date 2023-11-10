import React from "react";

export enum TextBannerVariant {
  Light,
  Dark,
}

export interface TextBannerProps {
  heading: string;
  content: string|JSX.Element;
  variant: TextBannerVariant;
}

export function TextBanner({ heading, content, variant }: TextBannerProps) {
  const fgColor = variant === TextBannerVariant.Light ? "text-black" : "text-white";
  const bgColor = variant === TextBannerVariant.Light ? "bg-accent-1" : "bg-accent-7";
  const contentStyle = typeof content === "string"
    ? "text-normal font-normal flex-1 md:pl-0 pl-8 md:pr-0 pr-8"
    : "flex-1 md:pl-0 pl-8 md:pr-0 pr-8";
  return (
    <div className={`flex md:flex-row flex-col
    justify-center items-center 
    min-h-[280px]
    pt-8 pb-8 pl-8 pr-8
    ${bgColor} ${fgColor}`}
    >
      <div className="text-2xl font-light tracking-tighter leading-tight md:pr-12 pr-0 md:w-[150px] md:max-w-[150px] w-fit"
      >
        <h5>{heading}</h5>
      </div>
      <div className="md:flex-grow-0 flex-grow md:h-0 h-4" />
      <div className={contentStyle}>
        {content}
      </div>
    </div>
  )
}
