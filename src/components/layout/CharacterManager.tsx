import { Dialog } from "@headlessui/react"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { characters, activeCharacter, getDefaultCharacter } from "../../atoms/characters"
import { TrashIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/solid"
import type { Character } from "../../types/Character"

interface CharacterManagerProps {
    open: boolean;
    onClose: () => void;
}

export function CharacterManager({ open, onClose }: CharacterManagerProps) {
    const [chars, setChars] = useAtom(characters)
    const [active, setActive] = useAtom(activeCharacter)
    const t = useTranslations("Main")

    const handleCreate = () => {
        const newChar = getDefaultCharacter()
        setActive(newChar)
        setChars([...chars, newChar])
        onClose()
    }

    const handleDelete = (id: string) => {
        const filtered = chars.filter(c => c.id !== id)
        setChars(filtered)
        if (active.id === id) {
            setActive(getDefaultCharacter())
        }
    }

    const handleSelect = (char: Character) => {
        setActive(char)
        onClose()
    }

    const handleRename = (id: string, newName: string) => {
        setChars(chars.map(c => c.id === id ? { ...c, name: newName } : c))
        if (active.id === id) {
            setActive({ ...active, name: newName })
        }
    }

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md rounded p-6 bg-red-800 text-white">
                    <Dialog.Title className="text-3xl font-sans font-bold mb-4">{t('manageCharacters')}</Dialog.Title>
                    
                    <div className="flex justify-end mb-4">
                        <button 
                            onClick={handleCreate}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors"
                        >
                            <PlusIcon className="w-5 h-5" />
                            {t('newCharacter')}
                        </button>
                    </div>

                    <ul className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-2">
                        {chars.length === 0 && (
                            <li className="text-center opacity-50 py-4">No characters saved.</li>
                        )}
                        {chars.map(char => (
                            <li key={char.id} className={`flex items-center justify-between p-3 rounded border ${active.id === char.id ? 'border-white bg-red-700' : 'border-red-600 bg-red-900'}`}>
                                <div className="flex items-center gap-3 flex-1">
                                    <button 
                                        onClick={() => handleSelect(char)}
                                        className="font-bold hover:underline truncate flex-1 text-left"
                                    >
                                        {char.name || t('characterNamePlaceholder')}
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => {
                                            const newName = prompt("Enter new name:", char.name);
                                            if (newName !== null) handleRename(char.id, newName);
                                        }}
                                        className="p-1 hover:bg-red-600 rounded transition-colors"
                                        title="Rename"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(char.id)}
                                        className="p-1 hover:bg-red-600 rounded transition-colors text-red-300 hover:text-white"
                                        title={t('deleteCharacter')}
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
