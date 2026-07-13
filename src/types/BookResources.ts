export type Race = string;

export type RaceData = {
  id: Race;
  source: string;
  icon: string;
  bonus: RacialBonus;
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
