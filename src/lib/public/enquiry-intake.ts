import "server-only";

import type { Currency, WebsiteLead, WebsiteLeadBuyer } from "@/types/lead";
import { publicEnquirySchema, type PublicEnquiryInput } from "@/lib/validation/public-enquiry";

/**
 * This app's own in-memory lead store — it no longer shares a process with
 * the internal Texcroft OS dashboard (see src/types/lead.ts for why). A
 * server restart clears it, same limitation the combined app always had
 * for its own seed data; this is a placeholder until a real backend
 * (Supabase, or an internal API on the dashboard) is wired up.
 */
const websiteBuyers: WebsiteLeadBuyer[] = [];
const websiteLeads: WebsiteLead[] = [];

function currencyForCountry(country: string | undefined): Currency {
  const c = (country ?? "").trim().toLowerCase();
  if (c === "india" || c === "in") return "INR";
  if (["united kingdom", "uk", "gb"].includes(c)) return "GBP";
  if (["germany", "france", "spain", "italy", "netherlands", "eu"].includes(c)) return "EUR";
  return "USD";
}

function nextEnquiryNo(): string {
  const numbers = websiteLeads.map((e) => Number(e.enquiryNo.replace(/^ENQ-/, ""))).filter((n) => Number.isFinite(n));
  const next = (numbers.length > 0 ? Math.max(...numbers) : 26000) + 1;
  return `ENQ-${next}`;
}

/** Finds the buyer this lead belongs to by email (case-insensitive), or creates a new prospect record. */
function findOrCreateBuyer(input: PublicEnquiryInput): WebsiteLeadBuyer {
  const existing = websiteBuyers.find((b) => b.email.toLowerCase() === input.email.toLowerCase());
  if (existing) return existing;

  const buyer: WebsiteLeadBuyer = {
    id: `buyer-lead-${Date.now()}`,
    companyName: input.companyName,
    contactName: input.contactName,
    email: input.email,
    phone: input.phone,
    country: input.country ?? "Not provided",
    currency: currencyForCountry(input.country),
    createdAt: new Date().toISOString(),
  };
  websiteBuyers.push(buyer);
  return buyer;
}

/**
 * Single entry point for every public lead surface (website quote form,
 * Design Lab). Stored locally for now — `targetPrice`/merchandiser
 * assignment intentionally never appear here, since those only exist once
 * a merchandiser costs the enquiry inside the dashboard, which this app
 * doesn't have access to until it's wired to a real shared backend.
 */
export function createPublicEnquiry(rawInput: unknown): { success: true; enquiry: WebsiteLead } | { success: false; error: string } {
  const parsed = publicEnquirySchema.safeParse(rawInput);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }
  const input = parsed.data;

  const buyer = findOrCreateBuyer(input);
  const now = new Date().toISOString();

  const lead: WebsiteLead = {
    id: `enquiry-web-${Date.now()}`,
    enquiryNo: nextEnquiryNo(),
    buyerId: buyer.id,
    productSummary: input.productType,
    expectedQuantity: input.quantity,
    currency: buyer.currency,
    deliveryDeadline: input.targetDispatchDate ?? "",
    notes: [input.fabricPreference && `Fabric preference: ${input.fabricPreference}`, input.notes].filter(Boolean).join(" · ") || undefined,
    createdAt: now,
    source: input.source,
    contactName: input.contactName,
    contactEmail: input.email,
    contactPhone: input.phone,
    sizeBreakdown: input.sizeBreakdown,
    designConfig: input.designConfig
      ? {
          productCategory: input.designConfig.productCategory,
          garmentType: input.designConfig.garmentType,
          sleeveStyle: input.designConfig.sleeveStyle,
          baseColourName: input.designConfig.baseColourName,
          baseColourHex: input.designConfig.baseColourHex,
          frontArtworkName: input.designConfig.frontArtworkName,
          backArtworkName: input.designConfig.backArtworkName,
          hasCustomMeasurements: input.designConfig.hasCustomMeasurements,
          fabricPreference: input.fabricPreference,
          gsmPreference: input.gsmPreference,
          printMethod: input.printMethod,
          embroideryRequired: input.embroideryRequired,
          packagingNotes: input.packagingNotes,
        }
      : undefined,
  };

  websiteLeads.push(lead);
  return { success: true, enquiry: lead };
}
