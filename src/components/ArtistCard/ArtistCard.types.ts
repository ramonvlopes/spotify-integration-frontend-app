export interface ArtistCardProps {
  id: string
  name: string
  imageUrl?: string
  genres?: string[]
  followers?: number
  popularity?: number
  onClick: (id: string) => void
}
