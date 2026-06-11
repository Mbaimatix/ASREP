/**
 * Single source of truth for ASREP's headline impact statistics.
 * Consumed by the homepage "Impact at a Glance" bar and the /impact page —
 * update values here and both stay in sync.
 */
export type ImpactStat = {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
};

export const IMPACT_STATS: ImpactStat[] = [
  { value: 10, suffix: "", label: "Wards Covered", sublabel: "across Isiolo County" },
  { value: 2000, suffix: "+", label: "People Reached", sublabel: "eco-champions & community members" },
  { value: 500, suffix: "+", label: "Peace Actors", sublabel: "engaged in dialogue" },
  { value: 23, suffix: "", label: "Policies Developed", sublabel: "governance & safeguarding" },
  { value: 60, suffix: "%", label: "Women & Youth", sublabel: "in all programmes" },
];
