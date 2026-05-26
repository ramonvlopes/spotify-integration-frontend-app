import { render, screen, fireEvent } from '@/test/utils'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('renders nothing when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('disables previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[buttons.length - 1]).toBeDisabled()
  })

  it('calls onPageChange with next page when clicking next', () => {
    const onPageChange = vi.fn()
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[buttons.length - 1])
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange with previous page when clicking previous', () => {
    const onPageChange = vi.fn()
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(onPageChange).toHaveBeenCalledWith(2)
  })
})
