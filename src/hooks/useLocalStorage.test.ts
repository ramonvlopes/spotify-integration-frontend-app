import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns initial value when key does not exist', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('stores and retrieves a value', () => {
    const { result } = renderHook(() => useLocalStorage<string[]>('test-arr', []))
    act(() => {
      result.current[1](['a', 'b'])
    })
    expect(result.current[0]).toEqual(['a', 'b'])
    expect(JSON.parse(localStorage.getItem('test-arr')!)).toEqual(['a', 'b'])
  })

  it('returns initial value when stored JSON is invalid', () => {
    localStorage.setItem('bad-key', '{invalid json')
    const { result } = renderHook(() => useLocalStorage('bad-key', 42))
    expect(result.current[0]).toBe(42)
  })
})
