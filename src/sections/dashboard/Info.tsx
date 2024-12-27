import type { Theme, SxProps } from '@mui/material'

import { Stack, Alert, TextField } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'

import { sociedadesOptions } from './services/useDashboard'

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
}

export function Info({ datos }: { datos: { sociedad: string | null; setSociedad: any } }) {
  const { sociedad } = datos

  return (
    <section style={{ marginTop: '25px' }}>
      <ComponentBox title="Datos Básicos" sx={componentBoxStyles}>
        {sociedad ? (
          <>
            <Stack spacing={2} direction={{ xs: 'row', sm: 'row' }}>
              <TextField
                label="Correo"
                value={sociedadesOptions.find((society) => society.title === sociedad)?.email || ''}
                size="small"
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={{ backgroundColor: 'background.paper' }}
              />
              <TextField
                label="Domicilio"
                value={
                  sociedadesOptions.find((society) => society.title === sociedad)?.domicilio || ''
                }
                size="small"
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={{ backgroundColor: 'background.paper' }}
              />
            </Stack>
            <Stack spacing={2} direction={{ xs: 'row', sm: 'row' }}>
              <TextField
                label="Regimen Tributario"
                value={
                  sociedadesOptions.find((society) => society.title === sociedad)
                    ?.regimenTributario || ''
                }
                size="small"
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={{ backgroundColor: 'background.paper' }}
              />
              <TextField
                label="Actividad Económica Principal"
                value={
                  sociedadesOptions.find((society) => society.title === sociedad)
                    ?.actividadEconomicaPrincipal || ''
                }
                size="small"
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={{ backgroundColor: 'background.paper' }}
              />
            </Stack>
          </>
        ) : (
          <Alert severity="info" variant="outlined">
            Seleccione una sociedad para ver el semáforo
          </Alert>
        )}
      </ComponentBox>
    </section>
  )
}
