import React from 'react'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { GlobeAltIcon } from '@heroicons/react/24/solid'

export const LanguageSwitcher = () => {
  const router = useRouter()
  const t = useTranslations("Main")
  const { locale } = router

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'pt-BR' : 'en'
    router.push(router.asPath, router.asPath, { locale: nextLocale })
  }

  return (
    <div className="group relative flex items-center justify-center">
      <button 
        onClick={toggleLanguage} 
        className="text-white transition-transform hover:scale-110 active:opacity-50"
        title={t('languageSwitcher')}
      >
        <GlobeAltIcon className="w-6 h-6" />
      </button>
      <span className="absolute right-full mr-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {t('languageSwitcher')} ({locale === 'en' ? 'EN' : 'PT'})
      </span>
    </div>
  )
}
