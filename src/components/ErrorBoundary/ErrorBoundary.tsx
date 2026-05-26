import { Component } from 'react'
import { ErrorState } from '@/components/ErrorState'
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types'

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
    this.handleReset = this.handleReset.bind(this)
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  handleReset() {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <ErrorState
            message={this.state.error?.message ?? 'An unexpected error occurred'}
            onRetry={this.handleReset}
          />
        </div>
      )
    }

    return this.props.children
  }
}
