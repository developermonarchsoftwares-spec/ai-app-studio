import type { ReactNode } from "react";
import { Script } from "./Layout";

/** Inner-page header band: sits under the fixed white header. */
export function PageHero({ script, title, eyebrow, children }: { script: string; title: ReactNode; eyebrow?: string; children?: ReactNode }) {
  return (
    <section className="bg-surface-alt pb-20 pt-40 md:pb-28 md:pt-52">
      <div className="container-x">
        {eyebrow && <p className="mb-4 text-[13px] uppercase tracking-[0.25em] text-mauve-strong">{eyebrow}</p>}
        <Script>{script}</Script>
        <h1 className="h2-sora relative -mt-[0.55em] max-w-3xl">{title}</h1>
        {children && <div className="mt-8 max-w-2xl leading-7 text-ink-soft">{children}</div>}
      </div>
    </section>
  );
}
