import { render, screen } from '@/test/utils'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders label', () => {
    render(<Badge label="pop" />)
    expect(screen.getByText('pop')).toBeInTheDocument()
  })

  it('applies genre variant class', () => {
    render(<Badge label="rock" variant="genre" />)
    const badge = screen.getByText('rock')
    expect(badge.className).toContain('text-accent')
  })
})
