import { SITE } from "@/app/lib/site";

// Next.js отдаёт этот файл по адресу /sitemap.xml
export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          ru: SITE.url,
          uz: `${SITE.url}/?lang=uz`,
        },
      },
    },
    {
      url: `${SITE.url}/?lang=uz`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
