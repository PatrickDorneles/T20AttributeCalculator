import { useAtom } from "jotai"
import { useCallback, useEffect, useState, useRef } from "react"
import { activeCharacter, characters, getDefaultCharacter } from "../../atoms/characters"
import type { ValidBaseAttribute } from "../../functions/AttributeCalculator";
import { getAttributeCost } from "../../functions/AttributeCalculator"
import { Logo } from "../svg/Logo"
import NoSsr from "../NoSsr";
import { useTranslations } from 'next-intl'
import { RacialBonusMap } from "../../resources/RacialBonusMap";
import { configAtom } from "../../atoms/config";

import { toPng } from 'html-to-image';
import { ConfigModal } from "./ConfigModal";
import { CharacterManager } from "./CharacterManager";
import { ApplicationActions } from "./ApplicationActions";
import { CharacterInfo } from "../calculator/CharacterInfo";
import { PointsManager } from "../calculator/PointsManager";
import { CalculatorView } from "../calculator/CalculatorView";
import { ExportImage } from "../calculator/ExportImage";


export const ApplicationLayout = () => {
  const [char, setChar] = useAtom(activeCharacter)
  const [, setChars] = useAtom(characters)
  const [config] = useAtom(configAtom)

  const [totalPointsChange, setTotalPointsChange] = useState(char.points.total)
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [isCharManagerOpen, setIsCharManagerOpen] = useState(false)

  const t = useTranslations("Main")

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
        <ApplicationActions 
          onOpenCharManager={() => setIsCharManagerOpen(true)} 
          onOpenConfig={() => setIsConfigOpen(true)} 
          onExportJson={exportToJson} 
          onImportJson={importFromJson} 
        />
        <ConfigModal open={isConfigOpen} onClose={() => setIsConfigOpen(false)} />

    <CharacterManager open={isCharManagerOpen} onClose={() => setIsCharManagerOpen(false)} />
    <Logo className="h-24 w-24" />
    <div className="flex flex-col items-center justify-center px-4">
      <h1 className="text-white text-4xl font-bold font-display text-center">T20AC</h1>
      <pre className="text-white font-normal whitespace-pre-line text-center">{t('subheading')}</pre>
    </div>
    <NoSsr>
      <CharacterInfo />
      <PointsManager 
        configEditablePoints={config.editablePoints}
        totalPointsChange={totalPointsChange}
        setTotalPointsChange={setTotalPointsChange}
        changeTotalPoints={changeTotalPoints}
        pointsLeft={char.points.left}
      />
      <CalculatorView 
        othersPointsSection={config.othersPointsSection} 
        onExportImage={exportToImage}
      />
      <ExportImage 
        char={char} 
        configOthersPointsSection={config.othersPointsSection} 
        showQRCode={config.showQRCode}
        captureRef={captureRef} 
      />
    </NoSsr>

  </div>
}
