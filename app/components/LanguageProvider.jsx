"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dict, LANG_COOKIE } from "@/app/lib/i18n";

const LangContext = createContext(null);

export function LanguageProvider({ initialLang, children }) {
  const [lang, setLangState] = useState(initialLang);

  const setLang = useCallback((next) => {
    if (!dict[next]) return;
    setLangState(next);
    try {
      document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      localStorage.setItem(LANG_COOKIE, next);
    } catch {}
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    } catch {}
  }, []);

  // Без перезагрузки обновляем <html lang>, title и мета-теги под выбранный язык
  useEffect(() => {
    const m = dict[lang].meta;
    document.documentElement.lang = lang;
    document.title = m.title;
    const set = (selector, value) =>
      document.querySelector(selector)?.setAttribute("content", value);
    set('meta[name="description"]', m.description);
    set('meta[name="keywords"]', m.keywords.join(", "));
    set('meta[property="og:title"]', m.title);
    set('meta[property="og:description"]', m.description);
    set('meta[property="og:locale"]', m.ogLocale);
    set('meta[name="twitter:title"]', m.title);
    set('meta[name="twitter:description"]', m.description);
  }, [lang]);

  const value = useMemo(() => ({ lang, t: dict[lang], setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
