import type { Theme, SxProps } from '@mui/material'

import { Stack, Alert, TextField } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'

import { sociedadesOptions } from './services/useDashboard'

import type { Data } from './services/dataReducer'

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
}

export function Info({ datos }: { datos: { sociedad: Data | null; setSociedad: any } }) {
  const { sociedad } = datos
  const search = sociedadesOptions.find((society) => society.razon_social === sociedad.razon_social)

  return (
    <section style={{ marginTop: '25px' }}>
      <ComponentBox title="Datos Básicos" sx={componentBoxStyles}>
        {sociedad ? (
          <Stack spacing={2} direction={{ xs: 'row', sm: 'row' }}>
            <TextField
              label="Correo"
              value={search?.email || 'Sin correo'}
              size="small"
              fullWidth
              disabled={search?.email === null}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ backgroundColor: 'background.paper' }}
            />
            <TextField
              label="Domicilio"
              value={search?.domicilio || 'Sin domicilio'}
              size="small"
              fullWidth
              disabled={search?.domicilio === null}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ backgroundColor: 'background.paper' }}
            />
          </Stack>
        ) : (
          <Alert severity="info" variant="outlined">
            Seleccione una sociedad para ver el semáforo
          </Alert>
        )}
      </ComponentBox>
    </section>
  )
}
