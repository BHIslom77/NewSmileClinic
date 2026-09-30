"use client";

import dynamic from "next/dynamic";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./About";
import Carousel from "./Carousel";
import { photos, routeUrl } from "@/app/lib/site";
import Icon from "./Icon";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => <div className="map__skeleton" />,
});

export default function Location() {
  const { t } = useLang();
  const l = t.location;

  const order = [photos.facade, photos.roomOne, photos.roomTwo, photos.chair, photos.lounge];
  const slides = order.map((src, i) => ({ src, alt: l.slides[i].alt, caption: l.slides[i].caption }));

  return (
    <section id="location" className="section location">
      <div className="container">
        <SectionHead eyebrow={l.eyebrow} a={l.titleA} b={l.titleB} center />

        <div className="location__grid">
          <Reveal variant="left" className="map-card">
            <MapView title={l.popupTitle} address={l.address} label={l.mapLabel} />
            <div className="map-card__address glass">
              <span className="map-card__icon"><Icon name="pin" size={22} /></span>
              <span>
                <small>{l.addressLabel}</small>
                <b>{l.address}</b>
              </span>
            </div>
            <a className="btn btn--primary map-card__route" href={routeUrl()} target="_blank" rel="noopener noreferrer">
              <Icon name="navigation" size={20} /> {l.route}
              <small>{l.routeHint}</small>
            </a>
          </Reveal>

          <Reveal variant="right" delay={120} className="gallery">
            <h3 className="gallery__title">{l.galleryTitle}</h3>
            <Carousel slides={slides} labels={{ prev: l.prev, next: l.next, goTo: l.goTo }} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
