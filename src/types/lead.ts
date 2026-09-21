/**
 * Standalone types for this app's own lead store (`src/lib/public/`).
 *
 * This site was split out of the combined Texcroft OS monorepo for
 * separate hosting (see docs — the dashboard repo's docs/HANDOFF.md has the
 * split notes). It no longer shares a process with the internal dashboard,
 * so it can't mutate the dashboard's in-memory `Enquiry`/`Buyer` seed
 * arrays directly the way the combined app used to.
 *
 * These types mirror the shape of the dashboard's `Enquiry`/`Buyer`
 * entities closely on purpose: once a real backend (Supabase or an
 * internal API) exists, `src/lib/public/enquiry-intake.ts` is the one file
 * that needs to change — swap its local array mutation for a real
 * write/API call — without touching the forms or validation that produce
 * this shape.
 */
export type Currency = "INR" | "USD" | "GBP" | "EUR";

export interface WebsiteLeadBuyer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  currency: Currency;
  createdAt: string;
}

export type LeadSource = "website_quote" | "design_lab";

export interface DesignLabConfig {
  productCategory: string;
  garmentType: string;
  sleeveStyle?: "half_sleeve" | "full_sleeve";
  baseColourName: string;
  baseColourHex: string;
  frontArtworkName?: string;
  backArtworkName?: string;
  hasCustomMeasurements: boolean;
  fabricPreference?: string;
  gsmPreference?: string;
  printMethod?: string;
  embroideryRequired?: boolean;
  packagingNotes?: string;
}

export interface WebsiteLead {
  id: string;
  enquiryNo: string;
  buyerId: string;
  productSummary: string;
  expectedQuantity: number;
  currency: Currency;
  deliveryDeadline: string;
  notes?: string;
  createdAt: string;
  source: LeadSource;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  sizeBreakdown?: Record<string, number>;
  designConfig?: DesignLabConfig;
}
