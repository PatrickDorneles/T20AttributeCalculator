import React from 'react'
import { useTranslations } from 'next-intl'
import { AttributeGroup } from "../AttributeSection"
import { CameraIcon } from '@heroicons/react/24/solid'

interface CalculatorViewProps {
  othersPointsSection: boolean;
  onExportImage: () => void;
}

export const CalculatorView = ({ othersPointsSection, onExportImage }: CalculatorViewProps) => {
  const t = useTranslations("Main")

  return (
    <div className="flex flex-col items-center gap-2 ">
      <header className="flex text-white w-full justify-between px-1 font-bold">
        <span>{t("calculator.heading.name")}</span>
        <span>{t("calculator.heading.base")}</span>
        <span>{t("calculator.heading.racial")}</span>
        <span className={othersPointsSection ? '' : 'hidden'}>{t("calculator.heading.other")}</span>
        <span>{t("calculator.heading.total")}</span>
      </header>
      <AttributeGroup name="strength" />
      <AttributeGroup name="dexterity" />
      <AttributeGroup name="constitution" />
      <AttributeGroup name="intelligence" />
      <AttributeGroup name="wisdom" />
      <AttributeGroup name="charisma" />
      <div className="mt-4 group relative flex items-center justify-center">
        <button 
          onClick={onExportImage} 
          className="text-white bg-red-600 p-3 rounded-full transition-transform hover:scale-110 active:opacity-50 shadow-lg hover:bg-red-700"
        >
          <CameraIcon className="w-8 h-8" />
        </button>
        <span className="absolute bottom-full mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {t('exportImage')}
        </span>
      </div>
    </div>
  )
}
