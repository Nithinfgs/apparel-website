import type { Metadata } from "next";
import { DesignLab } from "@/components/site/design-lab/design-lab";

export const metadata: Metadata = {
  title: "AI Design Lab — Custom Garment Design Tool",
  description: "Design your t-shirt, hoodie, or jogger online. Visualize fabric, colour and silhouette, then send it to Texcroft for production from 50 pieces.",
  alternates: { canonical: "/design" },
};

export default async function DesignLabPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; colour?: string; name?: string }>;
}) {
  const params = await searchParams;
  return <DesignLab prefillProduct={params.product} prefillColourHex={params.colour} prefillColourName={params.name} />;
}
