import type { Column, TableRow } from 'src/components/table/table'

export const TABLE_DATA: TableRow[] = [
  { id: '1', descripcion: 'Descripcion 1', fecha: '2024-12-01', tipo_notificacion: 'Urgente' },
  { id: '2', descripcion: 'Descripcion 2', fecha: '2024-12-02', tipo_notificacion: 'Alerta' },
  { id: '3', descripcion: 'Descripcion 3', fecha: '2024-12-03', tipo_notificacion: 'No urgente' },
  { id: '4', descripcion: 'Descripcion 4', fecha: '2024-12-04', tipo_notificacion: 'Urgente' },
  { id: '5', descripcion: 'Descripcion 5', fecha: '2024-12-05', tipo_notificacion: 'Alerta' },
  { id: '6', descripcion: 'Descripcion 6', fecha: '2024-12-06', tipo_notificacion: 'No urgente' },
  { id: '7', descripcion: 'Descripcion 7', fecha: '2024-12-07', tipo_notificacion: 'Urgente' },
  { id: '8', descripcion: 'Descripcion 8', fecha: '2024-12-08', tipo_notificacion: 'Alerta' },
  { id: '9', descripcion: 'Descripcion 9', fecha: '2024-12-09', tipo_notificacion: 'No urgente' },
  { id: '10', descripcion: 'Descripcion 10', fecha: '2024-12-10', tipo_notificacion: 'Urgente' },
  { id: '11', descripcion: 'Descripcion 11', fecha: '2024-12-11', tipo_notificacion: 'Alerta' },
  { id: '12', descripcion: 'Descripcion 12', fecha: '2024-12-12', tipo_notificacion: 'No urgente' },
  { id: '13', descripcion: 'Descripcion 13', fecha: '2024-12-13', tipo_notificacion: 'Urgente' },
  { id: '14', descripcion: 'Descripcion 14', fecha: '2024-12-14', tipo_notificacion: 'Alerta' },
  { id: '15', descripcion: 'Descripcion 15', fecha: '2024-12-15', tipo_notificacion: 'No urgente' },
]

export const COLUMNS: Column<TableRow>[] = [
  { id: 'id', label: 'ID' },
  { id: 'descripcion', label: 'Descripción' },
  { id: 'fecha', label: 'Fecha' },
  { id: 'tipo_notificacion', label: 'Tipo Notificación' },
]

export const YEARS = [
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
]
