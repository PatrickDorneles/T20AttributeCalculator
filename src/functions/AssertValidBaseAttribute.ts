import type { ValidBaseAttribute } from "./AttributeCalculator";

export function assertValidBaseAttribute(value: number): asserts value is ValidBaseAttribute {
    if(!(value > -2 && value < 5)) {
        throw new Error("Invalid base attribute value");
    }

}