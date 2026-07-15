import React, { useState } from 'react'
import { useAtom } from "jotai"
import { RacialBonusMap } from "../../resources/RacialBonusMap";
import { useTranslations } from 'next-intl'
import { activeCharacter, getDefaultCharacter } from "../../atoms/characters"
import { RaceSelectorModal } from "../layout/RaceSelectorModal";
import { useFormatRaceBonus } from "../../functions/formatRaceBonus";

export const CharacterInfo = () => {
    const [char, setChar] = useAtom(activeCharacter)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const t = useTranslations("Main")
    const formatRaceBonus = useFormatRaceBonus()
    
    const raceDisplayName = char.race === 'Other' ? (char.customRaceName || t('races.Other' as any)) : t(`races.${char.race}` as any)
    const raceBonus = RacialBonusMap.get(char.race)

    return (
        <section title="Character Info" className="relative flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex flex-col gap-2 items-start sm:items-center">
                <div className="flex gap-2 items-center">
                    <button 
                        onClick={() => setIsModalOpen(true)} 
                        className="text-white bg-red-600 hover:bg-red-900 active:opacity-50 px-2 py-1 rounded w-36"
                    >
                        {t('raceSelector.button', { race: raceDisplayName })}
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
                
                <div className="sm:hidden w-full bg-red-900/80 border border-red-700 p-3 rounded-lg text-xs shadow-lg">
                    <h4 className="font-bold mb-1 text-red-200 uppercase text-xs tracking-wider">
                        {t('raceSelector.racialBonusesHeader', { race: raceDisplayName })}
                    </h4>
                    <div className="text-zinc-300">
                        {formatRaceBonus(raceBonus)}
                    </div>
                </div>
            </div>
            <button onClick={() => setChar(getDefaultCharacter())} className="text-white bg-red-600 hover:bg-red-900 active:opacity-50 px-2 py-1 rounded">{t('resetButton')}</button>
            
            <div className="hidden sm:block absolute -right-64 top-0 w-56 bg-red-900/80 border border-red-700 p-3 rounded-lg text-xs shadow-xl">
                <h4 className="font-bold mb-1 text-red-200 uppercase text-xs tracking-wider">
                    {t('raceSelector.racialBonusesHeader', { race: raceDisplayName })}
                </h4>
                <div className="text-zinc-300">
                    {formatRaceBonus(raceBonus)}
                </div>
            </div>

            <RaceSelectorModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}

