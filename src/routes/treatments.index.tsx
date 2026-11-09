import { createFileRoute } from "@tanstack/react-router";
import interior from "@/assets/clinic-interior.jpg";
import smile from "@/assets/smile-patient.jpg";
import { TREATMENT_PAGES } from "@/lib/clinic";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { SpecialityTile } from "@/components/site/Home";
import { BookButton } from "@/components/site/Layout";

export const Route = createFileRoute("/treatments/")({
  head: () => ({
    meta: [
      { title: "Dental Treatments & Prices | Dr. Ajay's Dental Centre, RS Puram" },
      { name: "description", content: "Braces, clear aligners, implants, root canals, crowns and cleaning in RS Puram, Coimbatore, with indicative prices." },
    ],
  }),
  component: Treatments,
});

function Treatments() {
  return (
    <>
      <PageHero script="Discover" title="What We Treat">
        Six core treatments, each explained before we begin. Prices shown are indicative; your exact cost is confirmed at your visit.
      </PageHero>
      <section className="container-x section-y">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 [&_a]:!w-full">
          {TREATMENT_PAGES.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) * 80}>
              <SpecialityTile slug={t.slug} name={t.name} price={t.price} img={i % 2 ? smile : interior} index={i} />
            </Reveal>
          ))}
        </div>
        <div className="mt-20 text-center"><BookButton label="Book Your Consultation" /></div>
      </section>
    </>
  );
}
