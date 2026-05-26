import { favoritesSchema } from './FavoritesForm.schema'

describe('favoritesSchema', () => {
  it('validates correct data', () => {
    const result = favoritesSchema.safeParse({
      artistName: 'Radiohead',
      trackName: 'Creep',
      albumName: 'Pablo Honey',
    })
    expect(result.success).toBe(true)
  })

  it('fails when artistName is empty', () => {
    const result = favoritesSchema.safeParse({
      artistName: '',
      trackName: 'Creep',
      albumName: 'Pablo Honey',
    })
    expect(result.success).toBe(false)
  })

  it('fails when trackName is too short', () => {
    const result = favoritesSchema.safeParse({
      artistName: 'Radiohead',
      trackName: 'X',
      albumName: 'Pablo Honey',
    })
    expect(result.success).toBe(false)
  })

  it('fails when albumName is missing', () => {
    const result = favoritesSchema.safeParse({
      artistName: 'Radiohead',
      trackName: 'Creep',
    })
    expect(result.success).toBe(false)
  })
})
