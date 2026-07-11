import React from 'react'
import { useTranslations } from 'next-intl'

interface PointsManagerProps {
  configEditablePoints: boolean;
  totalPointsChange: number;
  setTotalPointsChange: (val: number) => void;
  changeTotalPoints: () => void;
  pointsLeft: number;
}

export const PointsManager = ({
  configEditablePoints,
  totalPointsChange,
  setTotalPointsChange,
  changeTotalPoints,
  pointsLeft,
}: PointsManagerProps) => {
  const t = useTranslations("Main")

  return (
    <>
      <label className={`text-white flex gap-2 items-center ${!configEditablePoints && 'hidden'}`} >
        {t('maxPoints')}
        <input 
          className="bg-red-500 focus:bg-red-500 rounded-md w-16 text-white outline-white text-center" 
          type="number" 
          value={totalPointsChange} 
          onChange={(e) => setTotalPointsChange(parseInt(e.target.value))} 
        />
        <button className="text-white bg-red-600 hover:bg-red-900 active:opacity-50 px-2 py-1 rounded" onClick={changeTotalPoints}>
          {t.raw("changePointsButton")}
        </button>
      </label>
      <label className="text-white flex gap-2">
        {t('pointsLeft')}
        <input 
          className="bg-red-600 rounded-md w-16 text-white outline-white text-center opacity-100 disabled:text-white" 
          type="number" 
          value={pointsLeft} 
          disabled 
        />
      </label>
    </>
  )
}
