import type { Attribute } from "./Attribute"
import type { Race } from "./BookResources"

export type Character = {
    id: string
    name: string
    race: Race
    points: { total: number, left: number }

    attrs: {
        strength: Attribute
        dexterity: Attribute
        constitution: Attribute
        intelligence: Attribute
        wisdom: Attribute
        charisma: Attribute
    }
}