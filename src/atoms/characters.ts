import { atomWithStorage } from 'jotai/utils'
import type { Character } from '../types/Character'
import { nanoid } from 'nanoid'
import { Race } from '../types/BookResources'

export const characters = atomWithStorage<Character[]>('chars', [])

export const getDefaultCharacter = () => ({
    id: nanoid(),
    name: "",
    points: { total: 10, left: 10 },
    attrs: {
        strength: { base: 0, other: 0, race: 0 },
        dexterity: { base: 0, other: 0, race: 0 },
        constitution: { base: 0, other: 0, race: 0 },
        intelligence: { base: 0, other: 0, race: 0 },
        wisdom: { base: 0, other: 0, race: 0 },
        charisma: { base: 0, other: 0, race: 0 },
    },
    race: Race.Other
})

export const activeCharacter = atomWithStorage<Character>("active", getDefaultCharacter())