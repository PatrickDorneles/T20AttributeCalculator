import type { Attribute } from "../types/Attribute"

export type ValidBaseAttributes = 
    -1 | 0 | 1 | 2 | 3 | 4

const AttributeCostMap = {
    [-2]: null,
    [-1]: -1,
    [0]: 0,
    [1]: 1,
    [2]: 2,
    [3]: 4,
    [4]: 7,
    [5]: null
} as const


export const getTotalAttribute = (attribute: Attribute) =>
    attribute.base + attribute.racial + attribute.other

export const getAttributeCost = 
    (value: ValidBaseAttributes) => AttributeCostMap[value] 

export const getNearAttributes = (value: ValidBaseAttributes) => {
    type ValidAttributes = keyof typeof AttributeCostMap
    const previousCost = AttributeCostMap[value - 1 as ValidAttributes]
    const nextCost = AttributeCostMap[value+1 as ValidAttributes]

    return {
        previous: previousCost !== null ? {
            cost: previousCost,
            value: value-1
        } : undefined,
        next: nextCost !== null ? {
            cost: nextCost,
            value: value+1
        } : undefined
    }
}