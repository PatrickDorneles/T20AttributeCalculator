export enum Race {
    Human,
    Dwarf,
    Dahllan,
    Elf,
    Goblin,
    Lefou,
    Minotaur,
    Qareen,
    Hynne,
    Kliren,
    Medusa,
    Osteon,
    Merfolk,
    Silfide,
    Sulfure,
    Aggelus,
    Trog
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
}