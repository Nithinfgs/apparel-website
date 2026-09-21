export interface ProcessStep {
  step: string;
  duration: string;
  title: string;
  body: string;
  outcome: string;
  tags: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    duration: "1–2 BUSINESS DAYS",
    title: "Requirements & Costing",
    body: "We review your tech pack or requirements, clarify specs, confirm fabric and finishes, and provide a detailed cost breakdown within 24 hours. No tech pack? We help you build one.",
    outcome: "Locked specifications, transparent pricing, and a clear production plan.",
    tags: ["Tech pack support", "Spec confirmation", "Transparent costing", "MOQ from 50 pieces"],
  },
  {
    step: "02",
    duration: "2–4 BUSINESS DAYS",
    title: "Fabric & Trim Sourcing",
    body: "Fabrics sourced from verified mills in Tiruppur. Every lot is GSM-tested before cutting. Swatches sent for your approval before proceeding.",
    outcome: "GSM-verified materials from trusted mills, swatch and trim sign-off before production.",
    tags: ["Mill-direct sourcing", "Swatch approvals", "GSM testing on every lot"],
  },
  {
    step: "03",
    duration: "2–3 DAYS (SAMPLING)",
    title: "Sampling & Approvals",
    body: "Proto samples, fit samples, lab dips, and size set samples produced and shared. Samples ready within 2–3 business days once fabric and trims are in hand.",
    outcome: "Complete sample set for your approval before a single piece of bulk is cut.",
    tags: ["Proto & fit samples", "Lab dip colour matching", "Size set samples"],
  },
  {
    step: "04",
    duration: "DEPENDS ON ORDER QUANTITY",
    title: "Bulk Production",
    body: "Cutting, stitching, trimming, finishing, and washing executed per approved specs. Local units for smaller and faster orders; vetted partner factory network for larger volumes.",
    outcome: "Monitored production with daily tracking and milestone updates.",
    tags: ["Cutting & stitching", "Washing & finishing", "Daily tracking updates"],
  },
  {
    step: "05",
    duration: "ONGOING + POST-PRODUCTION",
    title: "Inline QC & Final Inspection",
    body: "Checks run throughout production — at cutting, stitching, and finishing. Final inspection covers measurements, visual defects, and AQL-based audit (2.5 major / 4.0 minor).",
    outcome: "Defect-free output verified at every stage, not just before shipping.",
    tags: ["Inline audits", "Measurement checks", "AQL 2.5 / 4.0 standard"],
  },
  {
    step: "06",
    duration: "1–2 DAYS AFTER INSPECTION",
    title: "Packing & Dispatch",
    body: "Garments packed per your exact specifications — poly bags, cartons, assortment, hangtags, and barcodes. Export documentation fully prepared.",
    outcome: "Export-ready cartons with full documentation, shipped to your destination.",
    tags: ["Custom packing", "Export documentation", "Global shipment coordination"],
  },
];
