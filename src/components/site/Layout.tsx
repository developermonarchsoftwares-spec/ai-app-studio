import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Phone, MessageCircle, CalendarCheck, Menu, X, ChevronDown, MapPin, Mail, Clock, Star, ArrowUpRight } from "lucide-react";
import { CLINIC, HOURS, TREATMENT_PAGES } from "@/lib/clinic";
import { ChatAssistant } from "./ChatAssistant";

/* ───────────── Shared bits ───────────── */

export function Script({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span aria-hidden="true" className={`script-word block ${className}`}>{children}</span>;
}

/** Script word overlapping a Sora heading, the signature section title. */
export function SectionTitle({ script, title, align = "left", light = false, as: H = "h2" }: { script: string; title: ReactNode; align?: "left" | "center"; light?: boolean; as?: "h1" | "h2" }) {
  return (
    <div className={`relative ${align === "center" ? "text-center" : ""}`}>
      <Script className={light ? "!text-white/40" : ""}>{script}</Script>
      <H className={`h2-sora relative -mt-[0.55em] ${light ? "!text-white" : ""}`}>{title}</H>
    </div>
  );
}

export function BookButton({ label = "Book an Appointment", className = "" }: { label?: string; className?: string }) {
  return (
    <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className={`btn ${className}`}>
      {label}
    </a>
  );
}

/* Kept for backwards compatibility with any older imports. */
export function CtaButtons({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <BookButton />
      <a href={CLINIC.tel} className={`inline-flex items-center gap-2 font-medium ${light ? "text-white" : "text-ink"} link-u`}>
        <Phone className="size-4" /> {CLINIC.phone}
      </a>
    </div>
  );
}

/* ───────────── Header ───────────── */

const NAV = [
  { to: "/", label: "Home" },
  { to: "/doctor", label: "Our Doctor" },
  { to: "/treatments", label: "Treatments", dropdown: true },
  { to: "/contact", label: "Contact" },
] as const;

function Logo({ light }: { light: boolean }) {
  return (
    <Link to="/" aria-label={`${CLINIC.name}, home`} className={`leading-none transition-colors duration-300 ${light ? "text-white" : "text-ink"}`}>
      <span className="caps block text-[22px] md:text-[26px]">Dr. Ajay's</span>
      <span className="mt-1 block text-[10px] font-normal uppercase tracking-[0.42em] opacity-80">Dental Centre</span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const transparent = isHome && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent ? "bg-transparent" : "bg-white shadow-[0_6px_30px_-12px_rgba(49,42,35,.18)]"
      }`}
    >
      <div className={`container-x flex items-center justify-between transition-all duration-300 ${transparent ? "py-7" : "py-4"}`}>
        <Logo light={transparent} />

        <nav aria-label="Primary" className={`hidden items-center gap-10 lg:flex ${transparent ? "text-white" : "text-ink"}`}>
          {NAV.map((n) =>
            "dropdown" in n ? (
              <div key={n.to} className="group relative">
                <Link to={n.to} className="inline-flex items-center gap-1 py-2 text-[16px] font-light transition-opacity hover:opacity-70">
                  {n.label} <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-2 bg-white p-3 text-ink opacity-0 shadow-[0_20px_40px_-20px_rgba(0,0,0,.25)] transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {TREATMENT_PAGES.map((t) => (
                    <Link key={t.slug} to="/treatments/$slug" params={{ slug: t.slug }} className="block px-4 py-2.5 text-[15px] font-light transition-colors hover:bg-surface-alt hover:text-mauve-strong">
                      {t.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }} activeProps={{ className: "!font-normal" }} className="py-2 text-[16px] font-light transition-opacity hover:opacity-70">
                {n.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-7 lg:flex">
          <a href={CLINIC.tel} className={`inline-flex items-center gap-2 text-[15px] transition-colors ${transparent ? "text-white" : "text-ink"}`}>
            <Phone className="size-4" /> {CLINIC.phone}
          </a>
          <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className={`btn !px-7 !py-4 ${transparent ? "!bg-white !text-ink hover:!bg-mauve-strong hover:!text-white" : ""}`}>
            Book an Appointment
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={`grid size-11 place-items-center lg:hidden ${transparent ? "text-white" : "text-ink"}`}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="container-x max-h-[calc(100vh-80px)] overflow-y-auto border-t bg-white pb-8 pt-4 lg:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="block border-b border-[var(--rule)] py-4 text-lg font-light text-ink">
              {n.label}
            </Link>
          ))}
          <div className="py-3 pl-4">
            {TREATMENT_PAGES.map((t) => (
              <Link key={t.slug} to="/treatments/$slug" params={{ slug: t.slug }} className="block py-2 text-[15px] font-light text-ink-soft">
                {t.name}
              </Link>
            ))}
          </div>
          <BookButton className="mt-4 w-full" />
        </nav>
      )}
    </header>
  );
}

/* ───────────── Footer ("Visit Us") ───────────── */

function InfoBlock({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-[12px] font-normal uppercase tracking-[0.2em] text-white/50">{icon}{label}</p>
      <div className="mt-2 text-[15px] leading-relaxed text-white/90">{children}</div>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="mt-12 grid gap-3 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        if (f.get("company")) return; // honeypot
        const msg = `Hello ${CLINIC.name}, I'm ${f.get("name")}. I'd like to book an appointment. Please call me on ${f.get("phone")}.`;
        window.open(`https://wa.me/919843054225?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
        setSent(true);
      }}
    >
      <label className="sr-only" htmlFor="cf-name">Your name</label>
      <input id="cf-name" name="name" required autoComplete="name" placeholder="Your name" className="h-14 border border-white/15 bg-transparent px-4 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none" />
      <label className="sr-only" htmlFor="cf-phone">Phone number</label>
      <input id="cf-phone" name="phone" required type="tel" autoComplete="tel" placeholder="Phone number" className="h-14 border border-white/15 bg-transparent px-4 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none" />
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <button type="submit" className="btn sm:col-span-2 hover:!bg-white hover:!text-ink">
        {sent ? "Opening WhatsApp…" : "Request a Call Back"}
      </button>
      <p className="text-[12px] text-white/45 sm:col-span-2">We only ask for your name and number. Nothing is stored on this website; your message opens in WhatsApp.</p>
    </form>
  );
}

export function SiteFooter() {
  return (
    <footer id="visit" className="bg-ink-deep pb-32 pt-[var(--section-y)] text-white lg:pb-12">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Script className="!text-white/35">Visit Us</Script>
          <p className="h2-sora -mt-[0.5em] !text-white">We'd love to meet you.</p>
          <p className="mt-6 max-w-md text-white/70">A calm, unhurried clinic on DB Road. Message us before you come and we'll keep your wait short.</p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <InfoBlock icon={<MapPin className="size-3.5" />} label="Address">{CLINIC.address}</InfoBlock>
            <InfoBlock icon={<Clock className="size-3.5" />} label="Opening hours">
              {HOURS.map((h) => (
                <p key={h.day}><span className="text-white">{h.day}</span><br /><span className="text-white/70">{h.time}</span></p>
              ))}
            </InfoBlock>
            <InfoBlock icon={<Phone className="size-3.5" />} label="Phone"><a className="hover:underline" href={CLINIC.tel}>{CLINIC.phone}</a></InfoBlock>
            <InfoBlock icon={<MessageCircle className="size-3.5" />} label="WhatsApp"><a className="hover:underline" href={CLINIC.whatsapp} target="_blank" rel="noreferrer">Message us</a></InfoBlock>
            <InfoBlock icon={<Mail className="size-3.5" />} label="Email"><a className="break-all hover:underline" href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a></InfoBlock>
            <InfoBlock icon={<Star className="size-3.5" />} label="Google">
              <a className="hover:underline" href={CLINIC.maps} target="_blank" rel="noreferrer">{CLINIC.rating} ★ · {CLINIC.reviews} reviews</a>
            </InfoBlock>
          </div>

          <ContactForm />
        </div>

        <div className="flex flex-col">
          <div className="relative min-h-[420px] flex-1 overflow-hidden">
            <iframe
              title={`Map showing ${CLINIC.name}`}
              src={CLINIC.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale contrast-[1.05] invert-[.9] hue-rotate-180"
            />
          </div>
          <a href={CLINIC.maps} target="_blank" rel="noreferrer" className="btn mt-4 self-start hover:!bg-white hover:!text-ink">
            Get Directions <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>

      <div className="container-x mt-20 border-t border-white/10 pt-8 text-[13px] text-white/50">
        <p className="max-w-3xl">For dental or medical emergencies, call <a href="tel:112" className="text-white underline">112</a> or go to your nearest emergency department. Prices on this site are indicative; your exact cost is confirmed at your visit.</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {CLINIC.name}, RS Puram, Coimbatore</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-6">
            <Link to="/treatments" className="text-[#c9c1ca] hover:text-white">Treatments</Link>
            <Link to="/doctor" className="text-[#c9c1ca] hover:text-white">Our Doctor</Link>
            <Link to="/contact" className="text-[#c9c1ca] hover:text-white">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/* ───────────── Mobile action bar ───────────── */

export function MobileBar() {
  const item = "flex flex-col items-center justify-center gap-1 py-3 text-[12px] font-medium";
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t bg-white lg:hidden">
      <a href={CLINIC.tel} className={`${item} text-ink`}><Phone className="size-5" />Call</a>
      <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className={`${item} text-ink`}><MessageCircle className="size-5" />WhatsApp</a>
      <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className={`${item} bg-mauve-strong text-white`}><CalendarCheck className="size-5" />Book</a>
    </nav>
  );
}

/* ───────────── Cookie bar ───────────── */

export function CookieBar() {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!localStorage.getItem("cookie-ok")) setShow(true); }, []);
  if (!show) return null;
  return (
    <div role="region" aria-label="Cookie notice" className="fixed inset-x-3 bottom-20 z-[45] flex items-center justify-between gap-4 bg-white px-5 py-3 text-[14px] shadow-[0_10px_40px_-10px_rgba(0,0,0,.25)] lg:inset-x-auto lg:bottom-6 lg:left-6 lg:max-w-xl">
      <p className="text-ink-soft">We use only essential cookies to keep this site working.</p>
      <button onClick={() => { localStorage.setItem("cookie-ok", "1"); setShow(false); }} className="shrink-0 rounded-[7px] bg-mauve-strong px-5 py-2.5 font-medium text-white transition-colors hover:bg-ink">
        OK
      </button>
    </div>
  );
}

export function SiteChrome() {
  return (
    <>
      <MobileBar />
      <CookieBar />
      <ChatAssistant />
    </>
  );
}
