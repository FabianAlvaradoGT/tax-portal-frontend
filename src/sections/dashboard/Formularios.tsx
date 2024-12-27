import type { Theme, SxProps } from '@mui/material'

import { useState } from 'react'

import { Stack, Button, MenuItem, TextField } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'

import { FORMS, YEARS } from './services/useFormularios'

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
  backgroundColor: 'background.paper',
}

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
            name="form"
            onChange={(event) => {
              setForm(event.target.value)
            }}
          >
            {FORMS.map((option) => (
              <MenuItem key={option.uuid} value={option.uuid}>
                {option.tipo_archivo}
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
