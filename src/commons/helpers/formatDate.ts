export function formatDate(dateString: string, locale = 'en-US'): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
}
