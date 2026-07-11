import React from 'react'
import { useTranslations } from 'next-intl'
import { AttributeGroup } from "../AttributeSection"
import type { Character } from "../../types/Character";
import { Logo } from "../svg/Logo"

interface ExportImageProps {
  char: Character;
  configOthersPointsSection: boolean;
  captureRef: React.RefObject<HTMLDivElement>;
}

export const ExportImage = ({ char, configOthersPointsSection, captureRef }: ExportImageProps) => {
  const t = useTranslations("Main")

    return (
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <div ref={captureRef} className="p-12 bg-[#4b0e0e] bg-hero-topography flex flex-col items-center gap-6 text-white">
          <Logo className="h-24 w-24" />
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
              <span className={configOthersPointsSection ? '' : 'hidden'}>{t("calculator.heading.other")}</span>
              <span>{t("calculator.heading.total")}</span>
            </header>
            <AttributeGroup name="strength" hideControls />
            <AttributeGroup name="dexterity" hideControls />
            <AttributeGroup name="constitution" hideControls />
            <AttributeGroup name="intelligence" hideControls />
            <AttributeGroup name="wisdom" hideControls />
            <AttributeGroup name="charisma" hideControls />
          </div>
        </div>
      </div>
    )

}
