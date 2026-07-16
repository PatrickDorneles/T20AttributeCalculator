/* eslint-disable react/display-name */
import React, { Fragment, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import type { RacialBonus } from '../types/BookResources'

type AttributeKey =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma'

export const useFormatRaceBonus = () => {
  const t = useTranslations('Main')

  const renderList = (items: ReactNode[]) =>
    items.map((item, index) => (
      <Fragment key={index}>
        {item}
        {index < items.length - 1 && ', '}
      </Fragment>
    ))

  const renderAttribute = (
    attr: AttributeKey,
    value: number,
    bold = false
  ) => (
    <span
      key={attr}
      className={`${value > 0 ? 'text-green-400' : 'text-red-400'} ${bold ? 'font-bold' : ''

        }`}
    >
      {value > 0 ? `+${value}` : value}{' '}
      {t(`calculator.attributeNames.${attr}` as any)}
    </span>
  )

  return (bonus: RacialBonus | undefined): ReactNode => {
    if (!bonus || bonus.type === 'free') {
      return <span>{t('raceSelector.noBonus')}</span>
    }

    const attrs =
      bonus.type === 'strict' || bonus.type === 'mixed'
        ? bonus.attrs
        : {}


    const entries = Object.entries(attrs) as [AttributeKey, number][]

    const positives = entries

      .filter(([, value]) => value > 0)

      .map(([attr, value]) => renderAttribute(attr, value))

    const negatives = entries
      .filter(([, value]) => value < 0)
      .map(([attr, value]) => renderAttribute(attr, value))

    if (bonus.type === 'strict') {
      if (!positives.length && !negatives.length) {
        return <span>{t('raceSelector.noBonus')}</span>
      }

      return (
        <span>
          {positives.length > 0 && (
            <>
              {t('raceSelector.gain')} {renderList(positives)}
            </>
          )}

          {negatives.length > 0 && (
            <>
              {positives.length > 0 ? (
                <>
                  <span className="ml-1">{t('raceSelector.butLose')}</span>{' '}
                </>
              ) : (
                <>
                  {t('raceSelector.lose')}{' '}
                </>
              )}

              {renderList(negatives)}
            </>
          )}
        </span>
      )
    }

    if (bonus.type === 'choice') {
      return (
        <span>
          {t('raceSelector.distributePoints', {
            points: bonus.pointsToChoose,
            max: bonus.maxPerAttribute,
          })}
        </span>
      )
    }

    if (bonus.type === 'mixed') {
      const exceptions = bonus.exceptions ?? []

      const exceptionNames = exceptions.map((attr) =>
        t(`calculator.attributeNames.${attr}` as any)
      )


      return (
        <span className="flex flex-col gap-1">
          <span>
            {positives.length > 0 && (
              <>
                {t('raceSelector.gain')} {renderList(positives)}
              </>
            )}

            {negatives.length > 0 && (
              <>
                {positives.length > 0 ? (

                  <>
                    {' '}
                    {t('raceSelector.butLose')}{' '}
                  </>
                ) : (
                  <>
                    {t('raceSelector.lose')}{' '}
                  </>
                )}

                {renderList(negatives)}
              </>
            )}
          </span>

          <span>
            {t('raceSelector.distributePoints', {
              points: bonus.pointsToChoose,
              max: bonus.maxPerAttribute,
            })}

            {exceptionNames.length > 0 &&
              ` ${t('raceSelector.except')} ${exceptionNames.join(', ')}`}
          </span>
        </span>
      )
    }

    return <span>{t('raceSelector.noBonus')}</span>
  }
}
