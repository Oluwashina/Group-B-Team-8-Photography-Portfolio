/** Print copy only — prices come from the API (`priceCents` on gallery items). */
export const printMetaById = {
  g01: {
    printDescription:
      "Archival matte print, 16×20 in. Ready to frame. Printed on demand in the US.",
  },
  g02: {
    printDescription: "Lustre finish, 12×18 in. Soft texture, true-to-life skin tones.",
  },
  g03: {
    printDescription: "Studio edition, 11×14 in. Clean borders, gallery white backing.",
  },
  g04: {
    printDescription: "Standard print, 12×16 in. Everyday moments, everyday size.",
  },
  g05: {
    printDescription: "Behind-the-scenes print, 8×10 in. A peek at our process.",
  },
  g06: {
    printDescription: "Large landscape, 20×30 in. For walls that need horizon.",
  },
  g07: {
    printDescription: "Minimal gear study, 8×10 in. Matte black ink on warm paper.",
  },
  g08: {
    printDescription: "Seascape print, 16×20 in. Deep blacks, copper highlights preserved.",
  },
  g09: {
    printDescription: "Portrait print, 12×18 in. Low-key tones, soft contrast.",
  },
  g10: {
    printDescription: "On-location edition, 18×24 in. Mist and woodland detail.",
  },
};

const DEFAULT_META = {
  printDescription: "Fine art print on archival paper. Sizes may vary by image.",
};

export function enrichWithPrintMeta(item) {
  if (!item) return null;
  const meta = printMetaById[item.id] ?? DEFAULT_META;
  return {
    ...item,
    printDescription: meta.printDescription,
  };
}
