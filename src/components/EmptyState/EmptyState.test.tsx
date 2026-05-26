import { render, screen } from '@/test/utils'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders message', () => {
    render(<EmptyState message="No results" />)
    expect(screen.getByText('No results')).toBeInTheDocument()
  })
})
