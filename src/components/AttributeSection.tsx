import { CharismaIcon, ConstitutionIcon, DexterityIcon, IntelligenceIcon, StrengthIcon, WisdomIcon } from "./svg/Attributes"
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useAtom } from "jotai"
import { activeCharacter } from "../atoms/characters"
import type { FC} from "react";
import { useEffect } from "react"
import type { Character } from "../types/Character"
import { RacialBonusMap } from "../resources/RacialBonusMap"
import { strict } from "assert"

type AttributesNames = keyof Character['attrs']


const IconFromName: {
    [key in AttributesNames]: FC<{ className?: string }>
} = {
    strength: StrengthIcon,
    constitution: ConstitutionIcon,
    dexterity: DexterityIcon,
    intelligence: IntelligenceIcon,
    wisdom: WisdomIcon,
    charisma: CharismaIcon
}


export const AttributeGroup: FC<{ name: keyof Character['attrs'] }> = ({ name }) => {
    const [char, setChar] = useAtom(activeCharacter)
    const Icon = IconFromName[name]

    const racialBonus = char.race && RacialBonusMap.get(char.race)

    const shouldShowOptionsOnRacialBonusInput =
        !racialBonus 
        || racialBonus.type === "choice"
        || (racialBonus.type === 'mixed' && racialBonus.attrs[name] == 0)

    const totalSum = char.attrs[name].base + char.attrs[name].racial + char.attrs[name].other

    useEffect(() => {
        if(racialBonus && racialBonus.type !== 'choice') {
            setChar((char) => ({
                ...char,
                attrs: {
                    strength: { ...char.attrs.strength, racial: racialBonus.attrs.strength },
                    dexterity: { ...char.attrs.dexterity, racial: racialBonus.attrs.dexterity },
                    constitution: { ...char.attrs.constitution, racial: racialBonus.attrs.constitution },
                    intelligence: { ...char.attrs.intelligence, racial: racialBonus.attrs.intelligence },
                    wisdom: { ...char.attrs.wisdom, racial: racialBonus.attrs.wisdom },
                    charisma: { ...char.attrs.charisma, racial: racialBonus.attrs.charisma },
                }
            }))
        }
    }, [racialBonus, setChar])

    function changeFieldValue(field: keyof Character['attrs'][AttributesNames], newValue: number) {

        // Overcomplicated shit, surely there's a way better way to do this
        setChar((char) => ({
            ...char,
            attrs: {
                ...char.attrs,
                [name]: {
                    ...char.attrs[name],
                    [field]: newValue
                }
            }
        }))
    }

    function addToField(field: keyof Character['attrs'][AttributesNames]) {
        changeFieldValue(field, char.attrs[name][field]+1)
    }

    function subFromField(field: keyof Character['attrs'][AttributesNames]) {
        changeFieldValue(field, char.attrs[name][field]-1)
    }
    
    return (<div className="flex items-center gap-3 w-full">
        <div className="flex flex-col gap-2 items-center justify-center mr-4">
            <Icon className="w-10 h-10" />
            <span className="text-white text-lg font-bold w-10 uppercase text-center">{name.slice(0,3)}</span>
        </div>

        <div title="Base Field" className="flex flex-col items-center justify-center h-min" > 
            <button className="bg-red-600 rounded-t w-full hover:bg-red-800 active:opacity-50 flex items-center justify-center"  
                onClick={() => addToField('base')}
            > 
                <ChevronUpIcon className="w-6 text-white" />
            </button>

            <input type="text" className="h-full w-12 px-4 py-1 text-center bg-red-600 text-white text-lg" disabled value={char.attrs[name].base} />
            
            <button className="bg-red-600 rounded-b w-full hover:bg-red-800 active:opacity-50 flex items-center justify-center"
                onClick={() => subFromField('base')}
            >
                <ChevronDownIcon className="w-6 text-white" />
            </button>
        </div>

        <span className="text-lg text-white font-bold">+</span>

        { shouldShowOptionsOnRacialBonusInput? (
            <div title="Racial Field" className="flex flex-col items-center justify-center h-min" > 
                <button className="bg-red-600 rounded-t w-full hover:bg-red-800 active:opacity-50 flex items-center justify-center"  
                    onClick={() => addToField('racial')}
                > 
                    <ChevronUpIcon className="w-6 text-white" />
                </button>

                <input type="text" className="h-full w-12 px-4 py-1 text-center bg-red-600 text-white text-lg" disabled value={char.attrs[name].racial} />
                
                <button className="bg-red-600 rounded-b w-full hover:bg-red-800 active:opacity-50 flex items-center justify-center"
                    onClick={() => subFromField('racial')}
                >
                    <ChevronDownIcon className="w-6 text-white" />
                </button>
            </div>
        ) : (
            <input type="text" className="w-12 px-4 py-1 text-center bg-red-600 text-white text-lg rounded" disabled value={0} />
        ) }

        <span className="text-lg text-white font-bold">+</span>

        <div title="Other Field" className="flex flex-col items-center justify-center h-min" > 
            <button className="bg-red-600 rounded-t w-full hover:bg-red-800 active:opacity-50 flex items-center justify-center"  
                onClick={() => addToField('other')}
            > 
                <ChevronUpIcon className="w-6 text-white" />
            </button>

            <input type="text" className="h-full w-12 px-4 py-1 text-center bg-red-600 text-white text-lg" disabled value={char.attrs[name].other} />
            
            <button className="bg-red-600 rounded-b w-full hover:bg-red-800 active:opacity-50 flex items-center justify-center"
                onClick={() => subFromField('other')}
            >
                <ChevronDownIcon className="w-6 text-white" />
            </button>
        </div>

        <span className="text-lg text-white font-bold">=</span>

        <input type="text" className="w-12 px-4 py-1 text-center bg-red-600 text-white text-lg rounded" disabled value={totalSum} />
    </div>)
}