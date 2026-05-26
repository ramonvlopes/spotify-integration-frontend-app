import { render, screen, fireEvent } from '@/test/utils'
import { FavoriteItem } from './FavoriteItem'

const favorite = {
  id: 'fav-1',
  artistName: 'Radiohead',
  trackName: 'Creep',
  albumName: 'Pablo Honey',
  createdAt: '2024-01-15T10:00:00.000Z',
}

describe('FavoriteItem', () => {
  it('renders track name', () => {
    render(<FavoriteItem favorite={favorite} onRemove={vi.fn()} />)
    expect(screen.getByText('Creep')).toBeInTheDocument()
  })

  it('renders artist and album names', () => {
    render(<FavoriteItem favorite={favorite} onRemove={vi.fn()} />)
    expect(screen.getByText(/Radiohead/)).toBeInTheDocument()
    expect(screen.getByText(/Pablo Honey/)).toBeInTheDocument()
  })

  it('calls onRemove with id when delete button clicked', () => {
    const onRemove = vi.fn()
    render(<FavoriteItem favorite={favorite} onRemove={onRemove} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onRemove).toHaveBeenCalledWith('fav-1')
  })
})
