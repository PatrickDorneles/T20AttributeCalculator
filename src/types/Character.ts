import type { Attribute } from "./Attribute"
import type { Race } from "./BookResources"

export type Character = {
    name: string
    race: Race
    points: number

    attrs: {
        strength: Attribute
        dexterity: Attribute
        constitution: Attribute
        intelligence: Attribute
        wisdom: Attribute
        charisma: Attribute
    }
}