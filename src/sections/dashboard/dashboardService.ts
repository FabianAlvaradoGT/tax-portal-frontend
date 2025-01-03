import { useQuery } from '@tanstack/react-query'

import axiosInstance from 'src/lib/axios'

// ----------------------------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------------------------

export interface TypeForms {
  uuid: string
  fuente: string
  tipo_archivo: string
}

export const getTypeForms = async (): Promise<TypeForms[]> => {
  const response = await axiosInstance.get<TypeForms[]>(`/type-files/forms`)
  return response.data
}

export function useTypesForms() {
  return useQuery({ queryKey: ['typeForms'], queryFn: getTypeForms, initialData: [] })
}
