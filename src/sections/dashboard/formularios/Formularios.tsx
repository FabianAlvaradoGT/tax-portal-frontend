import type { Company } from 'src/sections/dashboard/useSearch'

import { useState } from 'react'

import { Stack, Button, MenuItem, TextField } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'

import { componentBoxStyles } from 'src/sections/dashboard/index'

import { FORMS, YEARS } from './useFormularios'

export function Formularios({ datos }: { datos: { sociedad: Company | null } }) {
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
            sx={{ backgroundColor: 'background.paper' }}
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
            sx={{ backgroundColor: 'background.paper' }}
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
            sx={{ backgroundColor: 'background.paper' }}
            onClick={() => setSearch(!search)}
          >
            Buscar
          </Button>
        </Stack>
      </ComponentBox>
    </section>
  )
}
