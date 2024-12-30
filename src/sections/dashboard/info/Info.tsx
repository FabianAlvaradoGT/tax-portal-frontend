import type { Company } from 'src/sections/dashboard/useSearch'

import { Stack, Alert, TextField } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'

import { componentBoxStyles } from 'src/sections/dashboard/index'

export function Info({ datos }: { datos: { sociedad: Company | null; data: Company[] } }) {
  const { sociedad, data } = datos
  const societyFind = data.find((society) => society?.razon_social === sociedad?.razon_social)

  return (
    <section style={{ marginTop: '25px' }}>
      <ComponentBox
        title={`Datos Básicos - ${sociedad?.razon_social} - ${sociedad?.rut}`}
        sx={componentBoxStyles}
      >
        {sociedad ? (
          <Stack spacing={2} direction={{ xs: 'row', sm: 'row' }}>
            <TextField
              label="Correo"
              value={societyFind?.email || 'Sin correo'}
              size="small"
              fullWidth
              disabled={sociedad?.email === null}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{ backgroundColor: 'background.paper' }}
            />
            <TextField
              label="Domicilio"
              value={societyFind?.domicilio || 'Sin domicilio'}
              size="small"
              disabled={sociedad?.domicilio === null}
              fullWidth
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
