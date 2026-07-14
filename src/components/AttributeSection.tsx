import { CharismaIcon, ConstitutionIcon, DexterityIcon, IntelligenceIcon, StrengthIcon, WisdomIcon } from "./svg/Attributes"
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useAtom, useAtomValue } from "jotai"
import { activeCharacter } from "../atoms/characters"
import type { FC } from "react";
import { useEffect } from "react"
import type { Character } from "../types/Character"
import { RacialBonusMap } from "../resources/RacialBonusMap"
import type { ValidBaseAttribute } from "../functions/AttributeCalculator";
import { getAttributeCost } from "../functions/AttributeCalculator";
import { assertValidBaseAttribute } from "../functions/AssertValidBaseAttribute";
import { useTranslations } from 'next-intl'
import { configAtom } from "../atoms/config";

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

export const AttributeGroup: FC<{ name: keyof Character['attrs']; hideControls?: boolean }> = ({ name, hideControls = false }) => {
  const [char, setChar] = useAtom(activeCharacter)
  const config = useAtomValue(configAtom)

  const Icon = IconFromName[name]
  const attribute = char.attrs[name]

  const raceBonus = char.race ? RacialBonusMap.get(char.race) : undefined

    const shouldShowOptionsOnRacialBonusInput =
        !raceBonus
        || raceBonus.type === "choice"
        || (raceBonus.type === 'mixed' && !raceBonus.exceptions?.includes(name))
        || raceBonus.type === "free"


  const totalRacialPoints = Object.values(char.attrs).reduce(
    (previous, attribute) => previous + Math.max(attribute.race, 0),
    0
  )
  const fixedRacialPoints = raceBonus?.type === 'strict' || raceBonus?.type === 'mixed'
    ? Object.values(raceBonus.attrs).reduce((sum, val) => sum + Math.max(val, 0), 0)
    : 0
  const chosenRacialPoints = totalRacialPoints - fixedRacialPoints

  const totalSum = char.attrs[name]['base'] + char.attrs[name]['other'] + char.attrs[name]['race']

  const t = useTranslations("Main.calculator.attributeNames")

  useEffect(() => {
    if (raceBonus && raceBonus.type !== 'choice' && raceBonus.type !== 'free') {
      setChar((char) => ({
        ...char,
        attrs: {
          strength: { ...char.attrs.strength, race: raceBonus.attrs.strength },
          dexterity: { ...char.attrs.dexterity, race: raceBonus.attrs.dexterity },
          constitution: { ...char.attrs.constitution, race: raceBonus.attrs.constitution },
          intelligence: { ...char.attrs.intelligence, race: raceBonus.attrs.intelligence },
          wisdom: { ...char.attrs.wisdom, race: raceBonus.attrs.wisdom },
          charisma: { ...char.attrs.charisma, race: raceBonus.attrs.charisma },
        }
      }))
    }
  }, [raceBonus, setChar])

  function changeFieldValue(field: keyof Character['attrs'][AttributesNames], newValue: number) {
    if (field == 'base') {
      assertValidBaseAttribute(newValue)
    }

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
    changeFieldValue(field, char.attrs[name][field] + 1)
  }

  function subFromField(field: keyof Character['attrs'][AttributesNames]) {
    changeFieldValue(field, char.attrs[name][field] - 1)
  }

  return (<div className="flex items-center gap-2 w-full">
    <div className="flex flex-col gap-2 items-center justify-center mr-8">
      <Icon className="w-10 h-10" />
      <span className="text-white text-lg font-bold w-10 uppercase text-center">{t(name)}</span>
    </div>

    <div title="Base Field" className="flex flex-col items-center justify-center h-min" >
      {!hideControls && (
        <button className="bg-red-600 rounded-t w-full hover:bg-red-800 active:opacity-50 disabled:opacity-0 flex items-center justify-center"
          onClick={() => addToField('base')}
          disabled={
            attribute.base >= 4 ||
            char.points.left
            - getAttributeCost(attribute.base + 1 as ValidBaseAttribute)
            + getAttributeCost(attribute.base as ValidBaseAttribute)
            < 0
          }
        >
          <ChevronUpIcon className="w-6 text-white" />
        </button>
      )}

      <input type="text" className="h-full w-12 py-1 text-center bg-red-600 text-white text-lg opacity-100 rounded-none disabled:text-white" disabled value={attribute.base} />

      {!hideControls && (
        <button className="bg-red-600 rounded-b w-full hover:bg-red-800 active:opacity-50 disabled:opacity-0 flex items-center justify-center"
          onClick={() => subFromField('base')}
          disabled={attribute.base <= -1}
        >
          <ChevronDownIcon className="w-6 text-white" />
        </button>
      )}
    </div>

    <span className="text-lg text-white font-bold">+</span>

    {shouldShowOptionsOnRacialBonusInput ? (
      <div title="Race Field" className="flex flex-col items-center justify-center h-min" >
        {!hideControls && (
          <button className="bg-red-600 rounded-t w-full hover:bg-red-800 active:opacity-50 disabled:opacity-0 flex items-center justify-center"
            onClick={() => addToField('race')}
             disabled={
               !!(raceBonus && 
               (raceBonus.type === 'choice' || raceBonus.type === 'mixed') && 
               (attribute.race >= raceBonus.maxPerAttribute || chosenRacialPoints >= raceBonus.pointsToChoose))
             }


          >
            <ChevronUpIcon className="w-6 text-white" />
          </button>
        )}

        <input type="text" className="h-full w-12 py-1 text-center bg-red-600 text-white text-lg opacity-100 rounded-none disabled:text-white" disabled value={attribute.race} />

        {!hideControls && (
          <button className="bg-red-600 rounded-b w-full hover:bg-red-800 active:opacity-50 disabled:opacity-0 flex items-center justify-center"
            onClick={() => subFromField('race')}
            disabled={raceBonus?.type !== 'free' && attribute.race <= 0}
          >
            <ChevronDownIcon className="w-6 text-white" />
          </button>
        )}
      </div>
    ) : (
      <input type="text" className="h-full w-12 py-1 text-center bg-red-600 text-white text-lg opacity-100 rounded disabled:text-white" disabled value={attribute.race} />
    )}

    <span className={`text-lg text-white font-bold ${!config.othersPointsSection && 'hidden'}`}>+</span>

    <div title="Other Field" className={`flex flex-col items-center justify-center h-min ${!config.othersPointsSection && 'hidden'}`}>
      {!hideControls && (
        <button className="bg-red-600 rounded-t w-full hover:bg-red-800 active:opacity-50 flex items-center justify-center"
          onClick={() => addToField('other')}
        >
          <ChevronUpIcon className="w-6 text-white" />
        </button>
      )}

      <input type="text" className="h-full w-12 py-1 text-center bg-red-600 text-white text-lg opacity-100 rounded-none disabled:text-white" disabled value={attribute.other} />

      {!hideControls && (
        <button className="bg-red-600 rounded-b w-full hover:bg-red-800 active:opacity-50 flex items-center justify-center"
          onClick={() => subFromField('other')}
        >
          <ChevronDownIcon className="w-6 text-white" />
        </button>
      )}
    </div>

    <span className="text-lg text-white font-bold">=</span>

    <input type="text" className="w-12 py-1 text-center bg-red-600 text-white text-lg rounded opacity-100" disabled value={totalSum} />
  </div>)

}
