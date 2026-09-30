"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { DOCTORS, routeUrl } from "@/app/lib/site";
import Icon from "./Icon";

export default function Contacts() {
  const { t } = useLang();
  const c = t.contacts;
  const names = t.doctors.names;

  return (
    <section id="contacts" className="section contacts">
      <div className="container">
        <div className="contacts__panel">
          <span className="contacts__glow contacts__glow--1" aria-hidden="true" />
          <span className="contacts__glow contacts__glow--2" aria-hidden="true" />

          <div className="contacts__intro">
            <Reveal as="span" className="eyebrow eyebrow--light">{c.eyebrow}</Reveal>
            <Reveal as="h2" delay={80} className="section-title section-title--light">
              {c.titleA} <em>{c.titleB}</em>
            </Reveal>
            <Reveal as="p" delay={160} className="contacts__lead">{c.lead}</Reveal>

            <Reveal delay={220} className="contacts__info">
              <div className="info">
                <span className="info__icon"><Icon name="pin" size={22} /></span>
                <div>
                  <small>{c.addressTitle}</small>
                  <b>{t.location.address}</b>
                </div>
              </div>
              <div className="info">
                <span className="info__icon"><Icon name="clock" size={22} /></span>
                <div>
                  <small>{c.hoursTitle}</small>
                  <b>{c.hours}</b>
                  <em>{c.hoursNote}</em>
                </div>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <a className="btn btn--white btn--lg" href={routeUrl()} target="_blank" rel="noopener noreferrer">
                <Icon name="navigation" size={20} /> {c.route}
              </a>
            </Reveal>
          </div>

          <div className="contacts__phones">
            <h3>{c.phonesTitle}</h3>
            {DOCTORS.map((d, i) => (
              <Reveal key={d.id} delay={i * 90} variant="right">
                <a href={`tel:${d.phone.tel}`} className="phone-row">
                  <span className="phone-row__icon"><Icon name="phone" size={22} /></span>
                  <span className="phone-row__text">
                    <small>{names[d.id]} · {d.hours}</small>
                    <b>{d.phone.display}</b>
                  </span>
                  <span className="phone-row__go"><Icon name="arrowUpRight" size={20} /></span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
