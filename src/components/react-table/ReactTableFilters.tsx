// third-party
import type { Row } from 'react-table'

import { useMemo, useState } from 'react'
import { matchSorter } from 'match-sorter'
// assets
import { IconX, IconLine, IconSearch } from '@tabler/icons-react'

import { useTheme } from '@mui/material/styles'
// material-ui
import {
  Stack,
  Button,
  Select,
  Slider,
  Tooltip,
  MenuItem,
  TextField,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from '@mui/material'

import { useDebounceCallback } from 'src/utils/useDebounceCallback'

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  ...other
}: any) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useDebounceCallback((v) => {
    setGlobalFilter(v || undefined)
  }, 200)

  return (
    <OutlinedInput
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      placeholder={`Search in ${count} records...`}
      id="start-adornment-email"
      startAdornment={<IconSearch />}
      color="primary"
      sx={{ '& input': { ml: 0.5 } }}
      {...other}
    />
  )
}

export function DefaultColumnFilter({
  column: { filterValue, Header, setFilter, width = 120 },
}: any) {
  const theme = useTheme()
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: width }}>
      <OutlinedInput
        fullWidth
        placeholder={Header}
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        color="primary"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <Tooltip
              title="Clear filter"
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[50]
                        : theme.palette.grey[700],
                  },
                },
              }}
            >
              <IconButton
                size="small"
                color="error"
                onClick={() => setFilter(undefined)}
                sx={{ '&:hover': { bgcolor: theme.customShadows.z1 } }}
              >
                <IconX />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        }
      />
    </Stack>
  )
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  const options = useMemo(() => {
    const o = new Set()
    preFilteredRows.forEach((row: any) => {
      o.add(row.values[id])
    })
    const optionsArray = Array.from(o).sort()
    return [...new Set(optionsArray).values()]
  }, [id, preFilteredRows])

  const value = filterValue || ''

  return (
    <Select
      value={value}
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
      displayEmpty
      size="small"
      defaultValue=""
      fullWidth
    >
      <MenuItem value="">all</MenuItem>
      {options.map((option: any, i: number) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  )
}
export function SelectColumnMejoradoFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  const options = useMemo(() => {
    const o = new Set()
    preFilteredRows.forEach((row: any) => {
      const values = row.values[id]
      values?.forEach((el: any) => {
        o.add(el)
      })
    })
    const optionsArray = Array.from(o).sort()
    return [...new Set(optionsArray).values()]
  }, [id, preFilteredRows])

  const value = filterValue || ''

  return (
    <Select
      value={value}
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
      displayEmpty
      size="small"
      defaultValue=""
      fullWidth
    >
      <MenuItem value="">all</MenuItem>
      {options.map((option: any, i: number) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  )
}
export function SelectAutocompleteColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, ...other },
}: any) {
  const filterAttribute = other.filterAttribute

  const options = useMemo(() => {
    const o = new Set()
    preFilteredRows.forEach((row: any) => {
      row.values[id].forEach((el: any) => {
        o.add(el[filterAttribute])
      })
    })
    const optionsArray = Array.from(o).sort()
    return [...new Set(optionsArray).values()]
  }, [id, preFilteredRows, filterAttribute])

  const value = filterValue || ''

  return (
    <Select
      value={value}
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
      displayEmpty
      size="small"
      defaultValue=""
      fullWidth
    >
      <MenuItem value="">all</MenuItem>
      {options.map((option: any, i: number) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  )
}

export function CleanFilter() {
  const handleClick = () => {
    console.log('clean')
  }
  return (
    <Button size="small" color="primary" onClick={handleClick}>
      Borrar Filtros
    </Button>
  )
}

export function BlankFilter() {
  return <div />
}

export function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  const [min, max] = useMemo(() => {
    let min_ = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max_ = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach((row: any) => {
      min_ = Math.min(row.values[id], min_)
      max_ = Math.max(row.values[id], max_)
    })
    return [min_, max_]
  }, [id, preFilteredRows])

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 1, minWidth: 120 }}>
      <Slider
        value={filterValue || min}
        min={min}
        max={max}
        step={1}
        onChange={(event: Event, newValue: number | number[]) => {
          setFilter(newValue)
        }}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <Tooltip title="Reset">
        <IconButton size="small" color="error" onClick={() => setFilter(undefined)}>
          <IconX />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}
export function SliderRangeColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  const [min, max] = useMemo(() => {
    let min_ = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max_ = preFilteredRows.length ? preFilteredRows[0].values[id] : 0

    preFilteredRows.forEach((row: any) => {
      min_ = Math.min(row.values[id], min_)
      max_ = Math.max(row.values[id], max_)
    })

    return [min_, max_]
  }, [id, preFilteredRows])

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 1, minWidth: 120 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={filterValue || [min, max]}
        onChange={(event: Event, newValue: number | number[]) => {
          setFilter(newValue)
        }}
        valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
        disableSwap
      />
      <Tooltip title="Reset">
        <IconButton size="small" color="error" onClick={() => setFilter(undefined)}>
          <IconX />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}
export function CustomSliderRangeColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  const [min, max] = useMemo(() => {
    const min_ = 1
    const max_ = 24
    return [min_, max_]
  }, [])

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 1, minWidth: 120 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={filterValue || [min, max]}
        onChange={(event: Event, newValue: number | number[]) => {
          setFilter(newValue)
        }}
        valueLabelDisplay="auto"
        disableSwap
        min={min}
        max={max}
      />
      <Tooltip title="Reset">
        <IconButton size="small" color="error" onClick={() => setFilter(undefined)}>
          <IconX />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}

export function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}: any) {
  const [min, max] = useMemo(() => {
    let min_ = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max_ = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach((row: any) => {
      min_ = Math.min(row.values[id], min_)
      max_ = Math.max(row.values[id], max_)
    })
    return [min_, max_]
  }, [id, preFilteredRows])

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 168, maxWidth: 250 }}>
      <TextField
        fullWidth
        value={filterValue[0] || ''}
        type="number"
        onChange={(e) => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        size="small"
      />
      <IconLine />
      <TextField
        fullWidth
        value={filterValue[1] || ''}
        type="number"
        onChange={(e) => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        size="small"
      />
    </Stack>
  )
}

function fuzzyTextFilterFn(rows: any, id: string | number, filterValue: any) {
  return matchSorter(rows, filterValue, { keys: [(row: any) => row.values[id]] })
}

fuzzyTextFilterFn.autoRemove = (val: any) => !val

export const renderFilterTypes = () => ({
  fuzzyText: fuzzyTextFilterFn,
  text: (rows: Row[], id: string, filterValue: string) => {
    rows.filter((row: Row) => {
      const rowValue = row.values[id]
      return rowValue !== undefined
        ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
        : true
    })
  },
})

export function filterGreaterThan(rows: any[], id: string | number, filterValue: number) {
  return rows.filter((row: any) => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number'

export function useControlledState(state: any, { instance }: any) {
  return useMemo(() => {
    if (state.groupBy.length) {
      return {
        ...state,
        hiddenColumns: [...state.hiddenColumns, ...state.groupBy].filter(
          (d, i, all) => all.indexOf(d) === i
        ),
      }
    }
    return state
  }, [state])
}

export function roundedMedian(leafValues: any) {
  let min = leafValues[0] || 0
  let max = leafValues[0] || 0

  leafValues.forEach((value: number) => {
    min = Math.min(min, value)
    max = Math.max(max, value)
  })

  return Math.round((min + max) / 2)
}
