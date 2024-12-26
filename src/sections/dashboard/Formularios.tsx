import type { Theme, SxProps } from '@mui/material'

import { useState } from 'react'

import { Stack, Button, MenuItem, TextField } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
  backgroundColor: 'background.paper',
}

const FORMS = [
  { value: 'formulario_22', label: 'Formulario 22' },
  { value: 'formulario_29', label: 'Formulario 29' },
  { value: 'formulario_50', label: 'Formulario 50' },
  { value: 'formulario_3600', label: 'Formulario 3600' },
]

const YEARS = [
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
]

export function Formularios({ datos }: { datos: { sociedad: string | null } }) {
  const [period, setPeriod] = useState('')
  const [form, setForm] = useState('')
  const [search, setSearch] = useState(false)

  return (
    <section>
      <ComponentBox title="Formularios" sx={componentBoxStyles}>
        <Stack spacing={2} direction="row">
          <TextField
            variant="outlined"
            select
            fullWidth
            label="Reporte"
            size="small"
            value={form}
            onChange={(event) => setForm(event.target.value)}
          >
            {FORMS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            select
            fullWidth
            label="Período"
            size="small"
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
          >
            {YEARS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            disabled={!period}
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => setSearch(!search)}
          >
            Buscar
          </Button>
        </Stack>
      </ComponentBox>
    </section>
  )
}
