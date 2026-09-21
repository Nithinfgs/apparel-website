"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoldButton } from "./gold-button";
import { submitPublicEnquiry } from "@/app/actions";
import { PUBLIC_PRODUCT_CATEGORIES } from "@/lib/site/products";

const inputClass =
  "w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--tx-gold)]";
const inputStyle = { borderColor: "var(--tx-line)" };

/**
 * The canonical public lead form (spec §53) — reused verbatim on the
 * homepage, About, and Contact, each only changing `source`/`prefill`. Every
 * submission creates a real Enquiry via submitPublicEnquiry (BUSINESS_RULES.md §20).
 */
export function QuoteForm({ source, prefillProduct }: { source: "website_quote"; prefillProduct?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [enquiryNo, setEnquiryNo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    const result = await submitPublicEnquiry({
      source,
      productType: String(form.get("productType") ?? ""),
      quantity: Number(form.get("quantity") ?? 0),
      targetDispatchDate: String(form.get("targetDispatchDate") ?? "") || undefined,
      fabricPreference: String(form.get("fabricPreference") ?? "") || undefined,
      notes: String(form.get("notes") ?? "") || undefined,
      contactName: String(form.get("contactName") ?? ""),
      companyName: String(form.get("companyName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      country: String(form.get("country") ?? "") || undefined,
    });

    if (result.success) {
      setEnquiryNo(result.enquiryNo);
      setStatus("success");
    } else {
      setError(result.error);
      setStatus("error");
    }
  }

  if (status === "success" && enquiryNo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border p-8 text-center"
        style={{ borderColor: "var(--tx-gold)" }}
      >
        <p className="tx-heading text-sm font-bold" style={{ color: "var(--tx-gold)" }}>
          PROJECT RECEIVED
        </p>
        <p className="tx-heading mt-2 text-3xl font-extrabold">{enquiryNo}</p>
        <p className="mt-2 text-sm" style={{ color: "var(--tx-muted)" }}>
          We&apos;ll review your requirement and prepare costing. We typically respond within 2 hours during business hours.
        </p>
        <div className="mt-5">
          <GoldButton href="/login">Track Project</GoldButton>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <select name="productType" required defaultValue={prefillProduct ?? ""} className={inputClass} style={inputStyle}>
          <option value="" disabled>
            Select a product...
          </option>
          {PUBLIC_PRODUCT_CATEGORIES.map((c) => (
            <option key={c.slug} value={c.name}>
              {c.name}
            </option>
          ))}
          <option value="Custom / Other">Custom / Other</option>
        </select>
        <input name="quantity" type="number" min={1} required placeholder="Quantity" className={inputClass} style={inputStyle} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="targetDispatchDate" type="date" className={inputClass} style={inputStyle} aria-label="Expected date of dispatch" />
        <input name="fabricPreference" placeholder="Fabric preference (optional)" className={inputClass} style={inputStyle} />
      </div>
      <textarea name="notes" placeholder="Anything else we should know? (optional)" rows={3} className={inputClass} style={inputStyle} />
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="contactName" required placeholder="Your name" className={inputClass} style={inputStyle} />
        <input name="companyName" required placeholder="Company name" className={inputClass} style={inputStyle} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="email" type="email" required placeholder="Email" className={inputClass} style={inputStyle} />
        <input name="phone" required placeholder="Phone / WhatsApp number" className={inputClass} style={inputStyle} />
      </div>
      <input name="country" placeholder="Country (optional)" className={inputClass} style={inputStyle} />

      <AnimatePresence>
        {status === "error" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-red-600">
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <GoldButton type="submit" className="w-full sm:w-auto">
        {status === "submitting" ? "Submitting…" : "Submit Now"}
      </GoldButton>
    </form>
  );
}
