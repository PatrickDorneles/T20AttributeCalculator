import React from 'react'

interface RaceOptionProps {
  raceId: string;
  isSelected: boolean;
  onSelect: () => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  icon: string;
  label: string;
  description?: string;
}

export const RaceOption = ({ 
  raceId, 
  isSelected, 
  onSelect, 
  onMouseEnter, 
  onMouseLeave, 
  icon, 
  label, 
  description 
}: RaceOptionProps) => (
  <div className="relative">
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onSelect}
      className={`w-full flex items-center gap-3 p-3 rounded-md transition-all border-2 ${isSelected
        ? 'bg-red-700 border-red-200 shadow-inner'
        : 'bg-red-800 border-transparent hover:bg-red-700'
        }`}
    >
      <span className="text-xl">{icon}</span>
      <div className="flex flex-col items-start">
        <span className="font-bold">{label}</span>
        {description && (
          <span className="text-[10px] opacity-60 italic">{description}</span>
        )}
      </div>
    </button>
  </div>
)
