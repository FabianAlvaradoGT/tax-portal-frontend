// material-ui
import type { SelectChangeEvent } from '@mui/material'

import React, { useRef, useState, forwardRef } from 'react'
import { CaretUpOutlined, CaretDownOutlined, CloseSquareFilled } from '@ant-design/icons'

import { useTheme } from '@mui/material/styles'
import {
  Box,
  Chip,
  Grid,
  Stack,
  Select,
  Checkbox,
  MenuItem,
  TextField,
  Pagination,
  Typography,
  FormControl,
  ListItemText,
  OutlinedInput,
} from '@mui/material'

// ==============================|| HEADER SORT ||============================== //

interface HeaderSortProps {
  column: any
  sort?: boolean
}

export const HeaderSort = ({ column, sort }: HeaderSortProps) => {
  const theme = useTheme()
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'inline-flex' }}>
      <Box>{column.render('Header')}</Box>
      {!column.disableSortBy && (
        <Stack
          sx={{ color: 'secondary.light' }}
          {...(sort && { ...column.getHeaderProps(column.getSortByToggleProps()) })}
        >
          <CaretUpOutlined
            style={{
              fontSize: '0.625rem',
              color:
                column.isSorted && !column.isSortedDesc ? theme.palette.text.secondary : 'inherit',
            }}
          />
          <CaretDownOutlined
            style={{
              fontSize: '0.625rem',
              marginTop: -2,
              color: column.isSortedDesc ? theme.palette.text.secondary : 'inherit',
            }}
          />
        </Stack>
      )}
    </Stack>
  )
}

// ==============================|| TABLE PAGINATION ||============================== //

interface TablePaginationProps {
  gotoPage: (value: number) => void
  setPageSize: (value: number) => void
  pageIndex: number
  pageSize: number
  rows: any[]
  showTotal?: boolean
}

export const TablePagination = ({
  gotoPage,
  rows,
  setPageSize,
  pageSize,
  pageIndex,
}: TablePaginationProps) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    gotoPage(value - 1)
  }

  const handleChange = (event: SelectChangeEvent<number>) => {
    setPageSize(+event.target.value)
  }

  return (
    <Grid container alignItems="center" justifyContent="space-between" sx={{ width: 'auto' }}>
      <Grid item>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="dark">
              Registros por página
            </Typography>
            <FormControl sx={{ m: 1 }}>
              <Select
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={pageSize}
                onChange={handleChange}
                size="small"
                sx={{ '& .MuiSelect-select': { py: 0.75, px: 1.25 } }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Typography variant="caption" color="dark">
            Ir a
          </Typography>
          <TextField
            size="small"
            type="number"
            value={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) : 0
              gotoPage(page - 1)
            }}
            sx={{ '& .MuiOutlinedInput-input': { py: 0.75, px: 1.25, width: 36 } }}
          />
          <Typography variant="caption" color="dark">
            Total registros {rows.length}
          </Typography>
        </Stack>
      </Grid>
      <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
        <Pagination
          count={Math.ceil(rows.length / pageSize)}
          page={pageIndex + 1}
          onChange={handleChangePagination}
          color="standard"
          variant="soft"
          showFirstButton
          showLastButton
        />
      </Grid>
    </Grid>
  )
}

// ==============================|| SELECTION - PREVIEW ||============================== //

export const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }: { indeterminate: any }, ref: any) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    return <Checkbox indeterminate={indeterminate} ref={resolvedRef} {...rest} />
  }
)

export const TableRowSelection = ({ selected }: { selected: number }) => (
  <>
    {selected > 0 && (
      <Chip
        size="small"
        label={`${selected} fila(s) seleccionada(s)`}
        color="secondary"
        variant="filled"
        sx={{
          position: 'absolute',
          right: -1,
          top: -1,
          borderRadius: '0 4px 0 4px',
        }}
      />
    )}
  </>
)

// ==============================|| COLUMN HIDING - SELECT ||============================== //

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
}

export const HidingSelect = ({ hiddenColumns, setHiddenColumns, allColumns }: any) => {
  const handleChange = (event: SelectChangeEvent<typeof hiddenColumns>) => {
    const {
      target: { value },
    } = event

    setHiddenColumns(typeof value === 'string' ? value.split(',') : value!)
  }

  return (
    <FormControl sx={{ width: 200 }}>
      <Select
        id="column-hiding"
        multiple
        displayEmpty
        value={hiddenColumns}
        onChange={handleChange}
        input={<OutlinedInput id="select-column-hiding" placeholder="select column" />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <Typography variant="subtitle1">todas las columnas visibles</Typography>
          }

          if (selected.length > 0 && selected.length === allColumns.length) {
            return <Typography variant="subtitle1">todas las columnas ocultas</Typography>
          }

          return <Typography variant="subtitle1">{selected.length} columna(s) ocultas</Typography>
        }}
        MenuProps={MenuProps}
        size="small"
      >
        {allColumns.map((column: any, index: number) => (
          <MenuItem key={column.id} value={column.id}>
            <Checkbox
              checked={hiddenColumns!.indexOf(column.id) > -1}
              color="error"
              checkedIcon={
                <Box
                  className="icon"
                  sx={{
                    width: 16,
                    height: 16,
                    border: '1px solid',
                    borderColor: 'inherit',
                    borderRadius: 0.25,
                    position: 'relative',
                  }}
                >
                  <CloseSquareFilled className="filled" style={{ position: 'absolute' }} />
                </Box>
              }
            />
            <ListItemText
              primary={typeof column.Header === 'string' ? column.Header : column?.title}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

// ==============================|| COLUMN SORTING - SELECT ||============================== //

export const SortingSelect = ({ sortBy, setSortBy, allColumns, width = 200 }: any) => {
  const [sort, setSort] = useState(sortBy)

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event
    setSort(value)
    setSortBy([{ id: value, desc: false }])
  }

  return (
    <FormControl sx={{ width }}>
      <Select
        id="column-hiding"
        displayEmpty
        value={sort}
        onChange={handleChange}
        input={<OutlinedInput id="select-column-hiding" placeholder="Order by" />}
        renderValue={(selected) => {
          const selectedColumn = allColumns.filter((column: any) => column.id === selected)[0]
          if (!selected) {
            return <Typography variant="subtitle1">Ordenar Por</Typography>
          }

          return (
            <Typography variant="subtitle2">
              Ordenar por (
              {typeof selectedColumn.Header === 'string'
                ? selectedColumn.Header
                : selectedColumn?.title}
              )
            </Typography>
          )
        }}
        size="small"
      >
        {allColumns
          .filter((column: any) => column.canSort)
          .map((column: any) => (
            <MenuItem key={column.id} value={column.id}>
              <ListItemText
                primary={typeof column.Header === 'string' ? column.Header : column?.title}
              />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}
