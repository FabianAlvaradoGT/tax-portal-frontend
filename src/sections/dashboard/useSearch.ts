import { useQuery } from '@tanstack/react-query'

import axiosInstance from 'src/lib/axios'

export interface Company {
  uuid: string
  uuid_cliente: string
  rut: string
  razon_social: string
  estado: boolean
  domicilio: string
  email: string
}

export const getCompanyAll = async (): Promise<Company[]> => {
  const response = await axiosInstance.get<Company[]>(`/company/all`)
  return response.data
}

export function useCompany() {
  return useQuery({ queryKey: ['companies'], queryFn: getCompanyAll, initialData: [] })
}
