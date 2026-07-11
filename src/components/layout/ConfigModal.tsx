import { Dialog } from "@headlessui/react"
import { configAtom, DEFAULT_CONFIG } from "../../atoms/config";
import { Toggle } from "../flowbite/Toggle";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

interface ConfigModalProps {
    open: boolean;
    onClose: () => void;
}

export function ConfigModal({ open, onClose }: ConfigModalProps) {
  const [config, setConfig] = useAtom(configAtom)
  
  const t = useTranslations("Config")

  const getConfigLabel = (key: string): 'configOptions.editablePoints' | 'configOptions.othersPointsSection' | 'configOptions.showQRCode' => {
    if(key === 'editablePoints') return "configOptions.editablePoints"
    if(key === 'othersPointsSection') return "configOptions.othersPointsSection"
    return "configOptions.showQRCode"
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50" >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded p-6 bg-red-800">
          <Dialog.Title className="text-white text-3xl font-sans font-bold">{t.raw("title")}</Dialog.Title>
          <Dialog.Description className="text-white font-sans">{t.raw("description")}</Dialog.Description>


          <ul className="my-4 text-white flex flex-col gap-1">
            {
              Object.entries(DEFAULT_CONFIG).map(([key, defaultValue]) => {
                const value = config[key as keyof typeof DEFAULT_CONFIG] ?? defaultValue;
                return <li key={key}>
                  <Toggle checked={value} label={t.raw(getConfigLabel(key))} onChange={(e) => {
                    setConfig({
                      ...config,
                      [key]: e.target.checked
                    })
                  }} />
                </li>
              })
            }
          </ul>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
