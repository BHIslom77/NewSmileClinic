"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { LANGS } from "@/app/lib/i18n";
import { logo } from "@/app/lib/site";
import Icon from "./Icon";

const SECTIONS = ["about", "services", "doctors", "location", "contacts"];

export function LanguageSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang" role="group" aria-label={t.nav.language}>
      <span className="lang__thumb" style={{ transform: `translateX(${LANGS.indexOf(lang) * 100}%)` }} aria-hidden="true" />
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className="lang__btn"
          aria-pressed={lang === l}
          lang={l}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header className={`header ${scrolled || open ? "header--solid" : ""}`}>
      <div className="container header__inner">
        <a href="#top" className="brand" aria-label={t.nav.home} onClick={() => setOpen(false)}>
          <Image src={logo} alt="NewSmileClinic" priority sizes="200px" className="brand__img" />
        </a>

        <nav className="nav" aria-label="Main">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className={`nav__link ${active === id ? "is-active" : ""}`}>
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <LanguageSwitch />
          <a href="#contacts" className="btn btn--primary btn--sm header__cta">
            {t.nav.cta}
          </a>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>
    </header>

      <div id="mobile-menu" className={`drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav className="drawer__nav" aria-label="Mobile">
          {SECTIONS.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              className="drawer__link"
              style={{ "--i": i }}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <span>{t.nav[id]}</span>
              <Icon name="arrowRight" size={20} />
            </a>
          ))}
          <a href="#contacts" className="btn btn--primary drawer__cta" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            <Icon name="phone" size={18} /> {t.nav.cta}
          </a>
        </nav>
      </div>
    </>
  );
}
