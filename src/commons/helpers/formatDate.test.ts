import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formats a valid ISO date string', () => {
    const result = formatDate('2023-06-15', 'en-US')
    expect(result).toMatch(/2023/)
    expect(result).toMatch(/Jun|15/)
  })

  it('returns a non-empty string', () => {
    const result = formatDate('2020-01-01')
    expect(result.length).toBeGreaterThan(0)
  })
})
