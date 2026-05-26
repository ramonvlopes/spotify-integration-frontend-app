import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SearchIcon } from '@/commons/icons'
import { Input } from '@/components/Input'
import { useSearchContext } from '@/context/SearchContext'
import { SEARCH_ACTIONS } from '@/context/SearchContext'
import { useDebounce } from '@/hooks/useDebounce'
import type { SearchBarProps, SearchType } from './SearchBar.types'

export function SearchBar({ placeholder }: SearchBarProps) {
  const { t } = useTranslation('artists')
  const { state, dispatch } = useSearchContext()
  const [inputValue, setInputValue] = useState(state.query)
  const debouncedValue = useDebounce(inputValue, 500)

  useEffect(() => {
    dispatch({ type: SEARCH_ACTIONS.SET_QUERY, payload: debouncedValue })
  }, [debouncedValue, dispatch])

  const handleTypeChange = (type: SearchType) => {
    setInputValue('')
    dispatch({ type: SEARCH_ACTIONS.SET_SEARCH_TYPE, payload: type })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex p-1 gap-1 bg-white/[0.04] border border-white/[0.07] rounded-2xl w-fit">
        {(['artist', 'album'] as SearchType[]).map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              state.searchType === type
                ? 'bg-primary text-black shadow-glow-green-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {type === 'artist' ? t('searchByName') : t('searchByAlbum')}
          </button>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={
          placeholder ?? (state.searchType === 'artist' ? t('searchByName') : t('searchByAlbum'))
        }
        leftIcon={<SearchIcon />}
      />
    </div>
  )
}
