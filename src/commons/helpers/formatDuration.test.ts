import { formatDuration } from './formatDuration'

describe('formatDuration', () => {
  it('formats milliseconds to mm:ss', () => {
    expect(formatDuration(200000)).toBe('3:20')
  })

  it('pads seconds with leading zero', () => {
    expect(formatDuration(61000)).toBe('1:01')
  })

  it('handles zero', () => {
    expect(formatDuration(0)).toBe('0:00')
  })

  it('handles exactly 1 minute', () => {
    expect(formatDuration(60000)).toBe('1:00')
  })
})
