// src/components/Header.tsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Cart } from "./Cart";
import { Download, Menu, X } from "lucide-react";
import logo from "@/assets/kasi-kota-logo.png";
import { scrollToSection } from "@/lib/scroll";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Track which section is currently active
  const [active, setActive] = useState("home");

  const goTo = (section?: string) => {
    if (location.pathname === "/") {
      if (section) scrollToSection(section);
    } else {
      navigate("/");
      if (section) scrollToSection(section);
    }
  };

  // Scroll Spy — detect which section is in view
  useEffect(() => {
    if (location.pathname !== "/") {
      setActive("home"); // Default highlight outside home page
      return;
    }

    const handler = () => {
      const pos = window.scrollY + 200; // "trigger offset"

      const products = document.getElementById("products");
      const footer = document.getElementById("footer");

      if (footer && pos >= footer.offsetTop) {
        setActive("contact");
      } else if (products && pos >= products.offsetTop) {
        setActive("menu");
      } else {
        setActive("home");
      }
    };

    window.addEventListener("scroll", handler);
    handler(); // Run on mount

    return () => window.removeEventListener("scroll", handler);
  }, [location.pathname]);

  const activeClass = "text-primary underline underline-offset-4 font-semibold";

  const isActive = (key: string) =>
    active === key ? activeClass : "text-sm font-medium hover:text-primary transition-colors";

  const downloadMenu = () => {
    const menuContent = `
KASI KOTA - MENU
================

THE FULL HOUSE KOTA - R45
Chips, polony, cheese, russian, atchar, and our signature sauce

CHEESY RUSSIAN KOTA - R40
Double cheese, grilled russian, chips, and spicy mayo

SPICY CHICKEN KOTA - R50
Grilled chicken, hot chips, and peri-peri sauce

VEGGIE DELIGHT KOTA - R35
Grilled veggies, chips, cheese, and garlic mayo

BREAKFAST KOTA - R42
Eggs, cheese, chips, and tomato sauce

BURGER SUPREME KOTA - R65
Premium burger, cheese, chips, and mushroom sauce

================
Contact us to place your order!
Phone: +27 (0)11 123 4567
WhatsApp: +27 (0)82 345 6789
`;
    const blob = new Blob([menuContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kasi-kota-menu.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <div
          onClick={() => goTo()}
          className="flex items-center cursor-pointer select-none"
        >
          <img
            src={logo}
            alt="Kasi Kota Logo"
            className="h-24 w-auto object-contain"
            draggable="false"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <button className={isActive("home")} onClick={() => goTo()}>
            Home
          </button>

          <button className={isActive("menu")} onClick={() => goTo("products")}>
            Menu
          </button>

          <button className={isActive("contact")} onClick={() => goTo("footer")}>
            Contact
          </button>
        </nav>

        {/* Buttons + Cart */}
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            className="bg-primary text-background font-extrabold px-6 py-3 rounded-full shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 items-center hidden sm:flex"
            onClick={downloadMenu}
          >
            <Download className="mr-2 h-5 w-5" />
            Download Menu
          </Button>

          <Cart />

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded hover:bg-accent"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden">
          <div className="absolute right-0 top-0 h-full w-64 bg-background shadow-xl p-6 flex flex-col gap-6 animate-slide-in">

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="self-end p-2"
              aria-label="Close navigation menu"
            >
              <X size={22} />
            </button>

            {/* Mobile Nav */}
            <nav className="flex flex-col gap-4 text-lg font-medium">
              <button className={isActive("home")} onClick={() => { setOpen(false); goTo(); }}>Home</button>
              <button className={isActive("menu")} onClick={() => { setOpen(false); goTo("products"); }}>Menu</button>
              <button className={isActive("contact")} onClick={() => { setOpen(false); goTo("footer"); }}>Contact</button>
            </nav>

            {/* Download Button */}
            <Button
              size="lg"
              className="bg-primary text-background font-extrabold px-6 py-3 rounded-full shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 mt-6"
              onClick={downloadMenu}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Menu
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
