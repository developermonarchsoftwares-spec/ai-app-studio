import { createFileRoute } from "@tanstack/react-router";
import { CLINIC, FAQS, HOURS } from "@/lib/clinic";
import { CtaButtons } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { FAQ } from "@/components/site/Home";

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
    <>
      <PageHero script="Visit Us" title="Visit the clinic">
        <p>{CLINIC.address}. Walk-ins are welcome; a quick WhatsApp before you come keeps your wait short.</p>
        <div className="mt-8"><CtaButtons /></div>
      </PageHero>
      <section className="container-x section-y grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="caps text-[21px] text-ink">Opening hours</h2>
          <ul className="mt-6">
            {HOURS.map((h) => (
              <li key={h.day} className="flex flex-col gap-1 border-b border-[var(--rule)] py-4 sm:flex-row sm:justify-between">
                <span className="font-normal text-ink">{h.day}</span><span className="text-ink-soft">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] text-ink-soft">Hours to be confirmed. Please WhatsApp before visiting.</p>
        </div>
        <div>
          <h2 className="caps mb-6 text-[21px] text-ink">Common questions</h2>
          <div className="[&>div]:md:!grid-cols-1"><FAQ items={FAQS} /></div>
        </div>
      </section>
    </>
  );
}
