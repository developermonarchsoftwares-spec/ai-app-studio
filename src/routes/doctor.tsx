import { createFileRoute } from "@tanstack/react-router";
import interior from "@/assets/clinic-interior.jpg";
import { CLINIC } from "@/lib/clinic";
import { CtaButtons } from "@/components/site/Layout";

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
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:py-28 md:grid-cols-2">
      <img src={interior} alt="Clinic treatment room, RS Puram" width={1600} height={1008} className="rounded-[2rem] object-cover shadow-soft" />
      <div>
        <p className="text-sm uppercase tracking-widest text-primary">Owner / Director</p>
        <h1 className="mt-2 text-4xl text-teal-deep md:text-5xl">{CLINIC.doctor}</h1>
        <p className="mt-2 font-semibold text-muted-foreground">MDS (Orthodontics)</p>
        <p className="mt-6 leading-relaxed">Dr. Ajay is a specialist orthodontist who founded the clinic to give RS Puram families specialist-level care without the rush. He personally plans braces and aligner treatment, and leads a team covering general, restorative and implant dentistry.</p>
        <p className="mt-4 leading-relaxed">Patients often mention the same thing in their reviews: he explains the options and costs clearly before starting, so there are no surprises.</p>
        <div className="mt-8"><CtaButtons /></div>
      </div>
    </section>
  );
}
