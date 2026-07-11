import React from 'react'
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  Cog8ToothIcon,
  UsersIcon
} from '@heroicons/react/24/solid';
import { useTranslations } from 'next-intl'

interface ApplicationActionsProps {
  onOpenCharManager: () => void;
  onOpenConfig: () => void;
  onExportJson: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ApplicationActions = ({
  onOpenCharManager,
  onOpenConfig,
  onExportJson,
  onImportJson,
}: ApplicationActionsProps) => {
  const t = useTranslations("Main")

  return (
    <>
      <div className="absolute rounded-full left-4 top-4 flex flex-col items-center gap-2">
        <div className="group relative flex items-center justify-center">
          <button onClick={onOpenCharManager} className="text-white transition-transform hover:scale-110 active:opacity-50">
            <UsersIcon className="w-10" />
          </button>
          <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {t('manageCharacters')}
          </span>
        </div>
      </div>
      <div className="absolute rounded-full right-4 top-4 flex flex-col items-center gap-2">
        <div className="group relative flex items-center justify-center">
          <button onClick={onOpenConfig} className="text-white transition-transform hover:scale-110 active:opacity-50">
            <Cog8ToothIcon className="w-8" />
          </button>
          <span className="absolute right-full mr-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {t('configSettings')}
          </span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="group relative flex items-center justify-center">
            <button onClick={onExportJson} className="text-white hover:text-red-200 transition-transform hover:scale-110 active:opacity-50">
              <ArrowUpTrayIcon className="w-6 h-6" />
            </button>
            <span className="absolute right-full mr-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {t('exportJson')}
            </span>
          </div>
          <div className="group relative flex items-center justify-center">
            <label className="text-white hover:text-red-200 transition-transform hover:scale-110 active:opacity-50 cursor-pointer">
              <ArrowDownTrayIcon className="w-6 h-6" />
              <input type="file" accept=".json" className="hidden" onChange={onImportJson} />
            </label>
            <span className="absolute right-full mr-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {t('importJson')}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
