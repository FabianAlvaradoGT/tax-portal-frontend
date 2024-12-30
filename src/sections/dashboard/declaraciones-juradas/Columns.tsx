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
    className: 'cell-center',
  },
  {
    Header: 'Estado Declaración',
    accessor: 'estado_declaracion',
    className: 'cell-center',
  },
  {
    Header: 'Periodo',
    accessor: 'periodo',
    className: 'cell-center',
  },
]
