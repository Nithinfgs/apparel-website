/**
 * Canonical public product catalogue — the single source both the homepage
 * rail, /products, and /products/[category] read from (spec §12/§13). Not a
 * Texcroft OS domain entity: `Style`/`Order` model what Texcroft produces
 * internally per buyer; this models what Texcroft advertises publicly.
 */
export interface PublicProductCategory {
  slug: string;
  name: string;
  gsm: string;
  fabric: string;
  finishes: string;
  moq: string;
  description: string;
  /** Public-domain-license stock photography (public/images/products/) — see docs/HANDOFF.md for sourcing/licensing notes. */
  image: string;
}

export const PUBLIC_PRODUCT_CATEGORIES: PublicProductCategory[] = [
  {
    slug: "custom-designer",
    name: "Custom Product Designer",
    gsm: "Your choice",
    fabric: "All knitted fabrics supported",
    finishes: "Full customization via Design Lab",
    moq: "50 pcs",
    description: "Design your own garment in the AI Design Lab — colour, artwork, and specs, sent straight to production.",
    image: "/images/products/custom-designer.jpg",
  },
  {
    slug: "kids-baby-wear",
    name: "Kids & Baby Wear",
    gsm: "140–240 GSM",
    fabric: "100% cotton, organic cotton, soft jersey",
    finishes: "Screen print, applique, embroidery",
    moq: "100 pcs",
    description: "Soft-hand knits built for comfort and safety, produced to the finishing standards baby and kidswear demand.",
    image: "/images/products/kids-baby-wear.jpg",
  },
  {
    slug: "innerwear",
    name: "Innerwear",
    gsm: "160–200 GSM",
    fabric: "Micro modal, bamboo-cotton, modal blends",
    finishes: "Elastic waistband, tag-free labels",
    moq: "100 pcs",
    description: "Next-to-skin fabrics with tag-free construction and consistent elastic quality across every batch.",
    image: "/images/products/innerwear.jpg",
  },
  {
    slug: "sleep-night-wear",
    name: "Sleep & Night Wear",
    gsm: "160–220 GSM",
    fabric: "Combed cotton, cotton/poly blends",
    finishes: "Enzyme wash, garment dye",
    moq: "50 pcs",
    description: "Enzyme-washed, garment-dyed loungewear finished for softness that holds up over repeat washes.",
    image: "/images/products/sleep-night-wear.jpg",
  },
  {
    slug: "workwear-uniforms",
    name: "Workwear & Uniforms",
    gsm: "180–300 GSM",
    fabric: "Cotton, CVC, poly blends",
    finishes: "Embroidery, sublimation, applique",
    moq: "50 pcs",
    description: "Consistent colour matching and repeat-order reliability for company-branded uniform programmes.",
    image: "/images/products/workwear-uniforms.jpg",
  },
  {
    slug: "joggers-shorts",
    name: "Joggers & Shorts",
    gsm: "200–240 GSM",
    fabric: "Cotton, polyester fleece, loopknit",
    finishes: "Ribbed cuffs, zip pockets, enzyme wash",
    moq: "100 pcs",
    description: "Fleece and loopknit bottoms with ribbed cuffs and zip-pocket construction built to spec.",
    image: "/images/products/joggers-shorts.jpg",
  },
  {
    slug: "hoodies-sweatshirts",
    name: "Hoodies & Sweatshirts",
    gsm: "240–400 GSM",
    fabric: "Combed cotton, polyester fleece",
    finishes: "Applique, embroidery, screen print",
    moq: "100 pcs",
    description: "Heavyweight fleece constructions from 240 to 400 GSM, decorated in-house.",
    image: "/images/products/hoodies-sweatshirts.jpg",
  },
  {
    slug: "polo-golfer",
    name: "Collared (Polo/Golfer) T-Shirts",
    gsm: "180–300 GSM",
    fabric: "Cotton, polyester blends, tri-blends, CVC",
    finishes: "Tipping, woven placket, embroidery",
    moq: "50 pcs",
    description: "Tipped collars and woven plackets finished to corporate and retail standard alike.",
    image: "/images/products/polo-golfer.jpg",
  },
  {
    slug: "crew-neck",
    name: "Crew Neck T-Shirts",
    gsm: "160–300 GSM",
    fabric: "Cotton, polyester blends, tri-blends, CVC",
    finishes: "Screen printing, DTF/DTG, sublimation",
    moq: "50 pcs",
    description: "The core of our production — GSM-verified crew knits across every major print method.",
    image: "/images/products/crew-neck.jpg",
  },
];

export function getPublicProductCategory(slug: string): PublicProductCategory | undefined {
  return PUBLIC_PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}
