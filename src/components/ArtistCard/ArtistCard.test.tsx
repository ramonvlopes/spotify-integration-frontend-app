import { render, screen, fireEvent } from '@/test/utils'
import { ArtistCard } from './ArtistCard'

const defaultProps = {
  id: 'artist-1',
  name: 'Radiohead',
  genres: ['alternative rock', 'art rock'],
  followers: 5000000,
  popularity: 82,
  onClick: vi.fn(),
}

describe('ArtistCard', () => {
  it('renders artist name', () => {
    render(<ArtistCard {...defaultProps} />)
    expect(screen.getByText('Radiohead')).toBeInTheDocument()
  })

  it('renders genres', () => {
    render(<ArtistCard {...defaultProps} />)
    expect(screen.getByText('alternative rock')).toBeInTheDocument()
  })

  it('calls onClick with artist id when clicked', () => {
    const onClick = vi.fn()
    render(<ArtistCard {...defaultProps} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledWith('artist-1')
  })

  it('renders placeholder when no image', () => {
    const { container } = render(<ArtistCard {...defaultProps} imageUrl={undefined} />)
    expect(container.querySelector('img')).toBeNull()
  })
})
