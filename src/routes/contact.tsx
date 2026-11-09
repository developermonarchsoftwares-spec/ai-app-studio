import { createFileRoute } from "@tanstack/react-router";
import { CLINIC, HOURS } from "@/lib/clinic";
import { CtaButtons } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Visit Us: DB Road, RS Puram, Coimbatore | Dr. Ajay's Dental Centre" },
      { name: "description", content: "Address, map, opening hours and contact for Dr. Ajay's Dental Centre, Pinnacle Krishna Building, DB Road, RS Puram." },
      { property: "og:title", content: "Visit Dr. Ajay's Dental Centre, RS Puram" },
      { property: "og:description", content: "Find us on DB Road, RS Puram, Coimbatore. Walk-ins welcome." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:py-28 md:grid-cols-2">
      <div>
        <h1 className="text-4xl text-teal-deep md:text-5xl">Visit the clinic</h1>
        <p className="mt-5 leading-relaxed">{CLINIC.address}</p>
        <a href={CLINIC.maps} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary">Open in Google Maps & see reviews →</a>
        <h2 className="mt-10 text-2xl text-teal-deep">Opening hours</h2>
        <ul className="mt-4 space-y-2">
          {HOURS.map((h) => <li key={h.day} className="flex justify-between gap-4 border-b pb-2 text-sm"><span className="font-semibold">{h.day}</span><span className="text-muted-foreground">{h.time}</span></li>)}
        </ul>
        <p className="mt-2 text-xs text-muted-foreground">Hours to be confirmed. Please WhatsApp before visiting.</p>
        <p className="mt-8 text-sm"><a href={CLINIC.tel} className="font-semibold">{CLINIC.phone}</a> · <a href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a></p>
        <div className="mt-6"><CtaButtons /></div>
      </div>
      <iframe title="Map to Dr. Ajay's Dental Centre" src={CLINIC.mapEmbed} loading="lazy" className="h-[420px] w-full rounded-[2rem] border shadow-soft md:h-full" />
    </section>
  );
}
