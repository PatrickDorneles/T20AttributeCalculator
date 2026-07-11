import { useAtom } from "jotai"
import { Fragment, useCallback, useEffect, useState, useRef } from "react"
import { activeCharacter, characters, getDefaultCharacter } from "../../atoms/characters"
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
import { SortRaces } from "../../functions/SortRaces";
import { toPng } from 'html-to-image';
import { 
    ArrowDownTrayIcon, 
    ArrowUpTrayIcon, 
    PhotoIcon,
    Cog8ToothIcon,
    UsersIcon
} from '@heroicons/react/24/solid';
import { ConfigModal } from "./ConfigModal";
import { CharacterManager } from "./CharacterManager";

export const ApplicationLayout = () => {
    const [char, setChar] = useAtom(activeCharacter)
    const [chars, setChars] = useAtom(characters)
    const raceOptions = [...RacialBonusMap.keys()]
    const [config] = useAtom(configAtom)
    
    const [totalPointsChange, setTotalPointsChange] = useState(char.points.total)
    const [isConfigOpen, setIsConfigOpen] = useState(false)
    const [isCharManagerOpen, setIsCharManagerOpen] = useState(false)
    
    const t = useTranslations("Main")
    const orderedRaceOptions = SortRaces(raceOptions, t as (key: unknown) => string)

    const captureRef = useRef<HTMLDivElement>(null);
    
    const changeTotalPoints = useCallback((newTotal?: number) => {
        setChar({
            ...getDefaultCharacter(),
            points: {
                total: newTotal ?? totalPointsChange,
                left: newTotal ?? totalPointsChange
            }
        })
    }, [totalPointsChange, setChar])

    const exportToJson = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(char, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `character_${char.name || 'export'}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    const importFromJson = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                setChar(json);
                
                // Add to character list if it doesn't exist
                setChars(prev => {
                    const exists = prev.find(c => c.id === json.id);
                    if (exists) {
                        return prev.map(c => c.id === json.id ? json : c);
                    }
                    return [...prev, json];
                });
            } catch (err) {
                alert("Invalid JSON file");
            }
        };
        reader.readAsText(file);
    }

    const exportToImage = async () => {
        if (!captureRef.current) return;
        try {
            const dataUrl = await toPng(captureRef.current, { 
                cacheBust: true,
                backgroundColor: '#4b0e0e'
            });
            const link = document.createElement('a');
            link.download = `character_${char.name || 'export'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("Export to image failed", err);
        }
    }

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

    useEffect(() => {
        // Auto-save active character to the characters list
        setChars(prev => {
            const index = prev.findIndex(c => c.id === char.id);
            if (index !== -1) {
                const next = [...prev];
                next[index] = char;
                return next;
            } else {
                return [...prev, char];
            }
        });
    }, [char, setChars])
    
    return <div className="min-h-screen w-full flex flex-col justify-center items-center gap-6 bg-[#4b0e0e] bg-hero-topography py-16">
        <div className="absolute rounded-full left-4 top-4 flex flex-col items-center gap-2">
            <button onClick={() => setIsCharManagerOpen(true)} className="text-white transition hover:rotate-180 active:opacity-50" title={t('manageCharacters')}>
                <UsersIcon className="w-8" />
            </button>
        </div>
        <div className="absolute rounded-full right-4 top-4 flex flex-col items-center gap-2">
            <button onClick={() => setIsConfigOpen(true)} className="text-white transition hover:rotate-180 active:opacity-50">
                <Cog8ToothIcon className="w-8" />
            </button>
            <div className="flex flex-col gap-2 items-center">
                <div className="group relative flex items-center justify-center">
                    <button onClick={exportToJson} className="text-white hover:text-red-200 transition-colors">
                        <ArrowUpTrayIcon className="w-6 h-6" />
                    </button>
                    <span className="absolute right-full mr-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {t('exportJson')}
                    </span>
                </div>
                <div className="group relative flex items-center justify-center">
                    <label className="text-white hover:text-red-200 transition-colors cursor-pointer">
                        <ArrowDownTrayIcon className="w-6 h-6" />
                        <input type="file" accept=".json" className="hidden" onChange={importFromJson} />
                    </label>
                    <span className="absolute right-full mr-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {t('importJson')}
                    </span>
                </div>
                <div className="group relative flex items-center justify-center">
                    <button onClick={exportToImage} className="text-white hover:text-red-200 transition-colors">
                        <PhotoIcon className="w-6 h-6" />
                    </button>
                    <span className="absolute right-full mr-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {t('exportImage')}
                    </span>
                </div>
            </div>
        </div>
        <ConfigModal open={isConfigOpen} onClose={() => setIsConfigOpen(false)} />
        <CharacterManager open={isCharManagerOpen} onClose={() => setIsCharManagerOpen(false)} />
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
        
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
            <div ref={captureRef} className="p-12 bg-[#4b0e0e] bg-hero-topography flex flex-col items-center gap-6 text-white">
                <div className="flex flex-col items-center gap-2 mb-4">
                    <h2 className="text-4xl font-bold font-display">{char.name || 'Character'}</h2>
                    <p className="text-xl">Race: {t(`races.${char.race}`)}</p>
                    <p className="text-lg">Points: {char.points.left} / {char.points.total}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
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
            </div>
        </div>
    </div>
}
