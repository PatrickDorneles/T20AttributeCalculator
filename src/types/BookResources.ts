export enum Race {
    Other = 'Other',
    Human = 'Human',
    Dwarf = 'Dwarf',
    Dahllan = 'Dahllan',
    Elf = 'Elf',
    Goblin = 'Goblin',
    Lefou = 'Lefou',
    Minotaur = 'Minotaur',
    Qareen = 'Qareen',
    Golem = 'Golem',
    Hynne = 'Hynne',
    Kliren = 'Kliren',
    Medusa = 'Medusa',
    Osteon = 'Osteon',
    Merfolk = 'Merfolk',
    Silfide = 'Silfide',
    Sulfure = 'Sulfure',
    Aggelus = 'Aggelus',
    Trog = 'Trog',
    Bugbear = "Bugbear",
    Centaur = "Centaur",
    Ceratops = "Ceratops",
    SeaElf = "SeaElf",
    Finntroll = "Finntroll",
    Gnoll = "Gnoll",
    AwakenedGolem = "AwakenedGolem",
    Harpy = "Harpy",
    Hobgoblin = "Hobgoblin",
    Kallyanach = "Kallyanach",
    Kaijin = "Kaijin",
    Kappa = "Kappa",
    Kobolds = "Kobolds",
    Mashin = "Mashin",
    HalfOrc = "HalfOrc",
    Minauro = "Minauro",
    Moreau = "Moreau",
    MaleNagah = "MaleNagah",
    FemaleNagah = "FemaleNagah",
    Nezumi = "Nezumi",
    Ogre = "Ogre",
    Orc = "Orc",
    Pteros = "Pteros",
    Burried = "Burried",
    Tabrachi = "Tabrachi",
    Tengu = "Tengu",
    DwarfTrog = "DwarfTrog",
    Velocis = "Velocis",
    Voracis = "Voracis",
    Yidishan = "Yidishan"
}


export type RacialBonus = {
    type: 'strict'
    attrs: {
        strength: number
        dexterity: number
        constitution: number
        intelligence: number
        wisdom: number
        charisma: number
    }
} | {
    type: 'choice'
    pointsToChoose: number
    maxPerAttribute: number
} | {
    type: 'mixed'

    pointsToChoose: number
    maxPerAttribute: number

    attrs: {
        strength: number
        dexterity: number
        constitution: number
        intelligence: number
        wisdom: number
        charisma: number
    }
} | {
    type: 'free'
}
