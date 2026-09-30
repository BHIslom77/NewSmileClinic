import "./globals.css";
import { cookies } from "next/headers";
import { Manrope, Playfair_Display } from "next/font/google";
import { SITE } from "@/app/lib/site";
import { LANG_COOKIE, normalizeLang } from "@/app/lib/i18n";

const sans = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// Иконки (favicon) берутся из app/favicon.ico, app/icon.png, app/apple-icon.png.
// Общие для обоих языков настройки. Языковые title/description/OG — в page.jsx
export const metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "health",
  formatDetection: { telephone: true, address: true, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a7cff",
};

export default async function RootLayout({ children }) {
  const store = await cookies();
  const lang = normalizeLang(store.get(LANG_COOKIE)?.value);
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
