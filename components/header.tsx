"use client";
import { useState } from "react";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { home } from "@/content/home";

export function Wordmark() {
  return <span className="wordmark">gen<span className="wordmark-yz">yz</span><span className="wordmark-studio">studio<span className="brand-dot">.</span></span></span>;
}
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header" onKeyDown={(e) => { if (e.key === "Escape") { setOpen(false); document.getElementById("menu-toggle")?.focus(); } }}>
    <div className="shell header-inner">
      <a className="brand" href="#" aria-label="GenYZ Studio — về đầu trang" onClick={() => setOpen(false)}><Wordmark /></a>
      <nav aria-label="Điều hướng chính" className="desktop-nav">{home.nav.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>
      <a className="header-contact" href="#lien-he">Liên hệ <ArrowUpRight size={17} aria-hidden="true" /></a>
      <button id="menu-toggle" className="menu-toggle" aria-label={open ? "Đóng menu" : "Mở menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X size={25} /> : <List size={25} />}</button>
    </div>
    <nav id="mobile-nav" aria-label="Điều hướng trên điện thoại" className="mobile-nav" hidden={!open}>{[...home.nav, { label: "Liên hệ", href: "#lien-he" }].map(link => <a href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}</nav>
  </header>;
}
