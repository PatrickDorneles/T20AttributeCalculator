import React from 'react'
import { useAtom } from "jotai"
import { Listbox } from '@headlessui/react'
import { RacialBonusMap } from "../../resources/RacialBonusMap";
import { useTranslations } from 'next-intl'
import { activeCharacter, getDefaultCharacter } from "../../atoms/characters"
import type { Race } from "../../types/BookResources";
import { SortRaces } from "../../functions/SortRaces";
import { Fragment } from "react"

export const CharacterInfo = () => {
    const [char, setChar] = useAtom(activeCharacter)
    const raceOptions = [...RacialBonusMap.keys()]
    const t = useTranslations("Main")
    const orderedRaceOptions = SortRaces(raceOptions, t as (key: unknown) => string)

    return (
        <section title="Character Info" className="flex gap-4">
            <Listbox
                as="div"
                className="relative"
                value={char.race}
                onChange={(race: Race) => setChar((char) => ({ ...char, race }))}
            >
                <Listbox.Button className="text-white bg-red-600 hover:bg-red-900 active:opacity-50 px-2 py-1 rounded w-36">
                    {t('raceSelector.button', { race: t(`races.${char.race}`) })}
                </Listbox.Button>
                <Listbox.Options className="flex flex-col absolute bg-red-900 mt-4 w-full max-h-[50vh] overflow-y-auto overscroll-auto rounded z-50 outline-none">
                    {orderedRaceOptions.map((race) => (
                        <Listbox.Option
                            key={race}
                            value={race}
                            as={Fragment}
                        >
                            {
                                ({ active, selected }) =>
                                    <button
                                        className={`text-center p-2 text-white active:brightness-150 :bg-white cursor-pointer ${active && 'bg-red-700'} ${selected && 'border-2 border-red-200'}`}
                                    >
                                        {t(`races.${race}`)}
                                    </button>
                                }
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
            <button onClick={() => setChar(getDefaultCharacter())} className="text-white bg-red-600 hover:bg-red-900 active:opacity-50 px-2 py-1 rounded">{t('resetButton')}</button>
        </section>
    )
}
