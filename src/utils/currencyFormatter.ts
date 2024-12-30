export function currencyFormatter({ value, decimal = 2, currency = true }: { value: number | null; decimal?: number; currency?: boolean }) {
  const formatter = new Intl.NumberFormat('es-CL', {
    currency: 'CLP',
    style: 'currency',
    minimumFractionDigits: decimal
  })

  if (value === null) {
    return currency ? '$' : ''
  }

  return currency
    ? formatter.format(value)
    : value.toLocaleString('es-CL', {
        maximumFractionDigits: formatter.resolvedOptions().maximumFractionDigits
      })
}
