"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, ButtonLink } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled || undefined} data-open={open || undefined}>
      <div className="site-header__inner">
        <a className="brand" href="#top" aria-label="Coursework Compass home">
          <BrandMark className="brand__mark" />
          <span>Coursework Compass</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#product">Product</a>
          <a href="#method">How it works</a>
        </nav>
        <div className="site-header__actions">
          <ThemeToggle />
          <ButtonLink className="desktop-cta" href="#start">Start planning</ButtonLink>
          <Button intent="quiet" size="icon" className="menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation" aria-hidden={!open}>
        <a href="#product" onClick={() => setOpen(false)}>Product <span>01</span></a>
        <a href="#method" onClick={() => setOpen(false)}>How it works <span>02</span></a>
        <ButtonLink href="#start" size="large" onClick={() => setOpen(false)}>Start planning</ButtonLink>
      </nav>
    </header>
  );
}
