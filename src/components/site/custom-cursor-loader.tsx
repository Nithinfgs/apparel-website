"use client";

import dynamic from "next/dynamic";

// `next/dynamic({ ssr: false })` needs a Client Component boundary to call
// it from — this thin wrapper is that boundary, so the server layout
// (src/app/(site)/layout.tsx) can stay a Server Component while the cursor
// itself never renders (or hydrates against) any server-rendered markup.
export const CustomCursor = dynamic(() => import("./custom-cursor").then((m) => m.CustomCursor), { ssr: false });
