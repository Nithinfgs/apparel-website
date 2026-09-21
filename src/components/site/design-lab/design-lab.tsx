"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedTShirtSVG } from "@/components/site/garment-svg";
import { GoldButton, OutlineButton } from "@/components/site/gold-button";
import { submitPublicEnquiry } from "@/app/actions";
import { DESIGN_LAB_CATEGORIES, DESIGN_LAB_GARMENTS, DESIGN_LAB_SWATCHES, SIZES, type DesignLabCategory } from "@/lib/site/design-lab-data";
import { DESIGN_LAB_MOQ } from "@/lib/validation/public-enquiry";

const STEP_LABELS = ["Product", "Colour", "Design", "Specs", "Contact"] as const;
const DRAFT_KEY = "texcroft-design-lab-draft-v1";

interface DraftState {
  step: number;
  category: DesignLabCategory;
  garmentId: string;
  sleeveStyle: "half_sleeve" | "full_sleeve";
  colourName: string;
  colourHex: string;
  noDesign: boolean;
  frontArtworkName?: string;
  backArtworkName?: string;
  hasCustomMeasurements: boolean;
  sizes: Record<string, number>;
  fabricPreference: string;
  gsmPreference: string;
  printMethod: string;
  notes: string;
  targetDate: string;
}

function defaultDraft(prefillProduct?: string, prefillColour?: { hex: string; name: string }): DraftState {
  const garment = DESIGN_LAB_GARMENTS.find((g) => prefillProduct?.toLowerCase().includes(g.name.toLowerCase())) ?? DESIGN_LAB_GARMENTS[0];
  return {
    step: 1,
    category: "Men",
    garmentId: garment.id,
    sleeveStyle: "half_sleeve",
    colourName: prefillColour?.name ?? "White",
    colourHex: prefillColour?.hex ?? "#f5f5f0",
    noDesign: false,
    hasCustomMeasurements: false,
    sizes: Object.fromEntries(SIZES.map((s) => [s, 0])),
    fabricPreference: "",
    gsmPreference: "",
    printMethod: "",
    notes: "",
    targetDate: "",
  };
}

export function DesignLab({ prefillProduct, prefillColourHex, prefillColourName }: { prefillProduct?: string; prefillColourHex?: string; prefillColourName?: string }) {
  // Lazy initializer (not an effect+setState) restores a saved draft on
  // mount — never persists contact details (spec §55). Guarded for SSR:
  // localStorage doesn't exist on the server, so the very first render
  // there (and the client's hydration pass) falls back to the plain
  // default, then this runs for real once client-side interaction begins.
  const [draft, setDraft] = useState<DraftState>(() => {
    const base = defaultDraft(prefillProduct, prefillColourHex ? { hex: prefillColourHex, name: prefillColourName ?? "Custom" } : undefined);
    if (typeof window === "undefined") return base;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      return raw ? { ...base, ...JSON.parse(raw) } : base;
    } catch {
      return base;
    }
  });
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiNote, setAiNote] = useState<string | null>(null);
  const [side, setSide] = useState<"front" | "back">("front");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [enquiryNo, setEnquiryNo] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [contact, setContact] = useState({ contactName: "", companyName: "", email: "", phone: "", country: "" });

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // storage may be unavailable (private browsing) — draft simply won't persist
    }
  }, [draft]);

  const garment = DESIGN_LAB_GARMENTS.find((g) => g.id === draft.garmentId) ?? DESIGN_LAB_GARMENTS[0];
  const totalQty = Object.values(draft.sizes).reduce((sum, n) => sum + n, 0);
  const moqMet = totalQty >= DESIGN_LAB_MOQ;

  function goTo(step: number) {
    setDraft((d) => ({ ...d, step }));
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>, target: "front" | "back") {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setAiNote("File too large — 10MB max.");
      return;
    }
    if (!["image/png", "image/jpeg", "image/svg+xml"].includes(file.type)) {
      setAiNote("Unsupported file type — PNG, JPG or SVG only.");
      return;
    }
    setAiNote(null);
    setDraft((d) => (target === "front" ? { ...d, frontArtworkName: file.name } : { ...d, backArtworkName: file.name }));
  }

  async function handleSubmit() {
    setSubmitState("submitting");
    setSubmitError(null);
    const result = await submitPublicEnquiry({
      source: "design_lab",
      productType: `${draft.category} ${garment.name}`,
      quantity: totalQty,
      targetDispatchDate: draft.targetDate || undefined,
      fabricPreference: draft.fabricPreference || undefined,
      gsmPreference: draft.gsmPreference || undefined,
      printMethod: draft.printMethod || undefined,
      notes: draft.notes || undefined,
      contactName: contact.contactName,
      companyName: contact.companyName,
      email: contact.email,
      phone: contact.phone,
      country: contact.country || undefined,
      sizeBreakdown: draft.sizes,
      designConfig: {
        productCategory: draft.category,
        garmentType: garment.name,
        sleeveStyle: garment.supportsSleeveStyle ? draft.sleeveStyle : undefined,
        baseColourName: draft.colourName,
        baseColourHex: draft.colourHex,
        frontArtworkName: draft.noDesign ? undefined : draft.frontArtworkName,
        backArtworkName: draft.noDesign ? undefined : draft.backArtworkName,
        hasCustomMeasurements: draft.hasCustomMeasurements,
      },
    });

    if (result.success) {
      setEnquiryNo(result.enquiryNo);
      setSubmitState("success");
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // ignore
      }
    } else {
      setSubmitError(result.error);
      setSubmitState("error");
    }
  }

  if (submitState === "success" && enquiryNo) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center md:px-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="tx-heading text-sm font-bold" style={{ color: "var(--tx-gold)" }}>
            PROJECT RECEIVED
          </p>
          <h1 className="tx-heading mt-2 text-5xl font-extrabold">{enquiryNo}</h1>
          <p className="mt-3 text-sm" style={{ color: "var(--tx-muted)" }}>
            We&apos;ll review your configuration and prepare costing. We typically respond within 2 hours during business hours.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <GoldButton href="/login">Track Project</GoldButton>
            <OutlineButton href="/">Back to Home</OutlineButton>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-5 py-12 md:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="tx-heading text-4xl font-extrabold md:text-5xl">AI DESIGN LAB</h1>
        <p className="mt-2 max-w-2xl text-sm" style={{ color: "var(--tx-muted)" }}>
          Design your t-shirt, hoodie, or jogger — then send it directly into Texcroft&apos;s production system for costing.
        </p>

        {/* Step indicator */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const active = draft.step === stepNum;
            const done = draft.step > stepNum;
            return (
              <button
                key={label}
                type="button"
                disabled={!done && !active}
                onClick={() => done && goTo(stepNum)}
                className="tx-heading flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold disabled:cursor-default"
                style={{
                  backgroundColor: active ? "var(--tx-ink)" : "transparent",
                  color: active ? "#fff" : done ? "var(--tx-gold)" : "#bbb",
                }}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px]"
                  style={{ backgroundColor: active ? "var(--tx-gold)" : "transparent", border: active ? "none" : "1px solid currentColor" }}
                >
                  {done ? "✓" : stepNum}
                </span>
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border p-6 md:p-10" style={{ borderColor: "var(--tx-line)" }}>
          <AnimatePresence mode="wait">
            {draft.step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                <h2 className="text-lg font-bold">Choose Your Garment</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {DESIGN_LAB_CATEGORIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, category: c }))}
                      className="rounded-full border px-4 py-1.5 text-sm font-medium"
                      style={{
                        borderColor: draft.category === c ? "var(--tx-gold)" : "var(--tx-line)",
                        backgroundColor: draft.category === c ? "var(--tx-gold)" : "transparent",
                        color: draft.category === c ? "#fff" : "var(--tx-ink)",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {DESIGN_LAB_GARMENTS.map((g) => (
                    <motion.button
                      key={g.id}
                      type="button"
                      whileHover={{ y: -3 }}
                      onClick={() => {
                        setDraft((d) => ({ ...d, garmentId: g.id }));
                        goTo(2);
                      }}
                      className="rounded-xl border p-4 text-center transition-colors"
                      style={{ borderColor: draft.garmentId === g.id ? "var(--tx-gold)" : "var(--tx-line)" }}
                    >
                      <AnimatedTShirtSVG color="#eee9df" className="mx-auto h-20 w-20" />
                      <p className="mt-2 text-sm font-semibold">{g.name}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {draft.step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                <div className="grid gap-8 md:grid-cols-[220px_1fr]">
                  <div className="flex justify-center">
                    <AnimatedTShirtSVG color={draft.colourHex} className="h-56 w-56" />
                  </div>
                  <div>
                    {garment.supportsSleeveStyle && (
                      <div className="mb-6">
                        <p className="text-xs font-semibold tracking-wide" style={{ color: "var(--tx-gold)" }}>
                          STYLE
                        </p>
                        <div className="mt-2 flex gap-2">
                          {(["half_sleeve", "full_sleeve"] as const).map((style) => (
                            <button
                              key={style}
                              type="button"
                              onClick={() => setDraft((d) => ({ ...d, sleeveStyle: style }))}
                              className="rounded-full border px-4 py-1.5 text-xs font-semibold"
                              style={{ borderColor: draft.sleeveStyle === style ? "var(--tx-gold)" : "var(--tx-line)" }}
                            >
                              {style === "half_sleeve" ? "Half Sleeve" : "Full Sleeve"}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-xs font-semibold tracking-wide" style={{ color: "var(--tx-gold)" }}>
                      BASE COLOUR
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2.5">
                      {DESIGN_LAB_SWATCHES.map((s) => (
                        <button
                          key={s.hex}
                          type="button"
                          aria-label={s.name}
                          onClick={() => setDraft((d) => ({ ...d, colourName: s.name, colourHex: s.hex }))}
                          className="h-8 w-8 rounded-full border transition-transform hover:scale-110"
                          style={{
                            backgroundColor: s.hex,
                            borderColor: "rgba(0,0,0,0.15)",
                            boxShadow: draft.colourHex === s.hex ? "0 0 0 2px #fff, 0 0 0 4px var(--tx-gold)" : "none",
                          }}
                        />
                      ))}
                    </div>

                    <p className="mt-4 text-sm">
                      {draft.colourName} <span style={{ color: "var(--tx-muted)" }}>({draft.colourHex.toUpperCase()})</span>
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <input
                        type="color"
                        value={draft.colourHex}
                        onChange={(e) => setDraft((d) => ({ ...d, colourName: "Custom", colourHex: e.target.value }))}
                        className="h-9 w-9 cursor-pointer rounded border"
                        style={{ borderColor: "var(--tx-line)" }}
                        aria-label="Custom colour"
                      />
                      <span className="text-xs" style={{ color: "var(--tx-muted)" }}>
                        Custom hex
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <OutlineButton onClick={() => goTo(1)}>← Back</OutlineButton>
                  <GoldButton onClick={() => goTo(3)}>Continue to Design →</GoldButton>
                </div>
              </motion.div>
            )}

            {draft.step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Design Your Garment</h2>
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={draft.noDesign}
                      onChange={(e) => setDraft((d) => ({ ...d, noDesign: e.target.checked }))}
                    />
                    No design
                  </label>
                </div>

                {!draft.noDesign && (
                  <>
                    <div className="mt-4 flex gap-2">
                      {(["front", "back"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSide(s)}
                          className="flex-1 rounded-lg py-2 text-sm font-semibold capitalize"
                          style={{ backgroundColor: side === s ? "var(--tx-ink)" : "var(--tx-line)", color: side === s ? "#fff" : "var(--tx-ink)" }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    <label
                      className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed py-10 text-center text-sm"
                      style={{ borderColor: "var(--tx-line)" }}
                    >
                      <input type="file" accept=".png,.jpg,.jpeg,.svg" className="hidden" onChange={(e) => handleUpload(e, side)} />
                      <span className="font-semibold">
                        {side === "front" ? draft.frontArtworkName ?? "Upload design" : draft.backArtworkName ?? "Upload design"}
                      </span>
                      <span className="mt-1 text-xs" style={{ color: "var(--tx-muted)" }}>
                        PNG, JPG, SVG · 10MB max
                      </span>
                    </label>

                    <div className="mt-4 rounded-xl border p-4" style={{ borderColor: "var(--tx-line)" }}>
                      <p className="text-xs font-semibold tracking-wide" style={{ color: "var(--tx-gold)" }}>
                        AI GENERATE
                      </p>
                      <textarea
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="e.g. minimalist mountain badge"
                        rows={2}
                        className="mt-2 w-full rounded-lg border p-3 text-sm outline-none"
                        style={{ borderColor: "var(--tx-line)" }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setAiNote(
                            aiPrompt.trim()
                              ? "AI image generation isn't connected in this environment yet — this is where your prompt would be sent to Texcroft's design-generation service. Upload your own artwork above, or leave a note in Step 4 and our team will help with artwork."
                              : "Describe what you'd like generated first.",
                          )
                        }
                        className="mt-2 w-full rounded-lg py-2.5 text-sm font-semibold"
                        style={{ backgroundColor: "var(--tx-line)" }}
                      >
                        Generate
                      </button>
                      {aiNote && (
                        <p className="mt-2 text-xs" style={{ color: "var(--tx-muted)" }}>
                          {aiNote}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div className="mt-8 flex justify-between">
                  <OutlineButton onClick={() => goTo(2)}>← Back</OutlineButton>
                  <GoldButton onClick={() => goTo(4)}>Continue →</GoldButton>
                </div>
              </motion.div>
            )}

            {draft.step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                <h2 className="text-lg font-bold">Confirm Your Order</h2>

                <div className="mt-4 rounded-xl border p-4" style={{ borderColor: "var(--tx-line)" }}>
                  <p className="mb-3 flex justify-between text-xs font-semibold tracking-wide" style={{ color: "var(--tx-muted)" }}>
                    SIZES &amp; QUANTITIES <span>Total: {totalQty}</span>
                  </p>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {SIZES.map((size) => (
                      <div key={size} className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">{size}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setDraft((d) => ({ ...d, sizes: { ...d.sizes, [size]: Math.max(0, d.sizes[size] - 1) } }))}
                            className="h-7 w-7 rounded border text-sm"
                            style={{ borderColor: "var(--tx-line)" }}
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min={0}
                            value={draft.sizes[size]}
                            onChange={(e) =>
                              setDraft((d) => ({ ...d, sizes: { ...d.sizes, [size]: Math.max(0, Number(e.target.value) || 0) } }))
                            }
                            className="w-14 rounded border px-1 py-1 text-center text-sm"
                            style={{ borderColor: "var(--tx-line)" }}
                          />
                          <button
                            type="button"
                            onClick={() => setDraft((d) => ({ ...d, sizes: { ...d.sizes, [size]: d.sizes[size] + 1 } }))}
                            className="h-7 w-7 rounded border text-sm"
                            style={{ borderColor: "var(--tx-line)" }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {!moqMet ? (
                      <motion.p
                        key="moq-warn"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 rounded-lg p-3 text-xs"
                        style={{ backgroundColor: "#fdf6e3", color: "#8a6d1a" }}
                      >
                        Minimum order quantity is {DESIGN_LAB_MOQ} pcs. You have {totalQty} pc{totalQty === 1 ? "" : "s"} — add{" "}
                        {DESIGN_LAB_MOQ - totalQty} more to continue.
                      </motion.p>
                    ) : (
                      <motion.p
                        key="moq-met"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 rounded-lg p-3 text-xs font-semibold"
                        style={{ backgroundColor: "#eef6ec", color: "#2d6a34" }}
                      >
                        MOQ requirement met ✓
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <label className="mt-4 flex items-center justify-between rounded-xl border p-4 text-sm" style={{ borderColor: "var(--tx-line)" }}>
                  <span>
                    <span className="font-semibold">Provide custom measurements</span>
                    <br />
                    <span className="text-xs" style={{ color: "var(--tx-muted)" }}>
                      Optional — a merchandiser will follow up for your size chart.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={draft.hasCustomMeasurements}
                    onChange={(e) => setDraft((d) => ({ ...d, hasCustomMeasurements: e.target.checked }))}
                  />
                </label>

                <details className="mt-4 rounded-xl border p-4" style={{ borderColor: "var(--tx-line)" }}>
                  <summary className="cursor-pointer text-sm font-semibold">More options (fabric, GSM, print, delivery)</summary>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <input
                      placeholder="Fabric preference"
                      value={draft.fabricPreference}
                      onChange={(e) => setDraft((d) => ({ ...d, fabricPreference: e.target.value }))}
                      className="rounded-lg border p-2.5 text-sm"
                      style={{ borderColor: "var(--tx-line)" }}
                    />
                    <input
                      placeholder="GSM preference"
                      value={draft.gsmPreference}
                      onChange={(e) => setDraft((d) => ({ ...d, gsmPreference: e.target.value }))}
                      className="rounded-lg border p-2.5 text-sm"
                      style={{ borderColor: "var(--tx-line)" }}
                    />
                    <input
                      placeholder="Print method"
                      value={draft.printMethod}
                      onChange={(e) => setDraft((d) => ({ ...d, printMethod: e.target.value }))}
                      className="rounded-lg border p-2.5 text-sm"
                      style={{ borderColor: "var(--tx-line)" }}
                    />
                    <input
                      type="date"
                      aria-label="Target delivery date"
                      value={draft.targetDate}
                      onChange={(e) => setDraft((d) => ({ ...d, targetDate: e.target.value }))}
                      className="rounded-lg border p-2.5 text-sm"
                      style={{ borderColor: "var(--tx-line)" }}
                    />
                  </div>
                  <textarea
                    placeholder="Anything specific about your order? (optional)"
                    value={draft.notes}
                    onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
                    rows={2}
                    className="mt-3 w-full rounded-lg border p-2.5 text-sm"
                    style={{ borderColor: "var(--tx-line)" }}
                  />
                </details>

                <div className="mt-8 flex justify-between">
                  <OutlineButton onClick={() => goTo(3)}>← Back to Edit</OutlineButton>
                  <GoldButton onClick={() => moqMet && goTo(5)} className={moqMet ? "" : "pointer-events-none opacity-40"}>
                    Confirm &amp; Continue
                  </GoldButton>
                </div>
              </motion.div>
            )}

            {draft.step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                <h2 className="text-lg font-bold">Contact Details</h2>
                <p className="text-sm" style={{ color: "var(--tx-muted)" }}>
                  Where should we send the order confirmation?
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input
                    placeholder="Full name"
                    value={contact.contactName}
                    onChange={(e) => setContact((c) => ({ ...c, contactName: e.target.value }))}
                    className="rounded-lg border p-3 text-sm"
                    style={{ borderColor: "var(--tx-line)" }}
                  />
                  <input
                    placeholder="Company name"
                    value={contact.companyName}
                    onChange={(e) => setContact((c) => ({ ...c, companyName: e.target.value }))}
                    className="rounded-lg border p-3 text-sm"
                    style={{ borderColor: "var(--tx-line)" }}
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                    className="rounded-lg border p-3 text-sm"
                    style={{ borderColor: "var(--tx-line)" }}
                  />
                  <input
                    placeholder="Phone number"
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                    className="rounded-lg border p-3 text-sm"
                    style={{ borderColor: "var(--tx-line)" }}
                  />
                  <input
                    placeholder="Country"
                    value={contact.country}
                    onChange={(e) => setContact((c) => ({ ...c, country: e.target.value }))}
                    className="rounded-lg border p-3 text-sm sm:col-span-2"
                    style={{ borderColor: "var(--tx-line)" }}
                  />
                </div>

                <div className="mt-6 rounded-xl p-4 text-sm" style={{ backgroundColor: "#fafafa" }}>
                  <p className="font-semibold">Project Summary</p>
                  <div className="mt-2 grid grid-cols-2 gap-y-1 text-xs" style={{ color: "var(--tx-muted)" }}>
                    <span>Product</span>
                    <span className="text-right text-[var(--tx-ink)]">
                      {draft.category} {garment.name}
                    </span>
                    <span>Colour</span>
                    <span className="text-right text-[var(--tx-ink)]">{draft.colourName}</span>
                    <span>Quantity</span>
                    <span className="text-right text-[var(--tx-ink)]">{totalQty}</span>
                    <span>Artwork</span>
                    <span className="text-right text-[var(--tx-ink)]">{draft.noDesign ? "No design" : draft.frontArtworkName ?? "Not uploaded"}</span>
                    {draft.targetDate && (
                      <>
                        <span>Target delivery</span>
                        <span className="text-right text-[var(--tx-ink)]">{draft.targetDate}</span>
                      </>
                    )}
                  </div>
                </div>

                {submitState === "error" && submitError && <p className="mt-3 text-sm text-red-600">{submitError}</p>}

                <div className="mt-8 flex justify-between">
                  <OutlineButton onClick={() => goTo(4)}>← Back</OutlineButton>
                  <GoldButton onClick={handleSubmit} className={submitState === "submitting" ? "pointer-events-none opacity-60" : ""}>
                    {submitState === "submitting" ? "Submitting…" : "Submit Project"}
                  </GoldButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
