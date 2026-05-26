import { z } from 'zod'

export const favoritesSchema = z.object({
  artistName: z.string().min(2, 'Must be at least 2 characters').max(100),
  trackName: z.string().min(2, 'Must be at least 2 characters').max(100),
  albumName: z.string().min(2, 'Must be at least 2 characters').max(100),
})

export type FavoritesFormData = z.infer<typeof favoritesSchema>
