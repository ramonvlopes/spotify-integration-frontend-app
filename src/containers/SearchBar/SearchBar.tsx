import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SearchIcon } from '@/commons/icons'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
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
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Button
          variant={state.searchType === 'artist' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => handleTypeChange('artist')}
        >
          {t('searchByName')}
        </Button>
        <Button
          variant={state.searchType === 'album' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => handleTypeChange('album')}
        >
          {t('searchByAlbum')}
        </Button>
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
