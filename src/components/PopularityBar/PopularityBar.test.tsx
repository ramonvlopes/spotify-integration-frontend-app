import { render, screen } from '@/test/utils'
import { PopularityBar } from './PopularityBar'

describe('PopularityBar', () => {
  it('renders the value', () => {
    render(<PopularityBar value={75} />)
    expect(screen.getByText('75')).toBeInTheDocument()
  })

  it('clamps value to 100', () => {
    render(<PopularityBar value={150} />)
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('clamps value to 0', () => {
    render(<PopularityBar value={-10} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
