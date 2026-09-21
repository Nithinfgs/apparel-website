import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { createPublicEnquiry } from "../src/lib/public/enquiry-intake";

describe("Public website lead intake (website quote form / Design Lab)", () => {
  it("creates a lead from a plain website quote submission", () => {
    const result = createPublicEnquiry({
      source: "website_quote",
      productType: "Crew Neck T-Shirts",
      quantity: 300,
      contactName: "Priya Test",
      companyName: `Test Co ${Date.now()}`,
      email: `buyer-${Date.now()}@example.com`,
      phone: "+1 555 0100",
    });

    assert.equal(result.success, true);
    if (!result.success) return;
    assert.match(result.enquiry.enquiryNo, /^ENQ-\d+$/);
    assert.equal(result.enquiry.source, "website_quote");
    assert.equal(result.enquiry.expectedQuantity, 300);
  });

  it("finds an existing buyer by email instead of creating a duplicate", () => {
    const email = `repeat-${Date.now()}@example.com`;
    const first = createPublicEnquiry({
      source: "website_quote",
      productType: "Hoodies & Sweatshirts",
      quantity: 100,
      contactName: "Same Buyer",
      companyName: "Repeat Co",
      email,
      phone: "+1 555 0101",
    });
    const second = createPublicEnquiry({
      source: "website_quote",
      productType: "Joggers & Shorts",
      quantity: 120,
      contactName: "Same Buyer",
      companyName: "Repeat Co",
      email,
      phone: "+1 555 0101",
    });

    assert.equal(first.success, true);
    assert.equal(second.success, true);
    if (!first.success || !second.success) return;
    assert.equal(first.enquiry.buyerId, second.enquiry.buyerId);
  });

  it("attaches a serializable design config and size breakdown for a Design Lab submission", () => {
    const result = createPublicEnquiry({
      source: "design_lab",
      productType: "Men Hoodie",
      quantity: 50,
      contactName: "Design Buyer",
      companyName: `Design Co ${Date.now()}`,
      email: `design-${Date.now()}@example.com`,
      phone: "+1 555 0102",
      sizeBreakdown: { XS: 0, S: 0, M: 50, L: 0, XL: 0, XXL: 0 },
      designConfig: {
        productCategory: "Men",
        garmentType: "Hoodie",
        baseColourName: "Royal Blue",
        baseColourHex: "#1A4FCF",
        hasCustomMeasurements: false,
      },
    });

    assert.equal(result.success, true);
    if (!result.success) return;
    assert.equal(result.enquiry.source, "design_lab");
    assert.equal(result.enquiry.designConfig?.baseColourHex, "#1A4FCF");
    assert.equal(result.enquiry.sizeBreakdown?.M, 50);
  });

  it("rejects a malformed submission (empty required fields, invalid email)", () => {
    const result = createPublicEnquiry({
      source: "design_lab",
      productType: "",
      quantity: 0,
      contactName: "",
      companyName: "",
      email: "not-an-email",
      phone: "",
    });

    assert.equal(result.success, false);
  });
});
