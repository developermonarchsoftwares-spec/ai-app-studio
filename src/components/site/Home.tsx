import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Plus, Star } from "lucide-react";
import { CountUp } from "./Reveal";

/* ───────────── StatCard ───────────── */
export function StatCard({ value, decimals = 0, suffix = "", label, hint, href, stars }: { value: number; decimals?: number; suffix?: string; label: string; hint?: string; href?: string; stars?: number }) {
  const body = (
    <>
      <p className="text-4xl font-light leading-none transition-transform duration-300 group-hover:scale-105 sm:text-5xl">
        <CountUp to={value} decimals={decimals} />{suffix}
      </p>
      {stars !== undefined && (
        <div className="mt-2 flex gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, s) => (
            <Star key={s} className="size-3.5 text-white/90 transition-transform duration-300 group-hover:-translate-y-0.5" style={{ transitionDelay: `${s * 40}ms` }} fill={s < Math.round(stars) ? "currentColor" : "none"} />
          ))}
        </div>
      )}
      <p className="mt-2 text-[14px] font-normal tracking-wide sm:text-[15px]">{label}</p>
      {hint && (
        <p className="grid grid-rows-[0fr] text-[12px] text-white/80 opacity-0 transition-all duration-300 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <span className="overflow-hidden pt-1">{hint}{href ? " →" : ""}</span>
        </p>
      )}
    </>
  );
  const cls = "group flex h-36 w-full flex-col items-center justify-center rounded-[10px] bg-mauve px-4 py-5 text-center text-white transition-all duration-300 hover:-translate-y-1 hover:bg-mauve-strong hover:shadow-lg focus-visible:-translate-y-1 focus-visible:bg-mauve-strong focus-visible:outline-none";
  return href ? <a href={href} target="_blank" rel="noreferrer" className={cls}>{body}</a> : <div tabIndex={0} className={cls}>{body}</div>;
}

/* ───────────── Horizontal carousel (scroll-snap, no library) ───────────── */
export function Carousel({ children, label, className = "", controls = true }: { children: ReactNode; label: string; className?: string; controls?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 24), behavior: "smooth" });
  };
  return (
    <div className={className}>
      <div ref={ref} role="region" aria-label={label} tabIndex={0} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[max(24px,calc((100vw-var(--container))/2+24px))]">
        {children}
      </div>
      {controls && (
        <div className="container-x mt-10 flex gap-3">
          <button aria-label="Previous" onClick={() => go(-1)} className="grid size-12 place-items-center rounded-[7px] border border-ink/20 text-ink transition-colors duration-300 hover:border-mauve-strong hover:bg-mauve-strong hover:text-white"><ArrowLeft className="size-5" /></button>
          <button aria-label="Next" onClick={() => go(1)} className="grid size-12 place-items-center rounded-[7px] border border-ink/20 text-ink transition-colors duration-300 hover:border-mauve-strong hover:bg-mauve-strong hover:text-white"><ArrowRight className="size-5" /></button>
        </div>
      )}
    </div>
  );
}

/* ───────────── SpecialityTile ───────────── */
export function SpecialityTile({ slug, name, price, img, index }: { slug: string; name: string; price: string; img: string; index: number }) {
  return (
    <Link to="/treatments/$slug" params={{ slug }} className="group relative block aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden sm:w-[46vw] lg:w-[340px]">
      <img src={img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: `${(index * 23) % 100}% center` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      <span className="absolute left-6 top-6 text-[13px] font-normal tracking-[0.2em] text-white/80">0{index + 1}</span>
      <div className="absolute inset-x-6 bottom-6 text-white">
        <h3 className="caps text-[19px] leading-snug md:text-[21px]">{name}</h3>
        <p className="mt-2 text-[14px] text-white/75">{price}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-normal opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">Learn more <ArrowRight className="size-4" /></span>
      </div>
    </Link>
  );
}

/* ───────────── TreatmentTabs (vertical tabs + accent panel) ───────────── */
export function TreatmentTabs({ items }: { items: { name: string; desc: string; price: string; slug: string; img: string }[] }) {
  const [active, setActive] = useState(0);
  const cur = items[active]!;
  return (
    <div className="grid lg:grid-cols-[320px_1fr]">
      <div role="tablist" aria-orientation="vertical" aria-label="Treatments" className="no-scrollbar flex overflow-x-auto bg-white lg:flex-col">
        {items.map((t, i) => (
          <button
            key={t.slug}
            role="tab"
            id={`tab-${t.slug}`}
            aria-selected={i === active}
            aria-controls="tab-panel"
            onClick={() => setActive(i)}
            className={`shrink-0 border-b border-[var(--rule)] px-6 py-5 text-left text-[16px] transition-colors duration-300 lg:border-l-2 ${
              i === active ? "font-normal text-mauve-strong lg:border-l-mauve-strong" : "font-light text-ink-soft hover:text-ink lg:border-l-transparent"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div id="tab-panel" role="tabpanel" aria-labelledby={`tab-${cur.slug}`} className="grid bg-mauve text-white md:grid-cols-2">
        <div key={cur.slug} className="hero-in flex flex-col justify-center p-8 md:p-12">
          <h3 className="caps text-[24px] leading-snug md:text-[28px]">{cur.name}</h3>
          <p className="mt-5 leading-7 text-white/90">{cur.desc}</p>
          <p className="mt-6 text-[14px] uppercase tracking-[0.15em] text-white/70">Indicative</p>
          <p className="text-[20px] font-normal">{cur.price}</p>
          <Link to="/treatments/$slug" params={{ slug: cur.slug }} className="btn-ghost mt-8 self-start">Read more</Link>
        </div>
        <img key={cur.img + active} src={cur.img} alt="" loading="lazy" className="hero-in h-72 w-full object-cover md:h-full" style={{ objectPosition: `${(active * 31) % 100}% center` }} />
      </div>
    </div>
  );
}

/* ───────────── ReviewSlider ───────────── */
export function ReviewSlider({ reviews }: { reviews: { name: string; source: string; text: string }[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((x) => (x + 1) % reviews.length), 6000);
    return () => clearTimeout(t);
  }, [i, paused, reviews.length]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="grid gap-6 md:grid-cols-3" aria-live="polite">
        {reviews.map((r, k) => (
          <figure
            key={r.name}
            className={`flex flex-col bg-[#f4f3f4] p-8 transition-all duration-500 md:p-10 ${k === i ? "opacity-100 md:-translate-y-2" : "opacity-60"} ${k === i ? "" : "hidden md:flex"}`}
          >
            <div className="flex gap-1 text-mauve-strong" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="size-4 fill-current" />)}
            </div>
            <blockquote className="mt-6 flex-1 text-[17px] leading-8 text-ink">"{r.text}"</blockquote>
            <figcaption className="mt-8">
              <p className="caps text-[15px] text-ink">{r.name}</p>
              <p className="text-[14px] text-ink-soft">{r.source}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-10 flex items-center gap-4">
        {reviews.map((r, k) => (
          <button key={r.name} aria-label={`Show review ${k + 1}`} onClick={() => setI(k)} className="relative h-[3px] flex-1 overflow-hidden bg-[var(--rule)]">
            {k < i && <span className="absolute inset-0 bg-mauve" />}
            {k === i && <span key={`${i}-${paused}`} className={`absolute inset-0 bg-mauve ${paused ? "" : "progress-fill"}`} />}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────── RotatingWord ───────────── */
export function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <span key={i} className="word-in text-mauve-strong">{words[i]}</span>
    </span>
  );
}

/* ───────────── Marquee ───────────── */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap px-8 text-[clamp(22px,3vw,38px)] font-extralight">
          {t}<span className="ml-16 inline-block size-2 rounded-full bg-white/60" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden bg-mauve py-8 text-white">
      <div className="marquee-track">{row(false)}{row(true)}</div>
    </div>
  );
}

/* ───────────── FAQ ───────────── */
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="grid items-start gap-4 md:grid-cols-2">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="bg-surface-alt">
            <h3>
              <button
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left text-[17px] font-normal text-ink"
              >
                {f.q}
                <Plus className={`size-5 shrink-0 text-mauve-strong transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
              </button>
            </h3>
            <div id={`faq-${i}`} className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="px-7 pb-7 leading-7 text-ink-soft">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ───────────── Parallax image ───────────── */
export function Parallax({ src, alt, className = "", strength = 40, position = "center" }: { src: string; alt: string; className?: string; strength?: number; position?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = ref.current?.getBoundingClientRect();
        if (!r || !img.current) return;
        const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        img.current.style.transform = `translateY(${p * -strength}px) scale(1.15)`;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, [strength]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img ref={img} src={src} alt={alt} loading="lazy" className="h-full w-full scale-[1.15] object-cover will-change-transform" style={{ objectPosition: position }} />
    </div>
  );
}
