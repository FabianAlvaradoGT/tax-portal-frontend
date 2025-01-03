import type { Theme, SxProps } from '@mui/material'

import { useState } from 'react'

import { Alert, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/dashboard'

import { Info } from './info/Info'
import { Search } from './search/Search'
import { Semaforo } from './semaforo/Semaforo'
import { DashboardProvider } from './dashboardContext'
import { Formularios } from './formularios/Formularios'
import { Notificaciones } from './notificaciones/Notificaciones'
import { DeclaracionesJuradas } from './declaraciones-juradas/DeclaracionesJuradas'

import type { Company } from './useSearch'

export const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
  // backgroundColor: 'background.paper',
}

// ----------------------------------------------------------------------

type Props = {
  title?: string
}

export function DashboardView({ title = 'Blank' }: Props) {
  const [sociedad, setSociedad] = useState<Company | null>(null)

  return (
    <DashboardProvider>
      <DashboardContent maxWidth="xl">
        <Typography variant="h4"> {title} </Typography>

        <Stack spacing={3} direction="column">
          <Search datos={{ sociedad, setSociedad }} />

          {sociedad ? (
            <>
              <Info datos={{ sociedad }} />
              <Semaforo datos={{ sociedad }} />
              <Formularios datos={{ sociedad }} />
              <DeclaracionesJuradas datos={{ sociedad }} />
              <Notificaciones datos={{ sociedad }} />
            </>
          ) : (
            <Alert severity="info" variant="outlined">
              Seleccione una sociedad para ver los formularios.
            </Alert>
          )}
        </Stack>
      </DashboardContent>
    </DashboardProvider>
  )
}
