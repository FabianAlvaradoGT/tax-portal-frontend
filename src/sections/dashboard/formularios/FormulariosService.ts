import { useQuery, useMutation } from '@tanstack/react-query'

import axiosInstance from 'src/lib/axios'

import { F29Columns, F22Columns, F50Columns, F3600Columns } from './Columns'

// ----------------------------------------------------------------------------------------------------

interface Years {
  value: string
  label: string
}

export const YEARS: Years[] = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
]

export const forms: {
  [key: string]: (
    theme: any,
    setDialogData: any,
    openDialog: any,
    handleDownload: any,
    info: any,
    disableButtons: boolean
  ) => any
} = {
  F29: (theme: any, setDialogData: any, openDialog, handleDownload, info, disableButtons) =>
    F29Columns(theme, setDialogData, openDialog, handleDownload, info, disableButtons),
  F22: (theme: any, setDialogData: any, openDialog, handleDownload, info, disableButtons) =>
    F22Columns(theme, setDialogData, openDialog, handleDownload, info, disableButtons),
  F3600: (theme: any, setDialogData: any, openDialog, handleDownload, info, disableButtons) =>
    F3600Columns(theme, setDialogData, openDialog, handleDownload, info, disableButtons),
  F50: (theme: any, setDialogData: any, openDialog, handleDownload, info, disableButtons) =>
    F50Columns(theme, setDialogData, openDialog, handleDownload, info, disableButtons),
}

// ----------------------------------------------------------------------------------------------------

export interface DataObservation {
  data: { [key: string]: string }
}
export interface Observation {
  form_name: string
  data: DataObservation[]
}

export const getObservations = async (
  uuid_tipo_archivo: string,
  uuid_sociedad: string,
  year: string,
  signal: AbortSignal
): Promise<Observation> => {
  const response = await axiosInstance.get<Observation>(
    `/form/get-observation?uuid_tipo_archivo=${uuid_tipo_archivo}&uuid_sociedad=${uuid_sociedad}&year=${year}`,
    { signal }
  )
  return response.data
}

export function useGetObservations(uuid_tipo_archivo: string, uuid_sociedad: string, year: string) {
  return useQuery<Observation, { detail: string }>({
    queryKey: ['observations'],
    queryFn: ({ signal }) => getObservations(uuid_tipo_archivo, uuid_sociedad, year, signal),
    enabled: false,
    initialData: {} as Observation,
    retry: 0,
  })
}

// ----------------------------------------------------------------------------------------------------

export const postDownloadDocument = async (payload: object): Promise<Blob> => {
  const response = await axiosInstance.post<Blob>(`/document/download`, payload, {
    responseType: 'blob',
  })
  return response.data
}

export function useDownloadDocument() {
  return useMutation<Blob, { detail: string }, object>({
    mutationFn: (payload: object) => postDownloadDocument(payload),
  })
}
