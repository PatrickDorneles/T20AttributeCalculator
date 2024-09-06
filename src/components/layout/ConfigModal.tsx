import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { Dialog } from "@headlessui/react"
import { useState } from "react";
import { configAtom } from "../../atoms/config";
import { Toggle } from "../flowbite/Toggle";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

export function ConfigModal() {
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useAtom(configAtom)

  const t = useTranslations("Config")

  const getConfigLabel = (key: string): 'configOptions.editablePoints' | 'configOptions.othersPointsSection' => {
    if(key === 'editablePoints') return "configOptions.editablePoints"
    return "configOptions.othersPointsSection"
  }

  return <>
    <button className="absolute rounded-full right-4 top-4" onClick={() => setOpen(true)}>
      <Cog8ToothIcon className="w-8 text-white transition hover:rotate-180 active:opacity-50" />
    </button>

    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50" >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded p-6 bg-red-800">
          <Dialog.Title className="text-white text-3xl font-sans font-bold">{t.raw("title")}</Dialog.Title>
          <Dialog.Description className="text-white font-sans">{t.raw("description")}</Dialog.Description>

          <ul className="my-4 text-white flex flex-col gap-1">
            {
              Object.entries(config).map(([key, value]) => {
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
  </>

}
