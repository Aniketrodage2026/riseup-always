"use client";

import Link from "next/link";
import { Leaf, Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { clinic } from "@/lib/clinic";

export function Logo({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`logo ${light ? "logo-light" : ""}`} aria-label="Jivan Urja home"><span className="logo-mark"><Leaf size={27} strokeWidth={1.4} /></span><span><strong>jivan urja<span className="logo-dot">.</span></strong><small>CHIKITSALAYA · PUNE</small></span></Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  const links = [["Knee care", "/#knee-care"], ["Our approach", "/#approach"], ["Your care journey", "/#process"], ["FAQs", "/#faq"]];
  return <>
    <div className="announcement"><span>Rooted in Ayurveda. Focused on your knee health.</span><a href={`tel:${clinic.phone}`}><Phone size={12} /> {clinic.displayPhone}</a></div>
    <header className="site-header">
      <div className="container flex h-21 items-center justify-between gap-5">
        <Logo />
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main navigation">{links.map(([title, href]) => <Link className="nav-link" key={title} href={href}>{title}</Link>)}</nav>
        <div className="flex items-center gap-3"><Link className="button button-dark header-booking" href="/#consultation">Book a consultation <ArrowUpRight size={16} /></Link><button className="menu-toggle xl:hidden" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
      </div>
      {open && <nav id="mobile-navigation" className="mobile-nav xl:hidden" aria-label="Mobile navigation">{links.map(([title, href]) => <Link key={title} href={href} onClick={() => setOpen(false)}>{title}<ArrowUpRight size={16} /></Link>)}<Link href="/#consultation" onClick={() => setOpen(false)}>Book a consultation <ArrowUpRight size={16} /></Link></nav>}
    </header>
  </>;
}
