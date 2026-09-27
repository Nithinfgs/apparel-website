import Link from "next/link";

/** Texcroft's real mark: a two-peak mountain glyph on a dark rounded badge, next to the wordmark. */
function MountainMark({ dark }: { dark: boolean }) {
  return (
    <span
      className="flex h-8 items-center gap-1.5 rounded-md px-2"
      style={{ backgroundColor: dark ? "#ffffff" : "var(--tx-ink)" }}
    >
      <svg viewBox="0 0 24 16" className="h-3.5 w-5" aria-hidden="true">
        <path d="M0 16 L7 5 L10.5 9.5 L15 2 L24 16 Z" fill={dark ? "var(--tx-ink)" : "#ffffff"} />
      </svg>
    </span>
  );
}

export function SiteLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 text-lg font-bold" aria-label="Apparel Studio home">
      <MountainMark dark={dark} />
      <span className="font-sans font-semibold tracking-wide" style={{ color: dark ? "#ffffff" : "var(--tx-ink)" }}>
        Apparel Studio
      </span>
    </Link>
  );
}
