import { createFileRoute } from "@tanstack/react-router";
import interior from "@/assets/clinic-interior.jpg";
import { CLINIC, TESTIMONIALS } from "@/lib/clinic";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { BookButton } from "@/components/site/Layout";

export const Route = createFileRoute("/doctor")({
  head: () => ({
    meta: [
      { title: "Dr. Ajay Kumar N Sachdev, MDS Orthodontist | RS Puram Coimbatore" },
      { name: "description", content: "Meet Dr. Ajay Kumar N Sachdev, MDS (Orthodontics), owner and director of Dr. Ajay's Dental Centre in RS Puram." },
      { property: "og:title", content: "Meet Dr. Ajay Kumar N Sachdev, MDS (Orthodontics)" },
      { property: "og:description", content: "The orthodontist behind Dr. Ajay's Dental Centre, RS Puram, Coimbatore." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Doctor,
});

function Doctor() {
  return (
    <>
      <PageHero script="Meet" eyebrow="Owner / Director" title={CLINIC.doctor}>MDS (Orthodontics)</PageHero>
      <section className="container-x section-y grid items-start gap-14 md:grid-cols-2">
        <Reveal><img src={interior} alt="Clinic treatment room, RS Puram" width={1600} height={1008} className="aspect-[4/5] w-full object-cover" /></Reveal>
        <Reveal delay={100}>
          <h2 className="caps text-[clamp(22px,2.4vw,30px)] text-ink">Specialist care, without the rush</h2>
          <p className="mt-6 leading-7 text-ink-soft">Dr. Ajay is a specialist orthodontist who founded the clinic to give RS Puram families specialist-level care without the rush. He personally plans braces and aligner treatment, and leads a team covering general, restorative and implant dentistry.</p>
          <p className="mt-4 leading-7 text-ink-soft">Patients often mention the same thing in their reviews: he explains the options and costs clearly before starting, so there are no surprises.</p>
          <figure className="mt-10 bg-surface-alt p-8">
            <blockquote className="leading-7 text-ink">"{TESTIMONIALS[1]!.text}"</blockquote>
            <figcaption className="mt-4 text-[14px] text-ink-soft">{TESTIMONIALS[1]!.name}, {TESTIMONIALS[1]!.source}</figcaption>
          </figure>
          <BookButton label="Book with Dr. Ajay" className="mt-10" />
        </Reveal>
      </section>
    </>
  );
}
