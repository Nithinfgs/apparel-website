export interface BlogPost {
  slug: string;
  category: "Sourcing" | "Manufacturing" | "Business Strategy" | "Quality Control" | "Textiles";
  title: string;
  excerpt: string;
  date: string;
  body: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "export-packing-checklist",
    category: "Sourcing",
    title: "Export Packing Checklist for Garments: What to Confirm Before Shipment",
    excerpt: "A comprehensive checklist covering poly bags, hangtags, barcodes, carton markings, and export documentation.",
    date: "2026-05-07",
    body: [
      "Before any container leaves Tiruppur, packed goods go through a final compliance check against the buyer's packing instructions.",
      "That check covers poly bag sealing and folding, hangtag and barcode placement, carton markings (weight, dimensions, PO number), and assortment ratios per carton.",
      "Export documentation — packing list, commercial invoice, and certificate of origin where required — is prepared alongside the physical pack, not after it.",
    ],
  },
  {
    slug: "applique-vs-embroidery",
    category: "Manufacturing",
    title: "Applique vs Embroidery for Hoodies: Cost, Durability, and Visual Impact",
    excerpt: "Comparing two popular hoodie decoration techniques.",
    date: "2026-04-23",
    body: [
      "Embroidery gives a raised, textured finish that holds up well to repeat washing, at a higher per-piece cost than screen print.",
      "Applique — fabric pieces stitched onto the garment — suits bold, multi-colour logos where embroidery would lose detail, at a comparable cost to dense embroidery.",
      "For hoodies specifically, embroidery is the more durable choice on high-wear placements like the chest, while applique reads better at larger scale on the back panel.",
    ],
  },
  {
    slug: "custom-corporate-uniforms",
    category: "Business Strategy",
    title: "Ordering Custom Corporate Uniforms: A Practical Guide for Businesses",
    excerpt: "What to prepare and expect for consistent corporate uniform production.",
    date: "2026-04-23",
    body: [
      "Consistent uniform orders depend on locking three things upfront: fabric composition, exact brand colours (as Pantone references, not screen colours), and a sizing chart validated against a fit sample.",
      "Repeat orders should reference the original approved sample and lab dip, not a fresh colour match each time, to avoid batch-to-batch shade drift.",
    ],
  },
  {
    slug: "aql-inspection-explained",
    category: "Quality Control",
    title: "AQL Inspection Explained: What Every Garment Buyer Should Know",
    excerpt: "Understanding AQL can save you from accepting defective shipments.",
    date: "2026-04-23",
    body: [
      "AQL (Acceptable Quality Level) inspection samples a statistically representative subset of a shipment rather than checking every piece.",
      "We apply AQL 2.5 for major defects and AQL 4.0 for minor defects as standard, with third-party or buyer-nominated inspectors accepted on request.",
    ],
  },
  {
    slug: "what-is-gsm",
    category: "Textiles",
    title: "What Is GSM in Garments, and Why It Matters for Your Order",
    excerpt: "GSM determines how your garment feels, drapes, and wears.",
    date: "2026-04-23",
    body: [
      "GSM (grams per square metre) measures fabric weight and density. A 160 GSM tee drapes lighter than a 220 GSM tee, which reads heavier and more structured.",
      "Every fabric lot received is weighed and verified against the approved GSM before cutting begins — a lot outside tolerance is rejected, not cut around.",
    ],
  },
  {
    slug: "what-is-a-tech-pack",
    category: "Manufacturing",
    title: "What Is a Tech Pack, and Do You Need One to Place a Garment Order?",
    excerpt: "A tech pack is a garment's blueprint. It tells a manufacturer everything they need to know to produce your garment correctly.",
    date: "2026-04-23",
    body: [
      "A tech pack specifies measurements by size, fabric and trim details, construction notes, and artwork placement in one document a factory can produce directly from.",
      "You don't always need a finished one to start — our Requirements & Costing step helps build one from a rough brief or reference garment.",
    ],
  },
  {
    slug: "how-to-brief-a-manufacturer",
    category: "Business Strategy",
    title: "How to Brief a Garment Manufacturer: What to Send for an Accurate Quote",
    excerpt: "The quality of your quote depends entirely on the quality of your brief.",
    date: "2026-04-23",
    body: [
      "An accurate quote needs quantity, target fabric and GSM, print/embroidery method, and a target delivery date at minimum.",
      "A reference image or existing garment, even without a formal tech pack, meaningfully speeds up costing accuracy.",
    ],
  },
  {
    slug: "inline-qc-vs-final-inspection",
    category: "Quality Control",
    title: "Inline QC vs Final Inspection: Why Both Matter and What Each Covers",
    excerpt: "Most buyers only ask for a final inspection. Here's why inline quality control catches problems that final inspection never can.",
    date: "2026-04-23",
    body: [
      "Final inspection catches finished-garment defects, but by then an entire cut lot with a systemic fabric or stitching issue is already sewn.",
      "Inline checks at cutting, stitching, and finishing catch that same issue while only a fraction of the order is affected — the difference between a small rework and a full reject.",
    ],
  },
  {
    slug: "reviewing-size-set-samples",
    category: "Manufacturing",
    title: "How to Review and Approve Size Set Samples",
    excerpt: "A step-by-step guide for buyers on evaluating size set samples before bulk production begins.",
    date: "2026-04-23",
    body: [
      "A size set sample covers every size in your run, measured point-by-point against your spec sheet with tolerances noted.",
      "Approve grading (how measurements scale between sizes) as carefully as the base size — a grading error compounds across the whole run.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
