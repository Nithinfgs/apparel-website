import { z } from "zod";

/**
 * Shared by every public lead-capture surface (homepage quote form, About,
 * Contact, product pages, Design Lab) — one canonical submission shape per
 * BUSINESS_RULES.md §20, not a form per page. `source` tells staff where the
 * lead came from without changing what gets captured.
 */
export const publicEnquirySchema = z.object({
  source: z.enum(["website_quote", "design_lab"]),
  productType: z.string().min(1, "Select a product type"),
  categories: z.array(z.string()).optional(),
  quantity: z.coerce.number().int().min(1, "Enter an expected quantity"),
  targetDispatchDate: z.string().optional(),
  fabricPreference: z.string().optional(),
  gsmPreference: z.string().optional(),
  printMethod: z.string().optional(),
  embroideryRequired: z.boolean().optional(),
  packagingNotes: z.string().optional(),
  notes: z.string().max(2000).optional(),
  contactName: z.string().min(1, "Enter your name"),
  companyName: z.string().min(1, "Enter your company name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(5, "Enter a phone or WhatsApp number"),
  country: z.string().optional(),
  // Design Lab only — undefined for a plain website quote.
  designConfig: z
    .object({
      productCategory: z.string(),
      garmentType: z.string(),
      sleeveStyle: z.enum(["half_sleeve", "full_sleeve"]).optional(),
      baseColourName: z.string(),
      baseColourHex: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid colour"),
      frontArtworkName: z.string().optional(),
      backArtworkName: z.string().optional(),
      hasCustomMeasurements: z.boolean(),
    })
    .optional(),
  sizeBreakdown: z.record(z.string(), z.number().int().min(0)).optional(),
});

export type PublicEnquiryInput = z.infer<typeof publicEnquirySchema>;

/** Design Lab enforces this MOQ before allowing submission — see BUSINESS_RULES.md §20. */
export const DESIGN_LAB_MOQ = 50;
