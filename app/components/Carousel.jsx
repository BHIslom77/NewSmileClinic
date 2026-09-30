"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";

/** slides: [{ src, alt, caption }] */
export default function Carousel({ slides, labels, interval = 5200 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(null);
  const count = slides.length;

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearTimeout(id);
  }, [index, paused, count, interval]);

  const onPointerDown = (e) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="carousel__viewport"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (startX.current = null)}
      >
        <div className="carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((s, i) => (
            <figure className="carousel__slide" key={i} aria-hidden={i !== index}>
              <Image
                src={s.src}
                alt={s.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="cover"
                draggable={false}
              />
              <figcaption className={i === index ? "is-active" : ""}>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="carousel__shade" aria-hidden="true" />
      </div>

      <button type="button" className="carousel__arrow carousel__arrow--prev" onClick={() => go(index - 1)} aria-label={labels.prev}>
        <Icon name="chevLeft" size={22} />
      </button>
      <button type="button" className="carousel__arrow carousel__arrow--next" onClick={() => go(index + 1)} aria-label={labels.next}>
        <Icon name="chevRight" size={22} />
      </button>

      <div className="carousel__footer">
        <span className="carousel__count">
          {String(index + 1).padStart(2, "0")}<i> / {String(count).padStart(2, "0")}</i>
        </span>
        <div className="carousel__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === index ? "is-active" : ""}
              aria-label={`${labels.goTo} ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
