"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { SectionHead } from "./About";
import { DAYS, DOCTORS, OFF_DAY } from "@/app/lib/site";
import Icon from "./Icon";

/**
 * Фото врача. Передайте `src` (путь из /public, например "/doctors/komil.jpg"
 * или импортированную картинку) — иначе показывается красивая заглушка.
 */
export function DoctorPhoto({ src, alt, placeholderLabel }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
        className="cover doctor__img"
      />
    );
  }
  return (
    <div className="doctor__placeholder" role="img" aria-label={placeholderLabel}>
      <span className="doctor__silhouette"><Icon name="user" size={92} stroke={1.2} /></span>
      <span className="doctor__hint"><Icon name="camera" size={16} /> {placeholderLabel}</span>
    </div>
  );
}

/** Карточка врача — все данные приходят через props */
export function DoctorCard({ name, role, experience, hours, hoursLabel, days, phone, callLabel, photo, photoLabel }) {
  return (
    <article className="doctor">
      <div className="doctor__photo">
        <DoctorPhoto src={photo} alt={name} placeholderLabel={photoLabel} />
        <span className="doctor__exp">{experience}</span>
      </div>
      <div className="doctor__body">
        <h3>{name}</h3>
        <p className="doctor__role">{role}</p>
        <ul className="doctor__meta">
          <li><Icon name="clock" size={18} /><span>{hoursLabel}: <b>{hours}</b></span></li>
          <li><Icon name="calendar" size={18} /><span>{days}</span></li>
          <li><Icon name="phone" size={18} /><a href={`tel:${phone.tel}`}>{phone.display}</a></li>
        </ul>
        <a href={`tel:${phone.tel}`} className="btn btn--soft doctor__call">
          <Icon name="phone" size={18} /> {callLabel}
        </a>
      </div>
    </article>
  );
}

function useTodayKey() {
  const [today, setToday] = useState("");
  useEffect(() => {
    try {
      const w = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Asia/Tashkent" })
        .format(new Date())
        .slice(0, 3)
        .toLowerCase();
      setToday(w);
    } catch {}
  }, []);
  return today;
}

export default function Doctors() {
  const { t } = useLang();
  const d = t.doctors;
  const today = useTodayKey();

  return (
    <section id="doctors" className="section doctors">
      <div className="container">
        <SectionHead eyebrow={d.eyebrow} a={d.titleA} b={d.titleB} lead={d.lead} center />

        <div className="doctors__grid">
          {DOCTORS.map((doc, i) => (
            <Reveal key={doc.id} delay={i * 110}>
              <DoctorCard
                name={d.names[doc.id]}
                role={d.role}
                experience={`${d.experience} ${doc.years} ${d.yearsWord}`}
                hours={doc.hours}
                hoursLabel={d.hoursLabel}
                days={d.daysShort}
                phone={doc.phone}
                callLabel={d.call}
                photo={doc.photo}
                photoLabel={d.photoPlaceholder}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="schedule">
          <h3 className="schedule__title">{d.scheduleTitle}</h3>
          <ul className="schedule__days">
            {DAYS.map((key) => {
              const off = key === OFF_DAY;
              return (
                <li key={key} className={`day ${off ? "day--off" : ""} ${today === key ? "day--today" : ""}`}>
                  <b>{d.dayNames[key]}</b>
                  <small>{off ? d.off : today === key ? d.today : "✓"}</small>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
