import type { RacialBonus, RaceData, Race } from "../types/BookResources";
import racesData from "./races.json";

export const RacialBonusMap = new Map<Race, RacialBonus>(
  (racesData as RaceData[]).map((race) => [race.id, race.bonus as RacialBonus])
);
