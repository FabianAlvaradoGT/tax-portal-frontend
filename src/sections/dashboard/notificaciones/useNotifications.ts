import { useQuery } from '@tanstack/react-query'

import axiosInstance from 'src/lib/axios'

export const YEARS = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
]

export interface Notification {
  uuid: string
  uuid_sociedad: string
  id: number
  fecha: string
  descripcion: string
  mensaje: string
  tipo_notificacion: string
  fecha_insercion: string
}

export const getNotification = async (
  uuid_sociedad: string,
  signal: AbortSignal
): Promise<Notification[]> => {
  const response = await axiosInstance.get<Notification[]>(`/notification/${uuid_sociedad}`, {
    signal,
  })
  return response.data
}

export function useNotifications(uuid_sociedad: string) {
  return useQuery<Notification[], { detail: string }>({
    queryKey: ['notifications'],
    queryFn: ({ signal }) => getNotification(uuid_sociedad, signal),
    initialData: [],
    retry: 0,
    enabled: false,
  })
}
