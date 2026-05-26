export interface FavoritesFormProps {
  onAdd: (favorite: { artistName: string; trackName: string; albumName: string }) => void
}
