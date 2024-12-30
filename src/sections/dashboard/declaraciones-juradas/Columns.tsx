interface Props {
  Header: string
  accessor?: string
  Cell?: any
  disableSortBy?: boolean
  Filter?: any
  filter?: string
  className?: string
  width?: number
  intl?: any
  id?: string
}

export const DeclaracionesJuradasColumns = (): Props[] => [
  {
    Header: 'Número',
    accessor: 'numero',
  },
  {
    Header: 'Estado Declaración',
    accessor: 'estado_declaracion',
  },
  {
    Header: 'Periodo',
    accessor: 'periodo',
  },
]
