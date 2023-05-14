import type { ValidBaseAttribute } from "./AttributeCalculator";

const LOWER_INVALID_ATTRIBUTE = -2
const UPPER_INVALID_ATTRIBUTE = 5

export function assertValidBaseAttribute(value: number): asserts value is ValidBaseAttribute {
    if (!(value > LOWER_INVALID_ATTRIBUTE && value < UPPER_INVALID_ATTRIBUTE)) {
        throw new Error("Invalid base attribute value");
    }

}
