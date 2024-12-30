import { forwardRef } from 'react'

/* eslint-disable no-bitwise */

interface CircleProps {
  color?: string // Color principal del círculo
  width?: number // Ancho del SVG
  height?: number // Alto del SVG
  darkness?: number // Nivel de oscurecimiento del borde (por defecto 60)
}

export const CircleIcon = forwardRef<SVGSVGElement, CircleProps>(
  ({ color = '#3498db', width = 100, height = 100, darkness = 60, ...props }, ref) => {
    // Función para oscurecer el color
    const darkenColor = (hexColor: string, amount: number): string => {
      let usePound = false
      if (hexColor[0] === '#') {
        hexColor = hexColor.slice(1)
        usePound = true
      }

      const num = parseInt(hexColor, 16)
      let r = (num >> 16) - amount
      let g = ((num >> 8) & 0x00ff) - amount
      let b = (num & 0x0000ff) - amount

      r = Math.min(255, Math.max(0, r))
      g = Math.min(255, Math.max(0, g))
      b = Math.min(255, Math.max(0, b))

      return (
        (usePound ? '#' : '') +
        r.toString(16).padStart(2, '0') +
        g.toString(16).padStart(2, '0') +
        b.toString(16).padStart(2, '0')
      )
    }

    const borderColor = darkenColor(color, darkness) // Oscurece el color según el nivel de darkness

    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        {...props} // Propaga todas las props adicionales
      >
        <circle cx="50" cy="50" r="45" fill={color} stroke={borderColor} strokeWidth="10" />
      </svg>
    )
  }
)
