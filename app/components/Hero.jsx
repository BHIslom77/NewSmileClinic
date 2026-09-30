"use client";

import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { CountUp } from "./Reveal";
import { photos } from "@/app/lib/site";
import Icon from "./Icon";

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  return (
    <section id="top" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <span className="orb orb--1" />
        <span className="orb orb--2" />
        <span className="hero__dots" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="chip hero__anim" style={{ "--a": 0 }}>
            <i className="chip__dot" /> {h.eyebrow}
          </span>
          <h1 className="hero__title hero__anim" style={{ "--a": 1 }}>
            <span className="accent">{h.titleA}</span> {h.titleB}
          </h1>
          <p className="hero__lead hero__anim" style={{ "--a": 2 }}>{h.lead}</p>
          <div className="hero__cta hero__anim" style={{ "--a": 3 }}>
            <a href="#contacts" className="btn btn--primary btn--lg">
              <Icon name="phone" size={20} /> {h.ctaPrimary}
            </a>
            <a href="#services" className="btn btn--ghost btn--lg">
              {h.ctaSecondary} <Icon name="arrowRight" size={20} />
            </a>
          </div>
          <ul className="hero__stats hero__anim" style={{ "--a": 4 }}>
            {h.stats.map((s) => (
              <li key={s.label}>
                <strong><CountUp to={s.n} prefix={s.pre} suffix={s.suf} /></strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual hero__anim" style={{ "--a": 2 }}>
          <span className="hero__ring" aria-hidden="true" />
          <div className="hero__arch">
            <Image
              src={photos.roomTwo}
              alt={h.imageAlt}
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="cover"
            />
          </div>
          <div className="hero__facade">
            <Image
              src={photos.facade}
              alt={h.facadeAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 20vw, 45vw"
              className="cover"
            />
          </div>
          <div className="float float--a glass">
            <span className="float__icon"><Icon name="calendar" size={20} /></span>
            <span>
              <b>{h.badgeDays}</b>
              <small>{h.badgeOff}</small>
            </span>
          </div>
          <div className="float float--b glass">
            <span className="float__icon"><Icon name="pin" size={20} /></span>
            <span><b>{h.badgePlace}</b></span>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label={h.scroll}>
        <span />
      </a>
    </section>
  );
}
