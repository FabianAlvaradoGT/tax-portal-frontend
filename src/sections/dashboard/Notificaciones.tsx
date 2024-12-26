import type { Theme, SxProps } from '@mui/material'

import { Alert } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
  backgroundColor: 'background.paper',
}

export function Notificaciones({ datos }: { datos: { sociedad: string | null } }) {
  return (
    <section>
      <ComponentBox title="Notificaciones" sx={componentBoxStyles}>
        {datos.sociedad ? (
          <>Tabla</>
        ) : (
          <Alert severity="info" variant="outlined">
            Seleccione una sociedad para ver las notificaciones.
          </Alert>
        )}
      </ComponentBox>
    </section>
  )
}
