"use client";

import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { logo } from "@/app/lib/site";

const SECTIONS = ["about", "services", "doctors", "location", "contacts"];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" className="brand" aria-label={t.nav.home}>
          <Image src={logo} alt="NewSmileClinic" sizes="180px" className="brand__img" />
        </a>
        <nav className="footer__nav" aria-label="Footer">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`}>{t.nav[id]}</a>
          ))}
        </nav>
        <p className="footer__copy">
          © {new Date().getFullYear()} NewSmileClinic · {t.footer.tagline}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
