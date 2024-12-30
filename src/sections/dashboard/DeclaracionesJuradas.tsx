import type { Theme, SxProps } from '@mui/material'

import { toast } from 'sonner'
import { useState, useEffect } from 'react'

import { Stack, Button, Divider, TextField, Autocomplete } from '@mui/material'

import { TablePagination } from 'src/components/table/table'
import { ComponentBox } from 'src/components/layout/component-box'

import { YEARS } from './services/useFormularios'
import { COLUMNS, getDeclaracionesJuradas } from './services/useDeclaracionesJuradas'

import type { Company } from './services/useSearch'
import type { DDJJ } from './services/useDeclaracionesJuradas'

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
            <TablePagination columns={COLUMNS} data={data} loading={loading} />
          </>
        )}
      </ComponentBox>
    </section>
  )
}
