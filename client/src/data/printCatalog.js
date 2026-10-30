/** Print shop metadata (prices in USD cents). Merged with gallery item fields at runtime. */
export const printMetaById = {
  g01: {
    priceCents: 6500,
    printDescription:
      "Archival matte print, 16×20 in. Ready to frame. Printed on demand in the US.",
  },
  g02: {
    priceCents: 5500,
    printDescription: "Lustre finish, 12×18 in. Soft texture, true-to-life skin tones.",
  },
  g03: {
    priceCents: 4800,
    printDescription: "Studio edition, 11×14 in. Clean borders, gallery white backing.",
  },
  g04: {
    priceCents: 4500,
    printDescription: "Standard print, 12×16 in. Everyday moments, everyday size.",
  },
  g05: {
    priceCents: 4200,
    printDescription: "Behind-the-scenes print, 8×10 in. A peek at our process.",
  },
  g06: {
    priceCents: 7200,
    printDescription: "Large landscape, 20×30 in. For walls that need horizon.",
  },
  g07: {
    priceCents: 3800,
    printDescription: "Minimal gear study, 8×10 in. Matte black ink on warm paper.",
  },
  g08: {
    priceCents: 5800,
    printDescription: "Seascape print, 16×20 in. Deep blacks, copper highlights preserved.",
  },
  g09: {
    priceCents: 5200,
    printDescription: "Portrait print, 12×18 in. Low-key tones, soft contrast.",
  },
  g10: {
    priceCents: 6800,
    printDescription: "On-location edition, 18×24 in. Mist and woodland detail.",
  },
};

const DEFAULT_META = {
  priceCents: 4500,
  printDescription: "Fine art print on archival paper. Sizes may vary by image.",
};

export function enrichWithPrintMeta(item) {
  if (!item) return null;
  const meta = printMetaById[item.id] ?? DEFAULT_META;
  return { ...item, ...meta };
}
