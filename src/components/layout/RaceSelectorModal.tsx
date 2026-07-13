import React, { useState, useMemo } from 'react'
import { Dialog } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { useAtom } from 'jotai'
import { activeCharacter } from "../../atoms/characters"
import { RacialBonusMap } from "../../resources/RacialBonusMap"
import racesData from "../../resources/races.json"
import { SortRaces } from "../../functions/SortRaces"
import type { Race } from "../../types/BookResources"

interface RaceSelectorModalProps {
    open: boolean;
    onClose: () => void;
}

export const RaceSelectorModal = ({ open, onClose }: RaceSelectorModalProps) => {
    const [char, setChar] = useAtom(activeCharacter)
    const t = useTranslations("Main")
    const [search, setSearch] = useState("")

    const groupedRaces = useMemo(() => {
        const groups: Record<string, string[]> = {}
        
        racesData?.forEach(race => {
            const source = race.source
            if (!groups[source]) groups[source] = []
            groups[source]!.push(race.id)
        })
        
        return groups
    }, [])

    const filterRace = (raceId: string) => {
        const raceName = t(`races.${raceId}` as any).toLowerCase()
        const searchLower = search.toLowerCase()
        
        if (raceName.includes(searchLower)) return true
        
        const bonus = RacialBonusMap.get(raceId)
        if (bonus && bonus.type !== 'free') {
            const bonusAttrs = (bonus as any).attrs ? Object.entries((bonus as any).attrs) : []
            const hasMatchingAttr = bonusAttrs.some(([attr, val]) => {
                const attrName = t(`calculator.attributeNames.${attr}` as any).toLowerCase()
                return attrName.includes(searchLower) && val !== 0
            })
            if (hasMatchingAttr) return true
        }
        
        return false
    }

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-lg rounded-lg p-6 bg-red-900 text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="flex items-center justify-between mb-6">
                        <Dialog.Title className="text-2xl font-bold font-display">
                            {t('raceSelector.title')}
                        </Dialog.Title>
                        <button onClick={onClose} className="text-white hover:text-red-200 transition-colors text-2xl">
                            &times;
                        </button>
                    </div>

                    <div className="mb-6">
                        <input 
                            type="text" 
                            className="w-full p-2 bg-red-800 border border-red-700 rounded text-white placeholder-red-300 outline-none focus:ring-2 focus:ring-red-500"
                            placeholder={t('raceSelector.searchPlaceholder')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
                        {Object.entries(groupedRaces).map(([source, races]) => {
                            const filteredRaces = races.filter(filterRace)
                            if (filteredRaces.length === 0) return null

                            return (
                                <div key={source} className="mb-6">
                                    <h3 className="text-xs uppercase font-bold text-red-300 mb-3 border-b border-red-700 pb-1">
                                        {source}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {filteredRaces.map(raceId => {
                                            const isSelected = char.race === raceId
                                            const bonus = RacialBonusMap.get(raceId)
                                            
                                            const getBonusTooltip = () => {
                                                if (bonus?.type === 'free') return "No fixed bonuses"
                                                if (bonus?.type === 'choice') return `${t('calculator.exportImage.pointsLabel')}: ${bonus.pointsToChoose} (max ${bonus.maxPerAttribute})`
                                                if (bonus?.type === 'mixed') {
                                                    const mixedBonus = bonus as any;
                                                    const mixedFixed = mixedBonus.attrs ? Object.entries(mixedBonus.attrs)
                                                        .filter(([_, val]: [string, any]) => val !== 0)
                                                        .map(([attr, val]: [string, any]) => `${t(`calculator.attributeNames.${attr}` as any)} ${val > 0 ? '+' : ''}${val}`)
                                                        .join(', ') : ""
                                                    return `${t('calculator.exportImage.pointsLabel')}: ${bonus.pointsToChoose} (max ${bonus.maxPerAttribute})${mixedFixed ? ' + ' + mixedFixed : ''}`
                                                }
                                                if (bonus?.type === 'strict' && (bonus as any).attrs) {
                                                    return Object.entries((bonus as any).attrs)
                                                        .filter(([_, val]: [string, any]) => val !== 0)
                                                        .map(([attr, val]: [string, any]) => `${t(`calculator.attributeNames.${attr}` as any)} ${val > 0 ? '+' : ''}${val}`)
                                                        .join(', ') || "No modifications"
                                                }
                                                return ""
                                            }

                                            return (
                                                <button
                                                    key={raceId}
                                                    onClick={() => {
                                                        setChar({ ...char, race: raceId })
                                                        onClose()
                                                    }}
                                                    className={`flex items-center gap-3 p-3 rounded-md transition-all border-2 ${
                                                        isSelected 
                                                        ? 'bg-red-700 border-red-200 shadow-inner' 
                                                        : 'bg-red-800 border-transparent hover:bg-red-700'
                                                    }`}
                                                >
                                                    <span className="text-xl">{raceId === 'Other' ? '❓' : '👤'}</span>
                                                    <div className="flex flex-col items-start">
                                                        <span className="font-bold">{t(`races.${raceId}` as any)}</span>
                                                        {raceId === 'Other' && (
                                                            <span className="text-[10px] opacity-60 italic">{t('raceSelector.otherRaceDesc')}</span>
                                                        )}
                                                    </div>
                                                    {/* Tooltip simplified as a title attribute for now, can be enhanced to a custom component */}
                                                    <div className="ml-auto group relative">
                                                        <span className="text-xs opacity-50">ℹ️</span>
                                                        <span className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-black text-white text-xs rounded shadow-lg z-50">
                                                            {getBonusTooltip()}
                                                        </span>
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
