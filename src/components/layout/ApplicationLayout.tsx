import { useAtom } from "jotai"
import { useEffect } from "react"
import { activeCharacter } from "../../atoms/characters"
import type { ValidBaseAttribute } from "../../functions/AttributeCalculator";
import { getAttributeCost } from "../../functions/AttributeCalculator"
import { AttributeGroup } from "../AttributeSection"
import { Logo } from "../svg/Logo"

export const ApplicationLayout = () => {
    const [char, setChar] = useAtom(activeCharacter)

    useEffect(() => {
        const totalCost = 
            getAttributeCost(char.attrs.strength.base as ValidBaseAttribute)
            + getAttributeCost(char.attrs.dexterity.base as ValidBaseAttribute)
            + getAttributeCost(char.attrs.constitution.base as ValidBaseAttribute)
            + getAttributeCost(char.attrs.intelligence.base as ValidBaseAttribute)
            + getAttributeCost(char.attrs.wisdom.base as ValidBaseAttribute)
            + getAttributeCost(char.attrs.charisma.base as ValidBaseAttribute)
            
        setChar((char) => ({
            ...char,
            points: { total: char.points.total, left: char.points.total - totalCost }
        }))
    }, [char.attrs])

    return <div className="min-h-screen w-full flex flex-col justify-center items-center gap-6 bg-[#4b0e0e] bg-hero-topography py-12">
        <Logo className="h-24 w-24" />
        <div className="flex flex-col items-center justify-center px-4">
            <h1 className="text-white text-4xl font-bold font-display text-center">T20AC</h1>
            <pre className="text-white font-normal whitespace-pre-line text-center">An attribute calculator for Tormenta20 - Game of The Year Edition</pre>
        </div>
        <div>
            <span className="text-white">Points Left: {char.points.left}</span>
        </div>
        <div className="flex flex-col items-center gap-2 ">
            <header className="flex text-white w-full justify-between px-1 font-bold">
                <span>Name</span>
                <span>Base</span>
                <span>Racial</span>
                <span>Other</span>
                <span>Total</span>
            </header>
            <AttributeGroup name="strength" />
            <AttributeGroup name="dexterity" />
            <AttributeGroup name="constitution" />
            <AttributeGroup name="intelligence" />
            <AttributeGroup name="wisdom" />
            <AttributeGroup name="charisma" />
        </div>
    </div>
}