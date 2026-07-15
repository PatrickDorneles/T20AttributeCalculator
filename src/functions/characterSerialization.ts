import { Character } from '../types/Character'
import { nanoid } from 'nanoid'
import { z } from 'zod'

const CharacterArraySchema = z.tuple([
  z.string(), // name
  z.string(), // race
  z.string(), // customRaceName
  z.number(), // totalPoints
  z.number(), // leftPoints
  z.number(), z.number(), z.number(), // strength: base, race, other
  z.number(), z.number(), z.number(), // dexterity: base, race, other
  z.number(), z.number(), z.number(), // constitution: base, race, other
  z.number(), z.number(), z.number(), // intelligence: base, race, other
  z.number(), z.number(), z.number(), // wisdom: base, race, other
  z.number(), z.number(), z.number(), // charisma: base, race, other
])

export const serializeCharacter = (char: Character): string => {
  const { name, race, customRaceName, points, attrs } = char
  const data = [
    name,
    race,
    customRaceName || '',
    points.total,
    points.left,
    attrs.strength.base, attrs.strength.race, attrs.strength.other,
    attrs.dexterity.base, attrs.dexterity.race, attrs.dexterity.other,
    attrs.constitution.base, attrs.constitution.race, attrs.constitution.other,
    attrs.intelligence.base, attrs.intelligence.race, attrs.intelligence.other,
    attrs.wisdom.base, attrs.wisdom.race, attrs.wisdom.other,
    attrs.charisma.base, attrs.charisma.race, attrs.charisma.other,
  ]
  return JSON.stringify(data)
}

export const deserializeCharacter = (dataString: string): Character => {
  const parsed = JSON.parse(dataString)

  if (!Array.isArray(parsed)) {
    return {
      ...parsed,
      id: parsed.id || nanoid(),
    } as Character
  }

  const result = CharacterArraySchema.safeParse(parsed)
  if (!result.success) {
    throw new Error(`Invalid character data format: ${result.error.message}`)
  }

  const data = result.data
  const [
    name,
    race,
    customRaceName,
    totalPoints,
    leftPoints,
    sB, sR, sO,
    dB, dR, dO,
    cB, cR, cO,
    iB, iR, iO,
    wB, wR, wO,
    chB, chR, chO,
  ] = data

  return {
    id: nanoid(),
    name,
    race,
    customRaceName: customRaceName || undefined,
    points: { total: totalPoints, left: leftPoints },
    attrs: {
      strength: { base: sB, race: sR, other: sO },
      dexterity: { base: dB, race: dR, other: dO },
      constitution: { base: cB, race: cR, other: cO },
      intelligence: { base: iB, race: iR, other: iO },
      wisdom: { base: wB, race: wR, other: wO },
      charisma: { base: chB, race: chR, other: chO },
    },
  }
}
