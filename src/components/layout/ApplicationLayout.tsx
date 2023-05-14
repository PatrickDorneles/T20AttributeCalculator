import { useAtom } from "jotai"
import { Fragment, useCallback, useEffect, useState } from "react"
import { activeCharacter, getDefaultCharacter } from "../../atoms/characters"
import type { ValidBaseAttribute } from "../../functions/AttributeCalculator";
import { getAttributeCost } from "../../functions/AttributeCalculator"
import { AttributeGroup } from "../AttributeSection"
import { Logo } from "../svg/Logo"
import { Listbox } from '@headlessui/react'
import { RacialBonusMap } from "../../resources/RacialBonusMap";
import NoSsr from "../NoSsr";
import { useTranslations } from 'next-intl'
import type { Race } from "../../types/BookResources";
import { configAtom } from "../../atoms/config";

export const ApplicationLayout = () => {
    const [char, setChar] = useAtom(activeCharacter)
    const raceOptions = [...RacialBonusMap.keys()]
    const [config] = useAtom(configAtom)

    const [totalPointsChange, setTotalPointsChange] = useState(char.points.total)

    const t = useTranslations("Main")

    const changeTotalPoints = useCallback((newTotal?: number) => {
        setChar({
            ...getDefaultCharacter(),
            points: {
                total: newTotal ?? totalPointsChange,
                left: newTotal ?? totalPointsChange
            }
        })
    }, [totalPointsChange, setChar])

    useEffect(() => {
        if (char.race && RacialBonusMap.get(char.race)?.type === 'choice') {
            setChar((char) => ({
                ...char,
                attrs: {
                    strength: { ...char.attrs.strength, race: 0 },
                    dexterity: { ...char.attrs.dexterity, race: 0 },
                    constitution: { ...char.attrs.constitution, race: 0 },
                    intelligence: { ...char.attrs.intelligence, race: 0 },
                    wisdom: { ...char.attrs.wisdom, race: 0 },
                    charisma: { ...char.attrs.charisma, race: 0 },
                }
            }))
        }
    }, [char.race, setChar])

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
    }, [char.attrs, setChar])

    useEffect(() => {
        if (
            !config.editablePoints &&
            getDefaultCharacter().points.total !== char.points.total
        ) {
            changeTotalPoints(getDefaultCharacter().points.total)
        }
    }, [config, char, changeTotalPoints])


    return <div className="min-h-screen w-full flex flex-col justify-center items-center gap-6 bg-[#4b0e0e] bg-hero-topography py-16">
        <Logo className="h-24 w-24" />
        <div className="flex flex-col items-center justify-center px-4">
            <h1 className="text-white text-4xl font-bold font-display text-center">T20AC</h1>
            <pre className="text-white font-normal whitespace-pre-line text-center">{t('subheading')}</pre>
        </div>
        <NoSsr>
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
                        {raceOptions.map((race) => (
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

            <label className={`text-white flex gap-2 items-center ${!config.editablePoints && 'hidden'}`} >
                {t('maxPoints')}
                <input className="bg-red-500 focus:bg-red-500 rounded-md w-16 text-white outline-white text-center" type="number" value={totalPointsChange} onChange={(e) => setTotalPointsChange(parseInt(e.target.value))} />
                <button className="text-white bg-red-600 hover:bg-red-900 active:opacity-50 px-2 py-1 rounded" onClick={() => changeTotalPoints()}>{t.raw("changePointsButton")}</button>
            </label>
            <label className="text-white flex gap-2">
                {t('pointsLeft')}
                <input className="bg-red-600 rounded-md w-16 text-white outline-white text-center opacity-100 disabled:text-white" type="number" value={char.points.left} disabled />
            </label>
            <div className="flex flex-col items-center gap-2 ">
                <header className="flex text-white w-full justify-between px-1 font-bold">
                    <span>{t("calculator.heading.name")}</span>
                    <span>{t("calculator.heading.base")}</span>
                    <span>{t("calculator.heading.racial")}</span>
                    <span className={config.othersPointsSection ? '' : 'hidden'}>{t("calculator.heading.other")}</span>
                    <span>{t("calculator.heading.total")}</span>
                </header>
                <AttributeGroup name="strength" />
                <AttributeGroup name="dexterity" />
                <AttributeGroup name="constitution" />
                <AttributeGroup name="intelligence" />
                <AttributeGroup name="wisdom" />
                <AttributeGroup name="charisma" />
            </div>
        </NoSsr>
    </div>

}

