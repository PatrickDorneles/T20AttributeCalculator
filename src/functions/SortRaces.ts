import { Race } from "../types/BookResources";

export const SortRaces = <T extends (key: unknown) => string>(raceOptions: Race[], t: T): Race[] => {
  return [...raceOptions].sort((a, b) => {
    if (a === Race.Other) return -1;
    if (b === Race.Other) return 1;
    return t(`races.${a}`).localeCompare(t(`races.${b}`));
  });
}
