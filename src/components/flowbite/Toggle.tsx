import type { ChangeEvent } from "react"

type Props = {
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
}

export function Toggle({ label, checked, onChange }: Props) {

  return <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" className="sr-only peer" checked={checked} onChange={onChange} />
    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
  </label>
}
