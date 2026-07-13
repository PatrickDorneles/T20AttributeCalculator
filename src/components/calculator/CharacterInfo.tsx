import React, { useState } from 'react'
import { useAtom } from "jotai"
import { Dialog } from '@headlessui/react'
import { RacialBonusMap } from "../../resources/RacialBonusMap";
import { useTranslations } from 'next-intl'
import { activeCharacter, getDefaultCharacter } from "../../atoms/characters"
import type { Race } from "../../types/BookResources";
import { SortRaces } from "../../functions/SortRaces";
import { RaceSelectorModal } from "../layout/RaceSelectorModal";

export const CharacterInfo = () => {
    const [char, setChar] = useAtom(activeCharacter)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const t = useTranslations("Main")
 
    return (
        <section title="Character Info" className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex gap-2 items-center">
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="text-white bg-red-600 hover:bg-red-900 active:opacity-50 px-2 py-1 rounded w-36"
                >
                    {t('raceSelector.button', { race: t(`races.${char.race}` as any) })}
                </button>
 
                {char.race === 'Other' && (
                    <input 
                        type="text"
                        className="bg-red-500 text-white px-2 py-1 rounded outline-none focus:ring-1 focus:ring-white text-sm"
                        placeholder={t('raceSelector.customRaceLabel')}
                        value={char.customRaceName || ""}
                        onChange={(e) => setChar({ ...char, customRaceName: e.target.value })}
                    />
                )}
            </div>
            <button onClick={() => setChar(getDefaultCharacter())} className="text-white bg-red-600 hover:bg-red-900 active:opacity-50 px-2 py-1 rounded">{t('resetButton')}</button>
            <RaceSelectorModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}

