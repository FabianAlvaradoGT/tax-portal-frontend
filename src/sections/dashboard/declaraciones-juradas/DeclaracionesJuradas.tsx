import type { Theme, SxProps } from '@mui/material'
import type { Company } from 'src/sections/dashboard/useSearch'

import { toast } from 'sonner'
import { useMemo, useState, useEffect } from 'react'

import { Stack, Button, Divider, Skeleton, TextField, Autocomplete } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'
import { ReactTable } from 'src/components/react-table/ReactTableTemplate'

import { DeclaracionesJuradasColumns } from './Columns'
import { YEARS, getDeclaracionesJuradas } from './useDeclaracionesJuradas'

import type { DDJJ } from './useDeclaracionesJuradas'

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
  backgroundColor: 'background.paper',
}

// ----------------------------------------------------------------------

export function DeclaracionesJuradas({ datos }: { datos: { sociedad: Company | null } }) {
  const [period, setPeriod] = useState('')
  const [search, setSearch] = useState(false)

  const [data, setData] = useState<DDJJ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleSearch = () => {
    setSearch(true)
    setLoading(true)
    setData([])

    if (period === '') return

    getDeclaracionesJuradas(datos.sociedad?.uuid || '', period)
      .then((d) => {
        setData(d)
      })
      .catch((err) => {
        const errorMessage = err.detail || 'Error al cargar los datos'
        toast.error(errorMessage)
        setError(errorMessage)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (period === '') {
      setSearch(false)
      setData([])
    }
  }, [period])

  const columns = DeclaracionesJuradasColumns()
  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column: any) => ({
            ...column,
            Cell: <Skeleton />,
          }))
        : columns,
    [loading, columns]
  )

  return (
    <section>
      <ComponentBox title="Declaraciones Juradas" sx={componentBoxStyles}>
        <Stack spacing={2} direction="row">
          <Autocomplete
            id="period"
            options={YEARS}
            size="small"
            sx={{ backgroundColor: 'background.paper' }}
            fullWidth
            value={YEARS.find((option) => option.value === period) || null}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Periodo" variant="outlined" />}
            onChange={(event, newValue) => {
              setPeriod(newValue?.value || '')
            }}
          />

          <Button
            variant="outlined"
            color="secondary"
            disabled={!period}
            fullWidth
            onClick={() => handleSearch()}
          >
            Buscar
          </Button>
          <Button
            variant="outlined"
            color="success"
            disabled={!period}
            fullWidth
            onClick={() => {}}
          >
            Descargar
          </Button>
        </Stack>

        {search && (
          <>
            <Divider />
            <ReactTable
              columns={tableColumns}
              data={data}
              getHeaderProps={(column: any) => column.getSortByToggleProps()}
              loading={{ table: loading }}
              error={error ?? false}
              fieldSortBy={false}
              orderBy="id"
            />
          </>
        )}
      </ComponentBox>
    </section>
  )
}
