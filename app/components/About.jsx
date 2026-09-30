"use client";

import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { photos } from "@/app/lib/site";
import Icon from "./Icon";

export function SectionHead({ eyebrow, a, b, lead, center = false }) {
  return (
    <div className={`section-head ${center ? "section-head--center" : ""}`}>
      <Reveal as="span" className="eyebrow">{eyebrow}</Reveal>
      <Reveal as="h2" delay={80} className="section-title">
        {a} <em>{b}</em>
      </Reveal>
      {lead && <Reveal as="p" delay={160} className="section-lead">{lead}</Reveal>}
    </div>
  );
}

export default function About() {
  const { t } = useLang();
  const a = t.about;
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <Reveal variant="left" className="about__media">
          <div className="about__img about__img--main">
            <Image src={photos.roomOne} alt={a.imgAlt1} fill placeholder="blur" sizes="(min-width: 1024px) 30vw, 70vw" className="cover" />
          </div>
          <div className="about__img about__img--small">
            <Image src={photos.chair} alt={a.imgAlt2} fill placeholder="blur" sizes="(min-width: 1024px) 20vw, 50vw" className="cover" />
          </div>
          <div className="about__badge glass">
            <Icon name="sparkles" size={20} />
            <span>{a.badge}</span>
          </div>
        </Reveal>

        <div className="about__text">
          <SectionHead eyebrow={a.eyebrow} a={a.titleA} b={a.titleB} />
          <Reveal as="p" delay={200} className="about__p">{a.p1}</Reveal>
          <Reveal as="p" delay={260} className="about__p about__p--muted">{a.p2}</Reveal>
        </div>
      </div>

      <div className="container">
        <ul className="features">
          {a.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 90} className="feature">
              <span className="feature__icon"><Icon name={item.icon} size={26} /></span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
