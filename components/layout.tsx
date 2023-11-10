import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import {Navbar, NAVBAR_HEIGHT, NAVBAR_HEIGHT_PX} from "@/components/navbar";
import React from "react";

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  const [scrollYDelta, setScrollYDelta] = React.useState(0);
  const [scrollYDirection, setScrollYDirection] = React.useState(0);
  const [navBarVisible, setNavBarVisible] = React.useState(true);
  
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollYDirection(scrollY - scrollYDelta);
      setScrollYDelta(scrollY);
      if (scrollYDirection > 0 && scrollY >= NAVBAR_HEIGHT_PX && navBarVisible) {
        setNavBarVisible(false);
      } else if (scrollYDirection < 0 && !navBarVisible) {
        setNavBarVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollYDelta]);
  
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {/*<Alert preview={preview} />*/}
        {/* Pad, since navbar is sticky and detached from layout. */ }
        <div className={`h-${NAVBAR_HEIGHT}`} />
        <main>
          <Navbar visible={navBarVisible} animated={true} />
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
