export const DESIGN_LAB_CATEGORIES = ["Men", "Women", "Boys", "Girls", "Baby"] as const;
export type DesignLabCategory = (typeof DESIGN_LAB_CATEGORIES)[number];

export interface DesignLabGarment {
  id: string;
  name: string;
  supportsSleeveStyle: boolean;
}

export const DESIGN_LAB_GARMENTS: DesignLabGarment[] = [
  { id: "tshirt", name: "T-Shirt", supportsSleeveStyle: true },
  { id: "polo", name: "Polo", supportsSleeveStyle: true },
  { id: "hoodie", name: "Hoodie", supportsSleeveStyle: false },
  { id: "sweatshirt", name: "Sweatshirt", supportsSleeveStyle: false },
  { id: "jogger", name: "Jogger", supportsSleeveStyle: false },
];

export const DESIGN_LAB_SWATCHES: { name: string; hex: string }[] = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#f5f5f0" },
  { name: "Grey", hex: "#8c8c8c" },
  { name: "Charcoal", hex: "#3a3f44" },
  { name: "Navy", hex: "#1c2b4a" },
  { name: "Royal Blue", hex: "#1a4fcf" },
  { name: "Sky Blue", hex: "#7fb8e0" },
  { name: "Teal", hex: "#1f6f6a" },
  { name: "Forest Green", hex: "#1e5631" },
  { name: "Lime", hex: "#9fd45a" },
  { name: "Mustard", hex: "#c99a3c" },
  { name: "Orange", hex: "#d9662b" },
  { name: "Red", hex: "#b5342a" },
  { name: "Burgundy", hex: "#6b1f2a" },
  { name: "Pink", hex: "#d6588e" },
  { name: "Blush", hex: "#e8b4bc" },
  { name: "Purple", hex: "#4a2f6b" },
  { name: "Lavender", hex: "#a89bd0" },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
