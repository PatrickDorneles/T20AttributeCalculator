import type { RacialBonus } from "../types/BookResources";
import { Race } from "../types/BookResources";

export const RacialBonusMap = new Map<Race, RacialBonus>([
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
    }]
])