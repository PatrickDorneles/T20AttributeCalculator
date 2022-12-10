import { atomWithStorage } from 'jotai/utils'
import type { Character } from '../types/Character'

export const characters = atomWithStorage<Character[]>('chars', [])