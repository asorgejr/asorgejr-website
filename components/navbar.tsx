
export const NAVBAR_HEIGHT_PX = 64;
export const NAVBAR_HEIGHT = 16; // 16
const FONT_STYLE = "text-white text-2xl font-light tracking-tighter leading-tight text-white"

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
      {/* HOME | BLOG | ABOUT */}
      <div className="flex flex-row justify-center items-center pr-8">
        <a className={FONT_STYLE} href="/">
          HOME
        </a>
      </div>
      <div className="flex flex-row justify-center items-center pl-8">
        <a className={FONT_STYLE} href="/blog">
          BLOG
        </a>
      </div>
      {/*<div className="flex flex-row justify-center items-center pl-2">*/}
      {/*  <a className={FONT_STYLE} href="/">*/}
      {/*    ABOUT*/}
      {/*  </a>*/}
      {/*</div>*/}
    </div>
  )
}