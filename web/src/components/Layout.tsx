import { useFeatureFlagEnabled } from "posthog-js/react";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { Link, Outlet } from "@tanstack/react-router";
import Footer from "./Footer";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const flagEnabled = useFeatureFlagEnabled("test-flag");
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 200 && currentScrollY > lastScrollY) {
        // Scroll down
        setIsHeaderVisible(false);
      } else {
        // Scroll up
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  
  if (
    (flagEnabled && window.location.origin === "https://forge-5v1.pages.dev") ||
    import.meta.env.VITE_FEATURE_LAUNCH === "true"
  )  {
    return (
      <div className="font-lexend bg-[url('/web-background.png')] bg-cover relative overflow-hidden bg-repeat">
        <header 
          className={`bg-deepteal text-sand fixed w-full top-0 z-50 transition-transform duration-300 ${
            isHeaderVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="border-b hidden lg:block">
            <div className="container mx-auto py-4 flex justify-between items-center">
              <span>Lets forge a future together</span>
              <div className="flex font-bold items-center">
                <div className="mr-8">contact@romanforge.dev</div>
                <div className="mr-8">(517) 258-2462</div>
                <Link className="bg-sand text-deepteal py-2 px-3" to="/contact">
                  GET QUOTE
                </Link>
              </div>
            </div>
          </div>
          <div className="border-b">
            <div className="flex flex-col lg:flex-row container mx-auto justify-between items-center border-r py-3">
              <div className="flex justify-between items-center w-full lg:w-auto">
                <Link to="/">
                  <img className="h-24" src="/new-logo.svg" alt="Roman Forge Logo"/>
                </Link>
                <button
                  className="lg:hidden p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </button>
              </div>
              <nav className="hidden lg:flex flex-col lg:flex-row font-semibold justify-evenly w-1/3">
                <Link to="/about">ABOUT</Link>
                <Link to="/process">PROCESS</Link>
                <Link to="/services">SERVICES</Link>
                <Link to="/contact">CONTACT</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-white z-40 transition-transform duration-300 lg:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <nav className="flex flex-col items-center space-y-8 text-xl">
              <Link
                to="/about"
                className="hover:text-deepteal transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                to="/process"
                className="hover:text-deepteal transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                PROCESS
              </Link>
              <Link
                to="/services"
                className="hover:text-deepteal transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                SERVICES
              </Link>
              <Link
                to="/contact"
                className="hover:text-deepteal transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
            </nav>
          </div>
        </div>

        {/* Add padding to account for fixed header */}
        <div className="pt-[120px] lg:pt-[160px]">
          <div className="hidden lg:block absolute -z-10 -top-72 translate-x-[500px]">
            <img
              src="./logo-circle.png"
              alt="Animated Roman Forge Logo"
              className="animate-[spin_2000000ms_linear_infinite]"
            />
          </div>
          <Outlet />
          <Footer />
        </div>
      </div>
    );
  }

  return <Outlet />;
}
