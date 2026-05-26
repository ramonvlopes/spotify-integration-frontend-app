import { render } from '@/test/utils'
import { LoadingSpinner } from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders without crashing', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.firstChild).not.toBeNull()
  })

  it('renders fullPage variant', () => {
    const { container } = render(<LoadingSpinner fullPage />)
    expect(container.firstChild).not.toBeNull()
  })
})
