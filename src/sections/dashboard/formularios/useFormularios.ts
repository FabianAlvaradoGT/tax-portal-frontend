import axiosInstance from 'src/lib/axios'

import { F29Columns, F22Columns, F50Columns, F3600Columns } from './Columns'

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
    info: any
  ) => any
} = {
  F29: (theme: any, setDialogData: any, openDialog, handleDownload, info) =>
    F29Columns(theme, setDialogData, openDialog, handleDownload, info),
  F22: (theme: any, setDialogData: any, openDialog, handleDownload, info) =>
    F22Columns(theme, setDialogData, openDialog, handleDownload, info),
  F3600: (theme: any, setDialogData: any, openDialog, handleDownload, info) =>
    F3600Columns(theme, setDialogData, openDialog, handleDownload, info),
  F50: (theme: any, setDialogData: any, openDialog, handleDownload, info) =>
    F50Columns(theme, setDialogData, openDialog, handleDownload, info),
}

export interface TypeForms {
  uuid: string
  fuente: string
  tipo_archivo: string
}

export const getTypeForms = async (): Promise<TypeForms[]> => {
  const response = await axiosInstance.get<TypeForms[]>(`/type-files/forms`)
  return response.data
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
  year: string
): Promise<Observation> => {
  const response = await axiosInstance.get<Observation>(
    `/form/get-observation?uuid_tipo_archivo=${uuid_tipo_archivo}&uuid_sociedad=${uuid_sociedad}&year=${year}`
  )
  return response.data
}

// ----------------------------------------------------------------------------------------------------

export const postDownloadDocument = async (payload: object): Promise<Blob> => {
  const response = await axiosInstance.post<Blob>(`/document/download`, payload, {
    responseType: 'blob',
  })
  return response.data
}
