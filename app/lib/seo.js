import { dict, LANGS } from "./i18n";
import { SITE, DOCTORS, CLINIC } from "./site";

const canonicalFor = (lang) => (lang === "uz" ? "/?lang=uz" : "/");

/** Полный набор Metadata API для выбранного языка */
export function buildMetadata(lang) {
  const m = dict[lang].meta;
  const other = LANGS.find((l) => l !== lang);
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical: canonicalFor(lang),
      languages: {
        "ru-UZ": "/",
        "uz-UZ": "/?lang=uz",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: m.title,
      description: m.description,
      url: canonicalFor(lang),
      locale: m.ogLocale,
      alternateLocale: [dict[other].meta.ogLocale],
      images: [
        { url: "/og.jpg", width: 1200, height: 630, alt: m.ogImageAlt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: ["/og.jpg"],
    },
  };
}

/** Структурированные данные schema.org (Dentist) — помогают локальной выдаче */
export function buildJsonLd(lang) {
  const t = dict[lang];
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE.url}/#clinic`,
    name: SITE.name,
    alternateName: "New Smile Clinic",
    url: SITE.url,
    description: t.meta.ldDescription,
    image: [`${SITE.url}/og.jpg`],
    logo: `${SITE.url}/icon-512.png`,
    medicalSpecialty: "Dentistry",
    telephone: DOCTORS.map((d) => d.phone.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Карасу-1, дом 14, кв. 46",
      addressLocality: "Ташкент",
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CLINIC.lat,
      longitude: CLINIC.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    availableLanguage: ["ru", "uz"],
    employee: DOCTORS.map((d) => ({
      "@type": "Person",
      name: dict.ru.doctors.names[d.id],
      alternateName: dict.uz.doctors.names[d.id],
      jobTitle: "Dentist",
      telephone: d.phone.tel,
    })),
  };
}
