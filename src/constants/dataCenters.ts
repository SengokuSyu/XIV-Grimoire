export const JAPAN_DATA_CENTERS = {
  Elemental: [
    "Aegis",
    "Atomos",
    "Carbuncle",
    "Garuda",
    "Gungnir",
    "Kujata",
    "Tonberry",
    "Typhon",
  ],

  Gaia: [
    "Alexander",
    "Bahamut",
    "Durandal",
    "Fenrir",
    "Ifrit",
    "Ridill",
    "Tiamat",
    "Ultima",
  ],

  Mana: [
    "Anima",
    "Asura",
    "Chocobo",
    "Hades",
    "Ixion",
    "Masamune",
    "Pandaemonium",
    "Titan",
  ],

  Meteor: [
    "Belias",
    "Mandragora",
    "Ramuh",
    "Shinryu",
    "Unicorn",
    "Valefor",
    "Yojimbo",
    "Zeromus",
  ],
} as const;

export type JapanDataCenter = keyof typeof JAPAN_DATA_CENTERS;
