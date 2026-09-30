"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CLINIC } from "@/app/lib/site";

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const popupHtml = (title, address) =>
  `<div class="map-popup"><strong>${esc(title)}</strong><span>${esc(address)}</span></div>`;

const PIN_HTML = `
  <span class="clinic-pin__pulse"></span>
  <span class="clinic-pin__dot">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="1.2" stroke-linejoin="round">
      <path d="M7 3C4.8 3 3 4.8 3 7.4c0 2 .8 3.4 1.4 5.2.6 1.9.6 4 1.3 6 .4 1.1 1.3 1.6 2 1.4 1-.3 1.2-1.6 1.6-3.2.3-1.2.9-2 1.7-2s1.4.8 1.7 2c.4 1.6.6 2.9 1.6 3.2.7.2 1.6-.3 2-1.4.7-2 .7-4.1 1.3-6C20.2 10.8 21 9.4 21 7.4 21 4.8 19.2 3 17 3c-1.6 0-2.6.6-5 .6S8.6 3 7 3z"/>
    </svg>
  </span>`;

export default function MapView({ title, address, label }) {
  const elRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const map = L.map(elRef.current, {
      center: [CLINIC.lat, CLINIC.lng],
      zoom: CLINIC.zoom,
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile, // на телефоне карта не перехватывает прокрутку страницы
      zoomControl: false,
    });
    L.control.zoom({ position: "topright" }).addTo(map);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
    }).addTo(map);

    const icon = L.divIcon({ className: "clinic-pin", html: PIN_HTML, iconSize: [56, 56], iconAnchor: [28, 28], popupAnchor: [0, -22] });
    const marker = L.marker([CLINIC.lat, CLINIC.lng], { icon, title: "NewSmileClinic" }).addTo(map);
    marker.bindPopup(popupHtml(title, address), { closeButton: false, offset: [0, -4] });
    markerRef.current = marker;

    // колесо мыши включается только после клика по карте
    map.on("click", () => map.scrollWheelZoom.enable());
    map.on("mouseout", () => map.scrollWheelZoom.disable());

    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(elRef.current);

    return () => {
      ro.disconnect();
      markerRef.current = null;
      map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // смена языка — обновляем подпись метки без пересоздания карты
  useEffect(() => {
    markerRef.current?.setPopupContent(popupHtml(title, address));
  }, [title, address]);

  return <div ref={elRef} className="map__canvas" role="application" aria-label={label} />;
}
