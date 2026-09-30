# NewSmileClinic — одностраничный сайт (Next.js App Router)

```bash
npm install      # подтянет leaflet
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Что менять

| Что | Где |
|---|---|
| Фото врачей | положите файл в `public/doctors/`, впишите путь в `photo` в `app/lib/site.js` → `DOCTORS` (например `"/doctors/komil.jpg"`, формат 4:5). Компонент: `DoctorPhoto` / `DoctorCard` в `app/components/Doctors.jsx` |
| Координаты метки на карте | `CLINIC` в `app/lib/site.js` (**проверьте точку!**) |
| Адрес для Google Maps | `ROUTE_DESTINATION` в `app/lib/site.js` |
| Все тексты RU / UZ, услуги, SEO | `app/lib/i18n.js` |
| Домен сайта (metadataBase, OG, canonical) | переменная `NEXT_PUBLIC_SITE_URL` в `.env.local`, например `https://newsmileclinic.uz` |

## Язык
Переключатель RU / UZ работает без перезагрузки, выбор хранится в cookie + localStorage.
Для поисковиков доступны адреса `/` (RU) и `/?lang=uz` (UZ) с `hreflang`, отдельными title/description/OG.
