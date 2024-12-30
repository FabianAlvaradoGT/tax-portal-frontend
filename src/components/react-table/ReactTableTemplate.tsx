'use client'

import type { Column } from 'react-table'

import { useMemo, Fragment, useEffect } from 'react'
import { ReloadOutlined, LoadingOutlined, DownloadOutlined } from '@ant-design/icons'
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  useRowSelect,
  usePagination,
  useGlobalFilter,
} from 'react-table'

import { useTheme } from '@mui/material/styles'
import {
  Stack,
  Table,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { currencyFormatter } from 'src/utils/currencyFormatter'

import { HeaderSort, SortingSelect, TablePagination } from 'src/components/react-table/ReactTable'
import {
  GlobalFilter,
  renderFilterTypes,
  DefaultColumnFilter,
} from 'src/components/react-table/ReactTableFilters'

import { TableLoading } from '../table/table-loading'

interface Props {
  columns: Column[]
  data: any[]
  getHeaderProps: (column: any) => void
  handleAdd?: () => void
  renderRowSubComponent?: any
  renderButtonUpper?: any
  orderBy?: string
  loading?: {
    table: boolean
    download?: boolean
  }
  error?: any
  reload?: any
  download?: any
  fieldSortBy?: boolean
  total?: any
  doubleClick?: any
  unselect?: boolean
  showFilter?: boolean
  showGlobalFilter?: boolean
}

const formatCurrency = {
  defaultCurrency: (value: number | null) =>
    currencyFormatter({ value: Number(value), decimal: 0 }),
}

interface initialProps {
  pageIndex: any
  pageSize: any
  hiddenColumns: any
  sortBy?: any
  filters?: any
}

export const ReactTable = ({
  columns,
  data,
  getHeaderProps,
  renderRowSubComponent,
  loading,
  error,
  reload,
  orderBy,
  renderButtonUpper,
  download,
  fieldSortBy = true,
  total,
  doubleClick,
  unselect = false,
  showFilter = false,
  showGlobalFilter = false,
}: Props) => {
  const theme = useTheme()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

  const filterTypes = useMemo(() => renderFilterTypes, [])
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), [])
  const sortBy = { id: orderBy, desc: false }
  let initialState: initialProps = {
    pageIndex: 0,
    pageSize: 5,
    hiddenColumns: [],
    filters: [{ id: orderBy, value: '' }],
  }

  if (orderBy) {
    initialState = { ...initialState, sortBy: [sortBy] }
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    allColumns,
    visibleColumns,
    rows,
    // @ts-expect-error Template
    page,
    // @ts-expect-error Template
    gotoPage,
    // @ts-expect-error Template
    setPageSize,
    // @ts-expect-error Template
    state: { globalFilter, pageIndex, pageSize },
    // @ts-expect-error Template
    preGlobalFilteredRows,
    // @ts-expect-error Template
    setGlobalFilter,
    // @ts-expect-error Template
    setSortBy,
  } = useTable(
    {
      columns,
      data,
      // @ts-expect-error Template
      defaultColumn,
      filterTypes,
      initialState,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  )

  useEffect(() => {
    if (matchDownSM) {
      setHiddenColumns([])
    } else {
      setHiddenColumns([])
    }
    // eslint-disable-next-line
  }, [matchDownSM])

  return (
    <Stack spacing={3}>
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 3, pb: 0 }}
      >
        {showGlobalFilter ? (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
        ) : (
          <div />
        )}
        <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
          {reload && (
            <Tooltip
              title="Recargar"
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[50]
                        : theme.palette.grey[700],
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[800]
                        : theme.palette.grey[50],
                  },
                },
              }}
            >
              <IconButton
                color="primary"
                sx={{
                  ':hover': {
                    backgroundColor: theme.palette.primary.light,
                  },
                  fontSize: '1.2rem',
                }}
                onClick={(e: any) => {
                  e.stopPropagation()
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  reload && reload()
                }}
              >
                {loading?.table ? <LoadingOutlined spin /> : <ReloadOutlined />}
              </IconButton>
            </Tooltip>
          )}
          {download && (
            <Tooltip
              title="Descargar"
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[50]
                        : theme.palette.grey[700],
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[800]
                        : theme.palette.grey[50],
                  },
                },
              }}
            >
              <IconButton
                color="success"
                sx={{
                  fontSize: '1.2rem',
                  ':hover': {
                    backgroundColor: theme.palette.success.light + 60,
                    color: theme.palette.success.dark,
                  },
                }}
                onClick={(e: any) => {
                  e.stopPropagation()
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  download && download()
                }}
              >
                {loading?.download ? <LoadingOutlined spin /> : <DownloadOutlined />}
              </IconButton>
            </Tooltip>
          )}
          {fieldSortBy && (
            <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
          )}
          {renderButtonUpper && renderButtonUpper()}
        </Stack>
      </Stack>

      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, indexHeaderGroup) => (
            <TableRow
              {...headerGroup.getHeaderGroupProps()}
              sx={{ '& > th:first-of-type': { width: '58px' } }}
              key={'header_row_' + indexHeaderGroup}
            >
              {headerGroup.headers.map((column: any, indexHeader) => (
                <TableCell
                  width={column.width}
                  {...column.getHeaderProps([
                    { className: column.className },
                    getHeaderProps(column),
                  ])}
                  key={'header_cell_' + indexHeader}
                  sx={column.className === 'cell-center' ? { textAlign: 'center' } : {}}
                >
                  <HeaderSort column={column} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {showFilter && (
            <>
              {headerGroups.map((group: any, indexHeaderGroup) => (
                <TableRow {...group.getHeaderGroupProps()} key={'filter_row_' + indexHeaderGroup}>
                  {group.headers.map((column: any, indexHeader: any) => (
                    <TableCell
                      {...column.getHeaderProps([{ className: column.className }])}
                      key={'filter_cell_' + indexHeader}
                    >
                      {column.canFilter ? column.render('Filter') : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          )}
          {total && (
            <>
              {headerGroups.map((group: any, indexHeaderGroup) => (
                <TableRow
                  {...group.getHeaderGroupProps()}
                  key={'total_row_' + indexHeaderGroup}
                  sx={{
                    backgroundColor:
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[800],
                  }}
                >
                  {group.headers.map((column: any, indexHeader: any) => (
                    <TableCell
                      {...column.getHeaderProps([{ className: column.className }])}
                      key={'total_cell_' + indexHeader}
                      sx={
                        column.className?.includes('text-right')
                          ? { fontWeight: 600, textAlign: 'right' }
                          : { fontWeight: 600 }
                      }
                    >
                      {column.className?.includes('defaultCurrency')
                        ? formatCurrency.defaultCurrency(total[column.id])
                        : total[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow />
            </>
          )}
          {error && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography variant="h6">Error al obtener los datos</Typography>
              </TableCell>
            </TableRow>
          )}

          {loading?.table && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <TableLoading />
              </TableCell>
            </TableRow>
          )}

          {data.length === 0 && !error && !loading && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography variant="h6">No hay datos</Typography>
              </TableCell>
            </TableRow>
          )}

          {page.map((row: any, i: number) => {
            prepareRow(row)
            const rowProps = row.getRowProps()

            return (
              <Fragment key={'data_' + i}>
                <TableRow {...row.getRowProps()} sx={{ bgcolor: 'inherit' }} key={'data_row_' + i}>
                  {row.cells.map((cell: any, indexCell: any) => {
                    const cellCenter =
                      cell.column.className === 'cell-center' ? { textAlign: 'center' } : {}
                    const unselectCell = unselect ? { userSelect: 'none' } : {}
                    const sxCell = { ...cellCenter, ...unselectCell }

                    return (
                      <TableCell
                        onDoubleClick={() => doubleClick && doubleClick(row)}
                        {...cell.getCellProps([{ className: cell.column.className }])}
                        key={`data_cell_${i}_${indexCell}`}
                        sx={sxCell}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    )
                  })}
                </TableRow>
                {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
              </Fragment>
            )
          })}
          <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
            <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
              <TablePagination
                gotoPage={gotoPage}
                rows={rows}
                setPageSize={setPageSize}
                pageSize={pageSize}
                pageIndex={pageIndex}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  )
}
