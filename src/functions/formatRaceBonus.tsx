/* eslint-disable react/display-name */
import React, { ReactNode } from 'react'
import { RacialBonus } from "../types/BookResources"
import { useTranslations } from 'next-intl'

type AttributeKey = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'

// eslint-disable-next-line react/display-name
export const useFormatRaceBonus = () => {
    const t = useTranslations("Main")

    return (bonus: RacialBonus | undefined) => {
        if (!bonus || bonus.type === 'free') return <span>{t('raceSelector.noBonus')}</span>
        
        const attrs = (bonus.type === 'strict' || bonus.type === 'mixed') ? bonus.attrs : {}
        const entries = Object.entries(attrs) as [AttributeKey, number][]
        
        const positives = entries.filter(([ , val]) => val > 0)
            .map(([attr, val]) => (
                <span key={attr} className="text-green-400">
                    <span className="font-bold">+{val}</span> {t(`calculator.attributeNames.${attr}` as any)}
                </span>
            ))
        const negatives = entries.filter(([ , val]) => val < 0)
            .map(([attr, val]) => (
                <span key={attr} className="text-red-400">
                    <span className="font-bold">{val}</span> {t(`calculator.attributeNames.${attr}` as any)}
                </span>
            ))
        
        const renderList = (list: ReactNode[]) => 
            list.map((item, i) => (
                <React.Fragment key={i}>
                    {item}{i < list.length - 1 && ', '}
                </React.Fragment>
            ))

        if (bonus.type === 'strict') {
            let content: React.ReactNode = null
            if (positives.length > 0) {
                content = (
                    <span>
                        {t('raceSelector.gain')} {renderList(positives)}
                    </span>
                )
            }
            if (negatives.length > 0) {
                if (positives.length > 0) {
                    content = (
                        <span>
                            {t('raceSelector.gain')} {renderList(positives)}
                            <span className="ml-1">{t('raceSelector.lose')}</span> {renderList(negatives)}
                        </span>
                    )
                } else {
                    content = (
                        <span>
                            {t('raceSelector.lose')} {renderList(negatives)}
                        </span>
                    )
                }
            }
            return content || <span>{t('raceSelector.noBonus')}</span>
        }

        if (bonus.type === 'choice' || bonus.type === 'mixed') {
            const distributeText = t('raceSelector.distributePoints', { 
                points: bonus.pointsToChoose, 
                max: bonus.maxPerAttribute 
            })
            
            let content: React.ReactNode = <span>{distributeText}</span>

            if (bonus.type === 'mixed') {
                const exceptions = entries.filter(([_, val]) => val !== 0)
                    .map(([attr, val]) => (
                        <span key={attr}>
                            {t(`calculator.attributeNames.${attr}` as any)} (<span className={val > 0 ? 'text-green-400' : 'text-red-400'}>{val > 0 ? `+${val}` : val}</span>)
                        </span>
                    ))
                
                if (exceptions.length > 0) {
                    content = (
                        <span>
                            {distributeText}, <span className="opacity-80">{t('raceSelector.except')} {renderList(exceptions)}</span>
                        </span>
                    )
                }
            }
            
            return content
        }
        
        return <span>{t('raceSelector.noBonus')}</span>
    }
}
