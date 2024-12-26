import type { Theme, SxProps } from '@mui/material'

import { Alert, Stack, Button, MenuItem, TextField } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
  backgroundColor: 'background.paper',
}

const YEARS = [
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
]

export function DeclaracionesJuradas({ datos }: { datos: { sociedad: string | null } }) {
  return (
    <section>
      <ComponentBox title="Declaraciones Juradas" sx={componentBoxStyles}>
        {datos.sociedad ? (
          <Stack spacing={2} direction="row">
            <TextField variant="outlined" select fullWidth label="Período" size="small">
              {YEARS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="outlined" color="secondary" fullWidth>
              Buscar
            </Button>
          </Stack>
        ) : (
          <Alert severity="info" variant="outlined">
            Seleccione una sociedad para ver las declaraciones juradas.
          </Alert>
        )}
      </ComponentBox>
    </section>
  )
}
