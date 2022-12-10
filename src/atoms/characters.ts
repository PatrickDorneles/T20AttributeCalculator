import { atomWithStorage } from 'jotai/utils'
import type { Character } from '../types/Character'

export const characters = atomWithStorage<Character[]>('chars', [])

export const activeCharacter = atomWithStorage<Character>("active", {
    name: "",
    points: { total: 20, left: 20 },
    attrs: {
        strength: { base: 0, other: 0, racial: 0 },
        dexterity: { base: 0, other: 0, racial: 0 },
        constitution: { base: 0, other: 0, racial: 0 },
        intelligence: { base: 0, other: 0, racial: 0 },
        wisdom: { base: 0, other: 0, racial: 0 },
        charisma: { base: 0, other: 0, racial: 0 },
    },
    race: null
})