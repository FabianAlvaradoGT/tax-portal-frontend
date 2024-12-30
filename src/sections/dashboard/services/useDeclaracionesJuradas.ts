import type { Column, TableRow } from 'src/components/table/table'

interface DeclaracionJurada {
  uuid: string
  uuid_sociedad: string
  numero: number
  periodo: number
  fecha_insercion: string
  estado_declaracion: string
}

export const TABLE_DATA: DeclaracionJurada[] = [
  {
    uuid: '1',
    uuid_sociedad: '',
    numero: 1,
    estado_declaracion: 'Activo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '2',
    uuid_sociedad: '',
    numero: 2,
    estado_declaracion: 'Inactivo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '3',
    uuid_sociedad: '',
    numero: 3,
    estado_declaracion: 'Activo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '4',
    uuid_sociedad: '',
    numero: 4,
    estado_declaracion: 'Inactivo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '5',
    uuid_sociedad: '',
    numero: 5,
    estado_declaracion: 'Activo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '6',
    uuid_sociedad: '',
    numero: 6,
    estado_declaracion: 'Activo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '7',
    uuid_sociedad: '',
    numero: 7,
    estado_declaracion: 'Inactivo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '8',
    uuid_sociedad: '',
    numero: 8,
    estado_declaracion: 'Activo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '9',
    uuid_sociedad: '',
    numero: 9,
    estado_declaracion: 'Inactivo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '10',
    uuid_sociedad: '',
    numero: 10,
    estado_declaracion: 'Activo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '11',
    uuid_sociedad: '',
    numero: 11,
    estado_declaracion: 'Activo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '12',
    uuid_sociedad: '',
    numero: 12,
    estado_declaracion: 'Inactivo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '13',
    uuid_sociedad: '',
    numero: 13,
    estado_declaracion: 'Activo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '14',
    uuid_sociedad: '',
    numero: 14,
    estado_declaracion: 'Inactivo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
  {
    uuid: '15',
    uuid_sociedad: '',
    numero: 15,
    estado_declaracion: 'Activo',
    periodo: 2024,
    fecha_insercion: '2024-12-27',
  },
]

export const COLUMNS: Column<TableRow>[] = [
  { id: 'numero', label: 'Número' },
  { id: 'estado_declaracion', label: 'Estado Declaración' },
  { id: 'periodo', label: 'Periodo' },
  { id: 'key', label: 'uuid' },
]

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
