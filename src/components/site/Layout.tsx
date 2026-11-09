import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Star } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import { ChatAssistant } from "./ChatAssistant";

export function CtaButtons({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-whatsapp-foreground shadow-soft transition hover:-translate-y-0.5">
        <MessageCircle className="size-5" /> Book on WhatsApp
      </a>
      <a href={CLINIC.tel} className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition hover:-translate-y-0.5 ${light ? "border-primary-foreground/40 text-primary-foreground" : "border-primary text-primary"}`}>
        <Phone className="size-5" /> Call Now
      </a>
    </div>
  );
}

const NAV = [
  { to: "/", label: "Home" },
  { to: "/treatments", label: "Treatments" },
  { to: "/doctor", label: "Meet the Doctor" },
  { to: "/contact", label: "Visit Us" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="font-display text-xl font-semibold text-teal-deep">Dr. Ajay's <span className="text-gold">Dental</span></Link>
        <nav className="hidden gap-6 text-sm md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-muted-foreground transition hover:text-primary" activeProps={{ className: "text-primary font-semibold" }} activeOptions={{ exact: true }}>{n.label}</Link>
          ))}
        </nav>
        <div className="hidden gap-2 md:flex">
          <a href={CLINIC.tel} className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary">Call</a>
          <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className="rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-whatsapp-foreground">Book on WhatsApp</a>
        </div>
      </div>
      <nav className="flex gap-5 overflow-x-auto px-5 pb-2 text-sm md:hidden">
        {NAV.map((n) => (
          <Link key={n.to} to={n.to} className="whitespace-nowrap text-muted-foreground" activeProps={{ className: "text-primary font-semibold" }} activeOptions={{ exact: true }}>{n.label}</Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-teal-deep pb-28 pt-16 text-primary-foreground md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{CLINIC.name}</p>
          <p className="mt-3 text-sm opacity-80">{CLINIC.address}</p>
          <a href={CLINIC.maps} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-gold"><Star className="size-4 fill-current" /> {CLINIC.rating} on Google · {CLINIC.reviews} reviews</a>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">Contact</p>
          <a href={CLINIC.tel} className="block opacity-80">{CLINIC.phone}</a>
          <a href={`mailto:${CLINIC.email}`} className="block opacity-80">{CLINIC.email}</a>
        </div>
        <div>
          <p className="mb-4 font-display text-xl">Your smile, sorted this week.</p>
          <CtaButtons light />
        </div>
      </div>
      <p className="mt-12 text-center text-xs opacity-60">© {new Date().getFullYear()} {CLINIC.name}, RS Puram, Coimbatore</p>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t bg-background/95 p-3 backdrop-blur md:hidden">
      <a href={CLINIC.tel} className="flex items-center justify-center gap-2 rounded-full border border-primary py-3 text-sm font-semibold text-primary"><Phone className="size-4" /> Call Now</a>
      <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3 text-sm font-semibold text-whatsapp-foreground"><MessageCircle className="size-4" /> WhatsApp</a>
    </div>
  );
}

export function FloatingWhatsApp() {
  return (
    <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-6 right-6 z-50 hidden size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-soft transition hover:scale-105 md:flex">
      <MessageCircle className="size-7" />
    </a>
  );
}

export function SiteChrome() {
  return (<><MobileBar /><FloatingWhatsApp /><ChatAssistant /></>);
}
