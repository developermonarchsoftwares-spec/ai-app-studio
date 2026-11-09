import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import interior from "@/assets/clinic-interior.jpg";
import smile from "@/assets/smile-patient.jpg";
import { CLINIC, TREATMENT_PAGES } from "@/lib/clinic";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { BookButton, SectionTitle } from "@/components/site/Layout";

export const Route = createFileRoute("/treatments/$slug")({
  loader: ({ params }) => {
    const index = TREATMENT_PAGES.findIndex((t) => t.slug === params.slug);
    if (index < 0) throw notFound();
    return { index };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? TREATMENT_PAGES[loaderData.index] : undefined;
    return {
      meta: t
        ? [
            { title: `${t.name} in RS Puram, Coimbatore | ${CLINIC.name}` },
            { name: "description", content: `${t.desc} Indicative cost ${t.price}.` },
          ]
        : [],
    };
  },
  component: Treatment,
});

function Treatment() {
  const { index } = Route.useLoaderData();
  const t = TREATMENT_PAGES[index]!;
  const others = TREATMENT_PAGES.filter((x) => x.slug !== t.slug).slice(0, 3);
  const img = index % 2 ? smile : interior;

  return (
    <>
      <PageHero script="Care" eyebrow={`Treatment 0${index + 1}`} title={t.name}>{t.desc}</PageHero>

      <section className="container-x section-y grid items-start gap-14 lg:grid-cols-[1.1fr_1fr]">
        <Reveal><img src={img} alt="" className="aspect-[4/5] w-full object-cover" /></Reveal>
        <Reveal delay={100}>
          <div className="bg-mauve p-10 text-white md:p-14">
            <p className="text-[13px] uppercase tracking-[0.2em] text-white/75">Indicative cost</p>
            <p className="mt-3 text-[clamp(26px,3vw,36px)] font-extralight">{t.price}</p>
            <p className="mt-6 leading-7 text-white/90">The exact cost depends on your case and is confirmed at your visit, before anything starts.</p>
          </div>
          <div className="mt-10">
            <h2 className="caps text-[21px] text-ink">Planned by</h2>
            <p className="mt-3 leading-7 text-ink-soft">{CLINIC.doctor}, {CLINIC.credentials}.</p>
            <Link to="/doctor" className="link-u mt-3 inline-flex items-center gap-2 font-normal text-mauve-strong">Meet Dr. Ajay <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <BookButton label={`Book for ${t.name.split(" ")[0]}`} />
            <a href={CLINIC.tel} className="link-u font-normal text-ink">{CLINIC.phone}</a>
          </div>
        </Reveal>
      </section>

      <section className="bg-surface-alt section-y">
        <div className="container-x">
          <SectionTitle script="Explore" title="Other treatments" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to="/treatments/$slug" params={{ slug: o.slug }} className="group bg-white p-8 transition-colors duration-300 hover:bg-mauve hover:text-white">
                <h3 className="caps text-[19px]">{o.name}</h3>
                <p className="mt-3 text-[15px] opacity-75">{o.price}</p>
                <ArrowRight className="mt-6 size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
