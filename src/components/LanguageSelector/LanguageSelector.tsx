import * as React from 'react'
import './LanguageSelector.css'
import { useResource } from '../../../presentation/hooks/useResource'
import { useOutsideClick } from '../../../presentation/hooks/useOutsideClick'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons'
import { useAccountManager } from '../../../main/hooks/useAccountManager'

export interface LanguageSelectorProps {
  username: string
  doLogout: () => void
}

export const LanguageSelector = (): JSX.Element => {
  const { languageCodes, languages, selectedLanguage } = useResource()
  const [isLanguageSelectorOpen, setLanguageSelectorOpen] = useState(false)
  const accountService = useAccountManager().accountService
  const selectorRef = useOutsideClick(() => setLanguageSelectorOpen(false), ['navbar-language'])

  const changeCurrentLanguage = async (lang: string): Promise<void> => {
    await accountService.changeUserLanguage(lang, accountService.getLoggedUserId())
    window.location.reload()
  }

  return (
    <>
      <button id='navbar-language' className={'fs-navbar-language fs-navbar-item'} title={languages[selectedLanguage]?.displayText || ''}
        onClick={() => setLanguageSelectorOpen(!isLanguageSelectorOpen)} >
        <span style={{ height: 'fit' }} className="me-1"><FontAwesomeIcon icon={faEarthAmericas}/></span>
        <span>{languages[selectedLanguage].culture}</span>
      </button>

      <div ref={selectorRef} className={`fs-language-selector ${isLanguageSelectorOpen ? 'fs-language-selector-open' : ''}`}>
        {languageCodes.map(lang =>
          (
          <div key={lang} className={`fs-language-item ${selectedLanguage === lang ? 'fs-language-item-selected' : ''}`}
            onClick={async () => await changeCurrentLanguage(lang)}>
            <span>{languages[lang].displayText}</span>
          </div>
          )
        )}
      </div>
    </>
  )
}