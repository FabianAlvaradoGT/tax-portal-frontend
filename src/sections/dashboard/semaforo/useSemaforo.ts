import { useQuery } from '@tanstack/react-query'

import axiosInstance from 'src/lib/axios'

export interface Forms {
  form_name: string
  data: [
    {
      periodo: number
      observaciones: number
    },
  ]
}

export const getForms = async (uuid_sociedad: string): Promise<Forms[]> => {
  const response = await axiosInstance.get<Forms[]>(`/form/get-forms/${uuid_sociedad}`)
  return response.data
}

export function useGetForms(uuid_sociedad: string) {
  return useQuery<Forms[], { detail: string }>({
    queryKey: ['forms', uuid_sociedad],
    queryFn: () => getForms(uuid_sociedad),
    initialData: [],
    retry: 0,
  })
}
