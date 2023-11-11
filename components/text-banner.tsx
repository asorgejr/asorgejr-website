import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";



export enum TextBannerVariant {
  Light,
  Dark,
}

export interface TextBannerProps {
  heading: string;
  content: string|JSX.Element;
  variant: TextBannerVariant;
  expectInView?: boolean;
}

export function TextBanner({ heading, content, variant, expectInView }: TextBannerProps) {
  const fgColor = variant === TextBannerVariant.Light ? "text-black" : "text-white";
  const bgColor = variant === TextBannerVariant.Light ? "bg-accent-1" : "bg-accent-7";
  const contentStyle = typeof content === "string"
    ? "text-normal font-normal flex-1 md:pl-0 pl-8 md:pr-0 pr-8"
    : "flex-1 md:pl-0 pl-8 md:pr-0 pr-8";
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    initialInView: expectInView,
  });
  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className={`flex md:flex-row flex-col
    justify-center items-center 
    min-h-[280px]
    pt-8 pb-8 pl-8 pr-8
    ${bgColor} ${fgColor}`}
    >
      <motion.div className="text-2xl font-light tracking-tighter leading-tight md:pr-12 pr-0 md:w-[150px] md:max-w-[150px] w-fit"
                  ref={ref}
                  variants={headerAnimVariant}
                  initial="hidden"
                  animate={controls}
      >
        <h5>{heading}</h5>
      </motion.div>
      <div className="md:flex-grow-0 flex-grow md:h-0 h-4" />
      <motion.div className={contentStyle}
            ref={ref}
            variants={contentAnimVariant}
            initial="hidden"
            animate={controls}
      >
        {content}
      </motion.div>
    </div>
  )
}


const ANIM_DUR: number = 0.6;

const headerAnimVariant = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIM_DUR,
    },
  },
  hidden: {
    opacity: 0,
    x: -100,
    transition: {
      duration: ANIM_DUR,
    },
  },
}

const contentAnimVariant = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIM_DUR,
    },
  },
  hidden: {
    opacity: 0,
    y: 100,
    transition: {
      duration: ANIM_DUR,
    },
  },
}
