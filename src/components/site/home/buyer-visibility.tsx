import { Reveal } from "@/components/site/reveal";
import { GoldButton } from "@/components/site/gold-button";

const STAGES: { label: string; state: string; tone: "done" | "active" | "pending" }[] = [
  { label: "Sampling", state: "✓", tone: "done" },
  { label: "Materials", state: "✓", tone: "done" },
  { label: "Cutting", state: "✓", tone: "done" },
  { label: "Stitching", state: "72%", tone: "active" },
  { label: "Finishing", state: "18%", tone: "active" },
  { label: "QC", state: "Pending", tone: "pending" },
  { label: "Packing", state: "Pending", tone: "pending" },
  { label: "Dispatch", state: "29 Sep", tone: "pending" },
];

const toneColor = { done: "var(--tx-gold)", active: "var(--tx-ink)", pending: "var(--tx-muted)" } as const;

export function BuyerVisibility() {
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.15em]" style={{ color: "var(--tx-gold)" }}>
            BUYER VISIBILITY
          </p>
          <h2 className="tx-heading mt-3 text-4xl font-extrabold md:text-5xl">
            YOUR ORDER.
            <br />
            VISIBLE FROM SAMPLE TO SHIPMENT.
          </h2>
          <p className="mt-3 max-w-sm text-sm" style={{ color: "var(--tx-muted)" }}>
            Once production begins, buyers can follow progress, approvals, documents and dispatch updates through their dedicated portal.
          </p>
          <div className="mt-6">
            <GoldButton href="/login">Track Your Order</GoldButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border p-6" style={{ borderColor: "var(--tx-line)" }}>
            <p className="tx-heading text-sm font-bold" style={{ color: "var(--tx-muted)" }}>
              TC-2609-014 · SAMPLE ORDER
            </p>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
              {STAGES.map((s) => (
                <div key={s.label} className="flex items-center justify-between border-b pb-1.5 text-sm" style={{ borderColor: "var(--tx-line)" }}>
                  <span>{s.label}</span>
                  <span className="font-semibold" style={{ color: toneColor[s.tone] }}>
                    {s.state}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
