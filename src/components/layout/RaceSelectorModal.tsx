import React, { useState, useMemo } from 'react'
import { Dialog } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { useAtom } from 'jotai'
import { activeCharacter } from "../../atoms/characters"
import { RacialBonusMap } from "../../resources/RacialBonusMap"
import racesData from "../../resources/races.json"
import type { RacialBonus } from "../../types/BookResources"
import { useFormatRaceBonus } from "../../functions/formatRaceBonus"

interface RaceSelectorModalProps {
  open: boolean;
  onClose: () => void;
}

type AttributeKey = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'

export const RaceSelectorModal = ({ open, onClose }: RaceSelectorModalProps) => {
  const [char, setChar] = useAtom(activeCharacter)
  const t = useTranslations("Main")
  const [search, setSearch] = useState("")
  const [hoveredRace, setHoveredRace] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ top: number, left: number } | null>(null)
  const formattedBonusNatural = useFormatRaceBonus()

  const groupedRaces = useMemo(() => {
    const groups: Record<string, string[]> = {}

    racesData?.forEach(race => {
      if (race.id === 'Other') return
      const source = race.source
      if (!groups[source]) groups[source] = []
      groups[source]!.push(race.id)
    })

    return groups
  }, [])

  const filterRace = (raceId: string) => {
    const raceName = t(`races.${raceId}` as any).toLowerCase()
    const bonus = RacialBonusMap.get(raceId)

    const getBonusText = (b: RacialBonus | undefined) => {
      if (!b || b.type === 'free') return t('raceSelector.noBonus')
      const a = (b.type === 'strict' || b.type === 'mixed') ? b.attrs : {}
      const e = Object.entries(a) as [AttributeKey, number][]
      const p = e.filter(([, v]) => v > 0).map(([at, v]) => `+${v} ${t(`calculator.attributeNames.${at}` as any)}`)
      const n = e.filter(([, v]) => v < 0).map(([at, v]) => `${v} ${t(`calculator.attributeNames.${at}` as any)}`)
      if (b.type === 'strict') {
        let txt = ""
        if (p.length > 0) txt += `${t('raceSelector.gain')} ${p.join(', ')}`
        if (n.length > 0) txt += (p.length > 0 ? ` ${t('raceSelector.lose')} ` : `${t('raceSelector.gain')} `) + n.join(', ')
        return txt || t('raceSelector.noBonus')
      }
      if (b.type === 'choice' || b.type === 'mixed') {
        const d = t('raceSelector.distributePoints', { points: b.pointsToChoose, max: b.maxPerAttribute })
        if (b.type === 'mixed') {
          const ex = e.filter(([_, v]) => v !== 0).map(([at, v]) => `${t(`calculator.attributeNames.${at}` as any)} (${v > 0 ? `+${v}` : v})`)
          if (ex.length > 0) return `${d}, ${t('raceSelector.except')} ${ex.join(', ')}`
        }
        return d
      }
      return t('raceSelector.noBonus')
    }

    const bonusText = getBonusText(bonus).toLowerCase()
    const searchLower = search.toLowerCase()

    return raceName.includes(searchLower) || bonusText.includes(searchLower)
  }

  const handleMouseEnter = (e: React.MouseEvent, raceId: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoveredRace(raceId)
    setTooltipPos({
      top: rect.top,
      left: rect.left + rect.width / 2
    })
  }

  const handleMouseLeave = () => {
    setHoveredRace(null)
    setTooltipPos(null)
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

                      return (
                        <div key={raceId} className="relative">
                          <button
                            onMouseEnter={(e) => handleMouseEnter(e, raceId)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => {
                              setChar({ ...char, race: raceId })
                              onClose()
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-md transition-all border-2 ${isSelected
                              ? 'bg-red-700 border-red-200 shadow-inner'
                              : 'bg-red-800 border-transparent hover:bg-red-700'
                              }`}
                          >
                            <span className="text-xl">
                              {racesData.find(r => r.id === raceId)?.icon || '👤'}
                            </span>
                            <div className="flex flex-col items-start">
                              <span className="font-bold">{t(`races.${raceId}` as any)}</span>
                              {raceId === 'Other' && (
                                <span className="text-[10px] opacity-60 italic">{t('raceSelector.otherRaceDesc')}</span>
                              )}
                            </div>
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {filterRace('Other') && (
              <div className="mt-6 pt-6 border-t border-red-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(function() {
                    const raceId = 'Other'
                    const isSelected = char.race === raceId
                    return (
                      <div className="relative">
                        <button
                          onMouseEnter={(e) => handleMouseEnter(e, raceId)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => {
                            setChar({ ...char, race: raceId })
                            onClose()
                          }}
                          className={`w-full flex items-center gap-3 p-3 rounded-md transition-all border-2 ${isSelected
                            ? 'bg-red-700 border-red-200 shadow-inner'
                            : 'bg-red-800 border-transparent hover:bg-red-700'
                            }`}
                        >
                          <span className="text-xl">
                            {racesData.find(r => r.id === raceId)?.icon || '❓'}
                          </span>
                          <div className="flex flex-col items-start">
                            <span className="font-bold">{t(`races.${raceId}` as any)}</span>
                            <span className="text-[10px] opacity-60 italic">{t('raceSelector.otherRaceDesc')}</span>
                          </div>
                        </button>
                      </div>
                    )
                  })()}
                </div>
              </div>
            )}
          </div>

          {tooltipPos && hoveredRace && (
            <div
              className="fixed z-[100] pointer-events-none w-64 p-3 bg-zinc-900/95 border border-zinc-700 text-white text-xs rounded-lg shadow-xl text-center transition-opacity"
              style={{
                top: tooltipPos.top,
                left: tooltipPos.left,
                transform: 'translate(-50%, -110%)'
              }}
            >
              {formattedBonusNatural(RacialBonusMap.get(hoveredRace))}
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
