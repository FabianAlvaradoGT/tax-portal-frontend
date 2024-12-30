export const YEARS = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
]

import axiosInstance from 'src/lib/axios'

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
