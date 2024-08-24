import type { RacialBonus } from "../types/BookResources";
import { Race } from "../types/BookResources";

export const RacialBonusMap = new Map<Race, RacialBonus>([
    [Race.Other, {
        type: "free"
    }],
    [Race.Aggelus, {
        type: 'strict',
        attrs: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 2,
            charisma: 1,
        }
    }],
    [Race.Dahllan, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 1,
            constitution: 0,
            intelligence: -1,
            wisdom: 2,
            charisma: 0,
        }
    }],
    [Race.Dwarf, {
        type: 'strict',
        attrs: {
            strength: 0,
            dexterity: -1,
            constitution: 2,
            intelligence: 0,
            wisdom: 1,
            charisma: 0,
        }
    }],
    [Race.Elf, {
        type: 'strict',
        attrs: {
            strength: 0,
            dexterity: 1,
            constitution: -1,
            intelligence: 2,
            wisdom: 0,
            charisma: 0,
        }
    }],
    [Race.Goblin, {
        type: 'strict',
        attrs: {
            strength: 0,
            dexterity: 2,
            constitution: 0,
            intelligence: 1,
            wisdom: 0,
            charisma: -1,
        }
    }],
    [Race.Human, {
        type: 'choice',
        pointsToChoose: 3,
        maxPerAttribute: 1
    }],
    [Race.Hynne, {
        type: 'strict',
        attrs: {
            strength: -1,
            dexterity: 2,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 1,
        }
    }],
    [Race.Kliren, {
        type: 'strict',
        attrs: {
            strength: -1,
            dexterity: 0,
            constitution: 0,
            intelligence: 2,
            wisdom: 0,
            charisma: 1,
        }
    }],
    [Race.Lefou, {
        type: 'mixed',
        pointsToChoose: 3,
        maxPerAttribute: 1,
        attrs: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: -1,
        }
    }],
    [Race.Merfolk, {
        type: 'choice',
        pointsToChoose: 3,
        maxPerAttribute: 1,
    }],
    [Race.Medusa, {
        type: 'strict',
        attrs: {
            strength: 0,
            dexterity: 2,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 1,
        }
    }],
    [Race.Minotaur, {
        type: "strict",
        attrs: {
            strength: 2,
            dexterity: 0,
            constitution: 1,
            intelligence: 0,
            wisdom: -1,
            charisma: 0,
        }
    }],
    [Race.Osteon, {
        type: "mixed",
        pointsToChoose: 3,
        maxPerAttribute: 1,
        attrs: {
            strength: 0,
            dexterity: 0,
            constitution: -1,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
        }
    }],
    [Race.Qareen, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 1,
            wisdom: -1,
            charisma: 2,
        }
    }],
    [Race.Silfide, {
        type: "strict",
        attrs: {
            strength: -2,
            dexterity: 1,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 2,
        }
    }],
    [Race.Sulfure, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 2,
            constitution: 0,
            intelligence: 1,
            wisdom: 0,
            charisma: 0,
        }
    }],
    [Race.Trog, {
        type: "strict",
        attrs: {
            strength: 1,
            dexterity: 0,
            constitution: 2,
            intelligence: -1,
            wisdom: 0,
            charisma: 0,
        }
    }],
    [Race.Golem, {
        type: "strict",
        attrs: {
            strength: 2,
            dexterity: 0,
            constitution: 1,
            intelligence: 0,
            wisdom: 0,
            charisma: -1
        }
    }],
    [Race.Bugbear, {
        type: "strict",
        attrs: {
            strength: 2,
            dexterity: 1,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: -1
        }
    }],
    [Race.Centaur, {
        type: "strict",
        attrs: {
            strength: 1,
            dexterity: 0,
            constitution: 0,
            intelligence: -1,
            wisdom: 2,
            charisma: 0
        }
    }],
    [Race.Ceratops, {
        type: "strict",
        attrs: {
            strength: 1,
            dexterity: -1,
            constitution: 2,
            intelligence: -1,
            wisdom: 0,
            charisma: 0
        }
    }],
    [Race.SeaElf, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 2,
            constitution: 1,
            intelligence: -1,
            wisdom: 0,
            charisma: 0
        }
    }],
    [Race.Finntroll, {
        type: "strict",
        attrs: {
            strength: -1,
            dexterity: 0,
            constitution: 1,
            intelligence: 2,
            wisdom: 0,
            charisma: 0
        }
    }],
    [Race.Gnoll, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 0,
            constitution: 2,
            intelligence: -1,
            wisdom: 1,
            charisma: 0
        }
    }],
    [Race.AwakenedGolem, {
        type: "free", //TODO: Make something specific for the new golems
    }],
    [Race.Harpy, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 2,
            constitution: 0,
            intelligence: -1,
            wisdom: 0,
            charisma: 1
        }
    }],
    [Race.Hobgoblin, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 1,
            constitution: 2,
            intelligence: 0,
            wisdom: 0,
            charisma: -1
        }
    }],
    [Race.Kallyanach, {
        type: "mixed",
        maxPerAttribute: 2,
        pointsToChoose: 2,
        attrs: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }
    }],
    [Race.Kaijin, {
        type: "strict",
        attrs: {
            strength: 2,
            dexterity: 0,
            constitution: 1,
            intelligence: 0,
            wisdom: 0,
            charisma: -2
        }
    }],
    [Race.Kappa, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 2,
            constitution: 1,
            intelligence: 0,
            wisdom: 0,
            charisma: -1
        }
    }],
    [Race.Kobolds, {
        type: "strict",
        attrs: {
            strength: -1,
            dexterity: 2,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }
    }],
    [Race.Mashin, {
        type: "free",
    }],
    [Race.HalfOrc, {
        type: "mixed",
        maxPerAttribute: 1,
        pointsToChoose: 1,
        attrs: {
            strength: 2,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }
    }],
    [Race.Minauro, {
        type: "mixed",
        maxPerAttribute: 1,
        pointsToChoose: 2,
        attrs: {
            strength: 1,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }
    }],
    [Race.Moreau, {
        type: "choice",
        maxPerAttribute: 1,
        pointsToChoose: 3
    }],
    [Race.MaleNagah, {
        type: "strict",
        attrs: {
            strength: 1,
            dexterity: 1,
            constitution: 1,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }
    }],
    [Race.FemaleNagah, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 1,
            wisdom: 1,
            charisma: 1
        }
    }],
    [Race.Nezumi, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 1,
            constitution: 2,
            intelligence: -1,
            wisdom: 0,
            charisma: 0
        }
    }],
    [Race.Ogre, {
        type: "strict",
        attrs: {
            strength: 3,
            dexterity: 0,
            constitution: 2,
            intelligence: -1,
            wisdom: 0,
            charisma: -1
        }
    }],
    [Race.Orc, {
        type: "strict",
        attrs: {
            strength: 2,
            dexterity: 0,
            constitution: 1,
            intelligence: -1,
            wisdom: 0,
            charisma: 0
        }
    }],
    [Race.Pteros, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 1,
            constitution: 0,
            intelligence: -1,
            wisdom: 2,
            charisma: 0
        }
    }],
    [Race.Burried, {
        type: "mixed",
        maxPerAttribute: 1,
        pointsToChoose: 3,
        attrs: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: -1
        }
    }],
    [Race.Tabrachi, {
        type: "strict",
        attrs: {
            strength: 1,
            dexterity: 0,
            constitution: 2,
            intelligence: 0,
            wisdom: 0,
            charisma: -1
        }
    }],
    [Race.Tengu, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 2,
            constitution: 0,
            intelligence: 1,
            wisdom: 0,
            charisma: 0
        }
    }],
    [Race.DwarfTrog, {
        type: "strict",
        attrs: {
            strength: 1,
            dexterity: -1,
            constitution: 2,
            intelligence: -1,
            wisdom: 0,
            charisma: 0
        }
    }],
    [Race.Velocis, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 2,
            constitution: 0,
            intelligence: -1,
            wisdom: 1,
            charisma: 0
        }
    }],
    [Race.Voracis, {
        type: "strict",
        attrs: {
            strength: 0,
            dexterity: 2,
            constitution: 1,
            intelligence: -1,
            wisdom: 0,
            charisma: 0
        }
    }],
    [Race.Yidishan, {
        type: "mixed",
        maxPerAttribute: 1,
        pointsToChoose: 3,
        attrs: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: -2
        }
    }],
])
