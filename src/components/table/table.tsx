import Table from '@mui/material/Table'
import { Pagination } from '@mui/material'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'

import { useTable } from 'src/components/table'
import { Scrollbar } from 'src/components/scrollbar'

// ----------------------------------------------------------------------

export interface TableRow {
  [key: string]: string | number
}

export interface Column<T> {
  id: keyof T
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

// ----------------------------------------------------------------------

export function TablePagination({ columns, data }: { columns: Column<TableRow>[]; data: any[] }) {
  const { page, rowsPerPage, setPage } = useTable({ defaultRowsPerPage: 5, defaultCurrentPage: 1 })
  const COLUMNS = columns
  const TABLE_DATA = data

  return (
    <>
      <Scrollbar>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {COLUMNS.map((column) => {
                if (column.id !== 'key') {
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.label}
                    </TableCell>
                  )
                }

                return null
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {TABLE_DATA.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map(
              (row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={`${row.id}_${index}`}>
                  {COLUMNS.map((column) => {
                    if (column.id === 'key') {
                      return null
                    }

                    const value = row[column.id]

                    return (
                      <TableCell key={`${column.id}_${index}`} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Scrollbar>

      <Pagination
        page={page}
        count={Math.ceil(TABLE_DATA.length / 5)}
        onChange={(event, newPage) => setPage(newPage)}
        size="small"
        color="standard"
        sx={{
          pt: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      />
    </>
  )
}
