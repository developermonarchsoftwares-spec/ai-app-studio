import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, ShieldCheck, Footprints, MapPin } from "lucide-react";
import hero from "@/assets/smile-patient.jpg";
import interior from "@/assets/clinic-interior.jpg";
import { CLINIC, TREATMENTS, TESTIMONIALS, FAQS } from "@/lib/clinic";
import { CtaButtons } from "@/components/site/Layout";
import { Reveal, CountUp } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dental Clinic RS Puram Coimbatore | Dr. Ajay's Dental Centre" },
      { name: "description", content: "Rated 4.8 by 592 patients. Braces, aligners, root canals and implants at DB Road, RS Puram, Coimbatore. Walk-ins welcome. Book on WhatsApp." },
      { property: "og:title", content: "Dr. Ajay's Dental Centre, RS Puram Coimbatore" },
      { property: "og:description", content: "Orthodontist-led dental care on DB Road, RS Puram. 4.8★ from 592 Google reviews." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-28">
        <Reveal>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-semibold text-secondary"><MapPin className="size-3.5" /> DB Road, RS Puram · Walk-ins welcome</p>
          <h1 className="text-4xl leading-[1.05] text-teal-deep md:text-6xl">Coimbatore's trusted smiles, <em className="text-primary">straightened</em> and cared for.</h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">Led by orthodontist {CLINIC.doctor}, MDS. Honest advice, clear pricing, and treatment that respects your time.</p>
          <div className="mt-8"><CtaButtons /></div>
          <a href={CLINIC.maps} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground"><span className="flex text-gold">{[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}</span> {CLINIC.rating} from {CLINIC.reviews} Google reviews</a>
        </Reveal>
        <Reveal delay={150} className="relative">
          <img src={hero} alt="Smiling patient after dental treatment at Dr. Ajay's Dental Centre" width={1008} height={1200} className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft" />
          <div className="absolute -bottom-5 -left-4 rounded-2xl border bg-card p-4 shadow-card">
            <p className="font-display text-3xl text-teal-deep"><CountUp to={CLINIC.rating} decimals={1} />★</p>
            <p className="text-xs text-muted-foreground"><CountUp to={CLINIC.reviews} /> Google reviews</p>
          </div>
        </Reveal>
      </section>

      <section className="border-y bg-card">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 text-sm sm:grid-cols-3">
          {[
            [Star, `${CLINIC.rating}★ · ${CLINIC.reviews} patient reviews`],
            [ShieldCheck, "MDS Orthodontist-led clinic"],
            [Footprints, "Walk-in friendly, RS Puram"],
          ].map(([Icon, t], i) => {
            const I = Icon as typeof Star;
            return <div key={i} className="flex items-center gap-3"><I className="size-5 text-primary" /><span className="font-semibold">{t as string}</span></div>;
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <Reveal><h2 className="text-3xl text-teal-deep md:text-4xl">Treatments we're known for</h2></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TREATMENTS.slice(0, 3).map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="h-full rounded-3xl border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                <h3 className="text-xl text-teal-deep">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                <p className="mt-4 text-sm font-semibold text-primary">{t.price}</p>
                <p className="text-[11px] text-muted-foreground">Indicative, confirm at visit</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6"><CtaButtons /><Link to="/treatments" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">All treatments & prices →</Link></div>
      </section>

      <section className="gold-hairline bg-teal-gradient text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-24 md:py-32 md:grid-cols-2">
          <Reveal><img src={interior} alt="Treatment room at Dr. Ajay's Dental Centre, RS Puram" width={1600} height={1008} loading="lazy" className="rounded-[2rem] object-cover" /></Reveal>
          <Reveal delay={120}>
            <p className="text-sm uppercase tracking-widest text-gold-dark">Meet the doctor</p>
            <h2 className="mt-3 text-3xl md:text-4xl">{CLINIC.doctor}</h2>
            <p className="mt-2 opacity-80">{CLINIC.credentials}</p>
            <p className="mt-5 opacity-90">As a specialist in orthodontics, Dr. Ajay plans every braces and aligner case himself, and takes the time to explain your options before anything begins.</p>
            <Link to="/doctor" className="mt-6 inline-block font-semibold text-gold-dark">Read more →</Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <Reveal><h2 className="text-3xl text-teal-deep md:text-4xl">What our patients say</h2></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="h-full rounded-3xl border bg-card p-6 shadow-card">
                <div className="flex text-gold">{[...Array(5)].map((_, k) => <Star key={k} className="size-4 fill-current" />)}</div>
                <blockquote className="mt-3 text-sm leading-relaxed">"{t.text}"</blockquote>
                <figcaption className="mt-4 text-sm font-semibold">{t.name} <span className="font-normal text-muted-foreground">· {t.area}</span></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6"><CtaButtons /><a href={CLINIC.maps} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary">Read all {CLINIC.reviews} reviews on Google →</a></div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-24 md:pb-32">
        <Reveal><h2 className="text-3xl text-teal-deep">Questions patients ask</h2></Reveal>
        <div className="mt-6 divide-y rounded-3xl border bg-card shadow-card">
          {FAQS.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Have another question? Tap <strong>Ask Smile Desk</strong>, our AI assistant, any time.</p>
      </section>

      <section className="mx-auto mb-24 max-w-6xl px-5 md:mb-32">
        <div className="gold-hairline rounded-[2rem] bg-teal-gradient px-8 py-16 md:py-20 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl">Book your visit in under a minute</h2>
          <p className="mx-auto mt-3 max-w-md opacity-85">Message us on WhatsApp with your preferred time. We'll confirm the slot.</p>
          <div className="mt-8 flex justify-center"><CtaButtons light /></div>
        </div>
      </section>
    </>
  );
}
