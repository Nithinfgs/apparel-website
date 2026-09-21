"use server";

import { createPublicEnquiry } from "@/lib/public/enquiry-intake";
import type { PublicEnquiryInput } from "@/lib/validation/public-enquiry";

/**
 * The one server action every public lead surface calls (homepage quote,
 * About, Contact, product pages, Design Lab) — BUSINESS_RULES.md §20. Each
 * caller only varies `source` and which optional fields it fills in.
 */
export async function submitPublicEnquiry(input: PublicEnquiryInput) {
  const result = createPublicEnquiry(input);
  if (!result.success) {
    return { success: false as const, error: result.error };
  }
  return { success: true as const, enquiryNo: result.enquiry.enquiryNo };
}
