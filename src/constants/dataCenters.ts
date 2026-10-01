export const JAPAN_DATA_CENTERS = [
  "Elemental",
  "Gaia",
  "Mana",
  "Meteor",
] as const;

export type JapanDataCenter = (typeof JAPAN_DATA_CENTERS)[number];
