import { render, screen, fireEvent } from '@/test/utils'
import { Input } from './Input'

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Artist name" />)
    expect(screen.getByLabelText('Artist name')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('calls onChange when typing', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalled()
  })
})
