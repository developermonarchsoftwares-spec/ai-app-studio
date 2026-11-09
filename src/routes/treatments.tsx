import { createFileRoute } from "@tanstack/react-router";
import { TREATMENTS } from "@/lib/clinic";
import { CtaButtons } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Dental Treatments & Prices | Dr. Ajay's Dental Centre, RS Puram" },
      { name: "description", content: "Braces, clear aligners, root canals, implants and scaling in RS Puram, Coimbatore, with indicative INR prices." },
      { property: "og:title", content: "Treatments & indicative prices, Dr. Ajay's Dental Centre" },
      { property: "og:description", content: "Orthodontics, implants, root canals and more in RS Puram, Coimbatore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Treatments,
});

function Treatments() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-20 md:py-28">
      <h1 className="text-4xl text-teal-deep md:text-5xl">Treatments & indicative prices</h1>
      <p className="mt-4 text-muted-foreground">All prices are indicative and confirmed at your visit after an examination.</p>
      <div className="mt-10 space-y-8">
        {TREATMENTS.map((t) => (
          <Reveal key={t.name}>
            <article className="rounded-3xl border bg-card p-7 shadow-card transition hover:shadow-soft">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl text-teal-deep">{t.name}</h2>
                <p className="font-semibold text-primary">{t.price}</p>
              </div>
              <p className="mt-3 text-muted-foreground">{t.desc}</p>
              <div className="mt-5"><CtaButtons /></div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
