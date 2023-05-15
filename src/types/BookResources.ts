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
    Trog = 'Trog'
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
