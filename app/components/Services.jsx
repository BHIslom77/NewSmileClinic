"use client";

import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./About";
import Icon from "./Icon";

function glow(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Services() {
  const { t } = useLang();
  const s = t.services;
  return (
    <section id="services" className="section services">
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} a={s.titleA} b={s.titleB} lead={s.lead} center />
        <div className="services__grid">
          {s.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 80} className="service-wrap">
              <article className="service" onPointerMove={glow}>
                <span className="service__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="service__icon"><Icon name={item.icon} size={28} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href="#contacts" className="service__link">
                  {s.more} <Icon name="arrowRight" size={18} />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
