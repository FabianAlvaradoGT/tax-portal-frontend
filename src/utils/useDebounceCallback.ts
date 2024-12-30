// useDebounceCallback.ts
import { useRef, useCallback } from 'react'

/**
 * Retorna una función que, cuando se llama, se deboucea por `delay` ms
 * antes de ejecutar la función callback.
 */
export function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay = 200
): (...args: Parameters<T>) => void {
  // Referencia a la id del timeout
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Retornamos una función "debounced"
  return useCallback(
    (...args: Parameters<T>) => {
      // Limpiamos timeout anterior, si existe
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Programamos la llamada del callback
      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )
}
