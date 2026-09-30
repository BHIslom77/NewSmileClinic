"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import Icon from "./Icon";

/** Плавающая кнопка записи — показывается на телефонах после прокрутки hero */
export default function FloatingCall() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const contacts = document.getElementById("contacts");
      const nearContacts = contacts ? contacts.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
      setShow(window.scrollY > 500 && !nearContacts);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a href="#contacts" className={`fab ${show ? "is-visible" : ""}`} aria-label={t.footer.floatingCall} tabIndex={show ? 0 : -1}>
      <Icon name="phone" size={22} />
      <span>{t.footer.floatingCall}</span>
    </a>
  );
}
