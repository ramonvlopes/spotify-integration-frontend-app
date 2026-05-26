import { formatFollowers } from './formatFollowers'

describe('formatFollowers', () => {
  it('formats millions', () => {
    expect(formatFollowers(1234567)).toBe('1.2M')
  })

  it('formats thousands', () => {
    expect(formatFollowers(12345)).toBe('12.3K')
  })

  it('returns raw number when under 1000', () => {
    expect(formatFollowers(999)).toBe('999')
  })

  it('formats exactly 1 million', () => {
    expect(formatFollowers(1000000)).toBe('1.0M')
  })

  it('formats exactly 1 thousand', () => {
    expect(formatFollowers(1000)).toBe('1.0K')
  })
})
