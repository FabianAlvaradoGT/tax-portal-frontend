import type { Column, TableRow } from 'src/components/table/table'

export const TABLE_DATA: TableRow[] = [
  { id: '1', numero: '0001', estado: 'Activo', detalle: 'Detalle 1' },
  { id: '2', numero: '0002', estado: 'Inactivo', detalle: 'Detalle 2' },
  { id: '3', numero: '0003', estado: 'Activo', detalle: 'Detalle 3' },
  { id: '4', numero: '0004', estado: 'Inactivo', detalle: 'Detalle 4' },
  { id: '5', numero: '0005', estado: 'Activo', detalle: 'Detalle 5' },
  { id: '6', numero: '0006', estado: 'Activo', detalle: 'Detalle 6' },
  { id: '7', numero: '0007', estado: 'Inactivo', detalle: 'Detalle 7' },
  { id: '8', numero: '0008', estado: 'Activo', detalle: 'Detalle 8' },
  { id: '9', numero: '0009', estado: 'Inactivo', detalle: 'Detalle 9' },
  { id: '10', numero: '0010', estado: 'Activo', detalle: 'Detalle 10' },
  { id: '11', numero: '0011', estado: 'Activo', detalle: 'Detalle 11' },
  { id: '12', numero: '0012', estado: 'Inactivo', detalle: 'Detalle 12' },
  { id: '13', numero: '0013', estado: 'Activo', detalle: 'Detalle 13' },
  { id: '14', numero: '0014', estado: 'Inactivo', detalle: 'Detalle 14' },
  { id: '15', numero: '0015', estado: 'Activo', detalle: 'Detalle 15' },
]

export const COLUMNS: Column<TableRow>[] = [
  { id: 'numero', label: 'Número' },
  { id: 'estado', label: 'Estado' },
  { id: 'detalle', label: 'Detalle' },
]

export const YEARS = [
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
]
