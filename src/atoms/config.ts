import { atomWithStorage } from "jotai/utils";
import type { Config } from "../types/Config";

export const DEFAULT_CONFIG: Config = {
  editablePoints: false,
  othersPointsSection: false
}

export const configAtom = atomWithStorage<Config>('config', DEFAULT_CONFIG)
