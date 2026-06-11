import fs from "fs";
import path from "path";
import type { ImpactStat } from "./impact-stats";

export function getStats(): ImpactStat[] {
  const raw = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "content/stats.json"), "utf-8")
  );
  return [
    { value: raw.wards_covered,      suffix: "",  label: "Wards Covered",      sublabel: "across Isiolo County" },
    { value: raw.people_reached,     suffix: "+", label: "People Reached",      sublabel: "eco-champions & community members" },
    { value: raw.peace_actors,       suffix: "+", label: "Peace Actors",        sublabel: "engaged in dialogue" },
    { value: raw.policies_developed, suffix: "",  label: "Policies Developed",  sublabel: "governance & safeguarding" },
    { value: raw.women_youth_pct,    suffix: "%", label: "Women & Youth",       sublabel: "in all programmes" },
  ];
}
