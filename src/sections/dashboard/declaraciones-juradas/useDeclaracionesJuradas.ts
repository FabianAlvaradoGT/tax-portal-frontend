import { useQuery } from '@tanstack/react-query'

import axiosInstance from 'src/lib/axios'

export const YEARS = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
]

export interface DDJJ {
  uuid: string
  uuid_sociedad: string
  numero: number
  periodo: number
  fecha_insercion: string
  estado_declaracion: string
}

export const getDeclaracionesJuradas = async (
  uuid_sociedad: string,
  period: string
): Promise<DDJJ[]> => {
  const response = await axiosInstance.get<DDJJ[]>(`/ddjj/get-ddjj/${uuid_sociedad}/${period}`)
  return response.data
}

export function useDeclaracionesJuradas(uuid_sociedad: string, period: string) {
  return useQuery<DDJJ[], { detail: string }>({
    queryKey: ['declaraciones-juradas'],
    queryFn: () => getDeclaracionesJuradas(uuid_sociedad, period),
    enabled: false,
    initialData: [] as DDJJ[],
    retry: 0,
  })
}
