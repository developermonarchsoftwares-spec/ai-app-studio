import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import interior from "@/assets/clinic-interior.jpg";
import smile from "@/assets/smile-patient.jpg";
import { CLINIC, FAQS, TESTIMONIALS, TREATMENT_PAGES } from "@/lib/clinic";
import { Reveal } from "@/components/site/Reveal";
import { BookButton, Script, SectionTitle } from "@/components/site/Layout";
import { Carousel, FAQ, Marquee, Parallax, ReviewSlider, RotatingWord, SpecialityTile, StatCard, TreatmentTabs } from "@/components/site/Home";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Ajay's Dental Centre | Orthodontist-led Dental Clinic, RS Puram Coimbatore" },
      { name: "description", content: "Calm, personal dental care in RS Puram, Coimbatore, led by orthodontist Dr. Ajay Kumar N Sachdev (MDS). Braces, aligners, implants, root canals. 4.4★ from 49 Google reviews." },
      { property: "og:title", content: "Dr. Ajay's Dental Centre, RS Puram, Coimbatore" },
      { property: "og:description", content: "Orthodontist-led dental clinic. Clear pricing, on-time appointments." },
    ],
  }),
  component: Home,
});

const IMGS = [interior, smile];

const WHY = [
  "MDS Orthodontist-led",
  "Clear Pricing Before Treatment",
  "On-time Appointments",
  "Walk-ins Welcome",
  "Braces & Clear Aligners",
  `${CLINIC.rating}★ on Google`,
];

function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      {/* B — Hero */}
      <section className="relative flex h-[100svh] min-h-[620px] items-end overflow-hidden text-white">
        <img src={interior} alt="" fetchPriority="high" className="hero-media absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="container-x relative pb-[14vh] text-center">
          <span className="hero-in font-script block text-white" style={{ fontSize: "var(--fs-hero-script)" }} aria-hidden="true">Smiles</span>
          <p className="hero-in caps mt-2" style={{ fontSize: "var(--fs-hero-strap)", animationDelay: ".15s" }}>Specialist dental care, without the rush</p>
          <h1 className="hero-in mx-auto mt-5 max-w-xl text-[15px] font-light tracking-wide text-white/85" style={{ animationDelay: ".3s" }}>
            Orthodontist-led dental clinic in RS Puram, Coimbatore
          </h1>
          <div className="hero-in mt-10 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: ".45s" }}>
            <BookButton className="!bg-white !text-ink hover:!bg-mauve-strong hover:!text-white" />
            <a href={CLINIC.tel} className="btn-ghost"><Phone className="size-4" /> {CLINIC.phone}</a>
            <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost"><MessageCircle className="size-4" /> WhatsApp</a>
          </div>
        </div>
      </section>

      {/* C — Trust stats */}
      <section aria-label="At a glance" className="container-x pt-[var(--section-y)]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: CLINIC.rating, decimals: 1, suffix: "★", label: "Google rating" },
            { value: CLINIC.reviews, label: "Google reviews" },
            { value: TREATMENT_PAGES.length, label: "Core treatments" },
            { value: 1, label: "MDS orthodontist" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 100}><StatCard {...s} /></Reveal>
          ))}
        </div>
      </section>

      {/* E — Intro */}
      <section className="container-x section-y grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <Script>Welcome</Script>
          <h2 className="caps -mt-[0.4em] relative text-[clamp(30px,4vw,52px)] leading-[1.15] text-ink">Your smile.<br />Our specialist.</h2>
          <div className="my-8 flex items-center gap-4"><span className="h-px w-16 bg-mauve" /><p className="sub-head">Personal care, planned by an orthodontist</p></div>
          <p className="leading-7 text-ink-soft">Dr. Ajay founded the clinic to give RS Puram families specialist-level care without the rush. He personally plans braces and aligner treatment, and leads a team covering general, restorative and implant dentistry.</p>
          <p className="mt-5 leading-7 text-ink-soft">Patients often mention the same thing in their reviews: he explains the options and costs clearly before starting, so there are no surprises.</p>
          <Link to="/doctor" className="link-u mt-8 inline-flex items-center gap-2 font-normal text-mauve-strong">Meet Dr. Ajay <ArrowRight className="size-4" /></Link>
        </Reveal>
        <div className="grid grid-cols-3 gap-4">
          <Parallax src={interior} alt="Treatment room at the clinic" className="mt-16 aspect-[9/16]" position="20% center" />
          <Parallax src={smile} alt="A smiling patient after treatment" className="aspect-[9/16]" strength={60} />
          <Parallax src={interior} alt="Clinic interior, RS Puram" className="mt-28 aspect-[9/16]" position="85% center" strength={30} />
        </div>
      </section>

      {/* F — Our doctor */}
      <section className="bg-surface-alt section-y">
        <div className="container-x">
          <Reveal><SectionTitle script="Meet" title="Your Doctor" /></Reveal>
          <Reveal className="mt-14">
            <div className="group relative grid overflow-hidden md:grid-cols-2">
              <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto">
                <img src={interior} alt="Dr. Ajay's treatment room" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-end bg-white/30 p-8 opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                  <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className="btn">Book with Dr. Ajay</a>
                </div>
              </div>
              <div className="bg-white p-10 md:p-16">
                <p className="text-[13px] uppercase tracking-[0.25em] text-mauve-strong">Owner / Director</p>
                <h3 className="caps mt-4 text-[clamp(26px,3vw,38px)] leading-tight text-ink">{CLINIC.doctor}</h3>
                <p className="mt-3 font-normal text-ink-soft">MDS (Orthodontics)</p>
                <p className="mt-8 leading-7 text-ink-soft">A specialist orthodontist who personally plans every braces and aligner case, and leads a team covering general, restorative and implant dentistry.</p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a href={CLINIC.whatsapp} target="_blank" rel="noreferrer" className="btn">Book with Dr. Ajay</a>
                  <Link to="/doctor" className="link-u inline-flex items-center px-2 font-normal text-ink">Full profile</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* G — Treatments carousel */}
      <section className="section-y overflow-hidden">
        <div className="container-x flex flex-wrap items-end justify-between gap-8">
          <Reveal><SectionTitle script="Discover" title="What We Treat" /></Reveal>
          <Reveal><Link to="/treatments" className="btn">Explore All Treatments</Link></Reveal>
        </div>
        <Reveal className="mt-14">
          <Carousel label="Treatments">
            {TREATMENT_PAGES.map((t, i) => (
              <SpecialityTile key={t.slug} slug={t.slug} name={t.name} price={t.price} img={IMGS[i % 2]!} index={i} />
            ))}
          </Carousel>
        </Reveal>
      </section>

      {/* H — Treatment details (tabbed) */}
      <section className="container-x pb-[var(--section-y)]">
        <div className="bg-[#f3f1f3] px-5 py-16 md:px-12 md:py-20">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="h2-sora">Clear plans, clear prices</h2>
            <p className="mt-4 text-ink-soft">Every treatment is explained before we begin. These are indicative ranges; your exact cost is confirmed at your visit.</p>
          </Reveal>
          <Reveal><TreatmentTabs items={TREATMENT_PAGES.map((t, i) => ({ ...t, img: IMGS[i % 2]! }))} /></Reveal>
        </div>
      </section>

      {/* I — Reviews */}
      <section className="bg-white pb-[var(--section-y)]">
        <div className="container-x">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <SectionTitle script="We're honoured" title="to look after you and your family" />
            <a href={CLINIC.maps} target="_blank" rel="noreferrer" className="link-u text-[17px] font-normal text-mauve-strong">{CLINIC.reviews}+ reviews · {CLINIC.rating}★ on Google</a>
          </Reveal>
          <Reveal><ReviewSlider reviews={TESTIMONIALS} /></Reveal>
        </div>
      </section>

      {/* J — Care approach (rotating word) */}
      <section className="bg-surface-alt section-y">
        <div className="container-x">
          <Reveal>
            <h2 className="h2-sora max-w-3xl">Treated <RotatingWord words={["Carefully", "Personally", "Patiently", "Honestly"]} /></h2>
          </Reveal>
          <div className="mt-14 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {TESTIMONIALS.map((t, i) => {
              const tr = TREATMENT_PAGES.find((p) => p.name === t.treatment);
              return (
                <Reveal key={t.name} delay={i * 80}>
                  <div className="grid items-center gap-6 py-10 md:grid-cols-[120px_1fr_auto] md:gap-12">
                    <img src={IMGS[(i + 1) % 2]} alt="" loading="lazy" className="aspect-square w-24 object-cover md:w-[120px]" />
                    <div>
                      <h3 className="caps text-[19px] text-ink">{tr?.name ?? "Patient review"}</h3>
                      <p className="mt-3 max-w-2xl leading-7 text-ink-soft">"{t.text}"</p>
                      <p className="mt-3 text-[14px] text-ink-soft">{t.name}, {t.source}</p>
                    </div>
                    {tr
                      ? <Link to="/treatments/$slug" params={{ slug: tr.slug }} className="btn self-start md:self-center">Explore</Link>
                      : <Link to="/treatments" className="btn self-start md:self-center">All treatments</Link>}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* K — Why us marquee + photo strip */}
      <section aria-label="Why choose us">
        <h2 className="sr-only">Why Us?</h2>
        <Marquee items={WHY} />
        <div className="relative h-[46vh] min-h-[320px]">
          <img src={interior} alt="Inside Dr. Ajay's Dental Centre" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 grid place-items-center bg-black/35 text-center text-white">
            <div>
              <p className="caps text-[clamp(28px,4vw,48px)]">Dr. Ajay's</p>
              <p className="mt-1 text-[12px] uppercase tracking-[0.5em]">Dental Centre</p>
            </div>
          </div>
        </div>
      </section>

      {/* L — Final CTA */}
      <section className="container-x section-y grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <SectionTitle script="Ready" title="when you are" />
          <p className="mt-8 max-w-md leading-7 text-ink-soft">Not sure which treatment you need? Message us. Dr. Ajay will assess you and suggest the right option honestly.</p>
          <BookButton label="Book Your Consultation" className="mt-10" />
        </Reveal>
        <Reveal delay={120}>
          <img src={smile} alt="A patient smiling after treatment" loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </Reveal>
      </section>

      {/* M — FAQ */}
      <section className="bg-white pb-[var(--section-y)]">
        <div className="container-x">
          <Reveal className="mb-14"><SectionTitle script="Answered" title="Your Questions" align="center" /></Reveal>
          <Reveal><FAQ items={FAQS} /></Reveal>
        </div>
      </section>
    </>
  );
}
