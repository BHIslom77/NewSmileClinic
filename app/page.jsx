import { cookies } from "next/headers";
import { LANG_COOKIE, normalizeLang } from "@/app/lib/i18n";
import { buildJsonLd, buildMetadata } from "@/app/lib/seo";
import { LanguageProvider } from "@/app/components/LanguageProvider";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Services from "@/app/components/Services";
import Doctors from "@/app/components/Doctors";
import Location from "@/app/components/Location";
import Contacts from "@/app/components/Contacts";
import Footer from "@/app/components/Footer";
import FloatingCall from "@/app/components/FloatingCall";

// Язык: ?lang=uz (для поисковиков и ссылок) → cookie → русский по умолчанию
async function resolveLang(searchParams) {
  const sp = (await searchParams) || {};
  if (sp.lang) return normalizeLang(Array.isArray(sp.lang) ? sp.lang[0] : sp.lang);
  const store = await cookies();
  return normalizeLang(store.get(LANG_COOKIE)?.value);
}

export async function generateMetadata({ searchParams }) {
  return buildMetadata(await resolveLang(searchParams));
}

export default async function Page({ searchParams }) {
  const lang = await resolveLang(searchParams);
  return (
    <LanguageProvider initialLang={lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Doctors />
        <Location />
        <Contacts />
      </main>
      <Footer />
      <FloatingCall />
    </LanguageProvider>
  );
}
