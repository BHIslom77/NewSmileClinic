// ─────────────────────────────────────────────────────────────
//  Единое место с данными клиники. Меняйте здесь — сайт обновится.
// ─────────────────────────────────────────────────────────────
import roomOne from "@/public/inter.jpg";
import roomTwo from "@/public/inter2.jpg";
import facade from "@/public/inter3.jpg";
import chair from "@/public/inter4.jpg";
import lounge from "@/public/inter5.jpg";
import logo from "@/public/logo-nav.png";

export const SITE = {
  name: "NewSmileClinic",
  // Замените на реальный домен (или задайте NEXT_PUBLIC_SITE_URL в .env)
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://newsmileclinic.uz",
};

export const photos = { roomOne, roomTwo, facade, chair, lounge };
export { logo };

/**
 * Координаты метки на карте (используются и для кнопки «Построить маршрут»).
 * ВАЖНО: проверьте точку в Google Maps — зажмите нужное место на карте,
 * внизу появятся цифры вида 41.xxxxx, 69.xxxxx — подставьте их сюда.
 */
export const CLINIC = { lat: 41.33545, lng: 69.370895, zoom: 17 };

// Google Place ID точки (необязательно, но вместе с координатами даёт
// самый точный маршрут — Google Maps не пытается сам угадывать адрес по тексту)
export const CLINIC_PLACE_ID = "ChIJ67IN0jr0rjgR0uPQryae76k";

// Адрес — только для показа на сайте (подпись на карте, карточка контактов)
export const ROUTE_DESTINATION =
  "Карасу-1, дом 14, квартира 46, Ташкент, Узбекистан";

// Маршрут строим по координатам, а не по тексту адреса — так Google Maps
// не промахивается на соседние дома/объекты с похожим адресом
export const routeUrl = () => {
  const dest = `${CLINIC.lat},${CLINIC.lng}`;
  const params = new URLSearchParams({
    api: "1",
    destination: dest,
    travelmode: "driving",
  });
  if (CLINIC_PLACE_ID) params.set("destination_place_id", CLINIC_PLACE_ID);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
};

export const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
export const OFF_DAY = "fri";

/**
 * Врачи. Чтобы вставить фото — положите файл в /public/doctors/
 * и укажите путь в поле `photo`, например: photo: "/doctors/komil.jpg"
 * (рекомендуемый формат — вертикальный 4:5, от 800×1000 px).
 */
export const DOCTORS = [
  {
    id: "komil",
    photo: "/doc1.jpg",
    years: 17,
    hours: "12:00–20:00",
    phone: { tel: "++998993079700 ", display: "+998 99 307 97 00 " },
  },
  {
    id: "azizjon",
    photo: "/doc2.jpg",
    years: 14,
    hours: "10:00–18:00",
    phone: { tel: "+998955709999 ", display: "+998 95 570 99 99 " },
  },
  {
    id: "jasur",
    photo: "/doc3.jpg",
    years: 14,
    hours: "09:00–19:00",
    phone: { tel: "+998909930395", display: "+998 90 993 03 95" },
  },
];
