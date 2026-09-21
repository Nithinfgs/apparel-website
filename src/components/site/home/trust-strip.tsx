const ITEMS = [
  { value: "50 PCS", label: "Low MOQ" },
  { value: "TIRUPPUR", label: "Production Network" },
  { value: "GLOBAL", label: "Shipping" },
  { value: "AQL 2.5", label: "Quality Control" },
];

export function TrustStrip() {
  return (
    <section className="border-y" style={{ borderColor: "var(--tx-line)" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y sm:grid-cols-4 sm:divide-y-0" style={{ borderColor: "var(--tx-line)" }}>
        {ITEMS.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1 px-4 py-8 text-center" style={{ borderColor: "var(--tx-line)" }}>
            <span className="tx-heading text-2xl font-extrabold">{item.value}</span>
            <span className="text-xs tracking-wide" style={{ color: "var(--tx-muted)" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
