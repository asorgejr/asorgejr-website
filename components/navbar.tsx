import React from "react";

export const NAVBAR_HEIGHT_PX = 64;
export const NAVBAR_HEIGHT = 16; // 16
const FONT_STYLE = "text-white text-2xl font-light tracking-tighter leading-tight text-white"


interface NavButtonProps {
  label: string;
  href: string;
  active?: boolean;
}

function NavButton({ label, href, active }: NavButtonProps) {
  const [path, setPath] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    // get current path, with query and fragments removed
    if (typeof window !== "undefined") {
      let path = window.location.pathname;
      const queryIndex = path.indexOf("?");
      if (queryIndex !== -1) {
        path = path.slice(0, queryIndex);
      }
      const fragIndex = path.indexOf("#");
      if (fragIndex !== -1) {
        path = path.slice(0, fragIndex);
      }
      setPath(path);
    }
  }, []);
  
  return (
      <a className={`w-16 h-12 flex flex-row justify-center items-center
      ${path === href
        ? "bg-gradient-to-tr from-blue-200 to-purple-400 bg-clip-text text-transparent"
        : "text-gray-400 transition-colors duration-100 ease-in-out"
      } hover:text-white transition-colors duration-100 ease-in-out
      `}
         href={href}
      >
        <div className={`text-2xl font-light tracking-tighter leading-tight`}>
          {label}
        </div>
      </a>
  )
}




export interface NavbarProps {
  visible?: boolean;
  animated?: boolean;
}

function transitProps({visible, animated }: NavbarProps, durationMS: number=1000) {
  let ret = `${visible ? "opacity-100" : "opacity-0"}`;
  if (animated) {
    ret = `transition-opacity duration-${durationMS}ms ease-in-out ${ret}`;
  }
  return ret;
}

export function Navbar(props: NavbarProps) {
  return (
    <div className={`bg-black
    w-full h-16
    fixed top-0 left-0 z-50
    flex flex-row justify-center items-center
    ${transitProps(props)}`}
    >
      <div className="flex flex-row justify-center items-center pr-8">
        <NavButton label={"HOME"} href={"/"} />
      </div>
      <div className="flex flex-row justify-center items-center pl-8">
        <NavButton label={"BLOG"} href={"/blog"} />
      </div>
    </div>
  )
}
