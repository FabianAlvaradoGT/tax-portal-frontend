import { useState } from 'react'

import { Alert, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/dashboard'

import { Info } from './Info'
import { Search } from './Search'
import { Semaforo } from './Semaforo'
import { Formularios } from './Formularios'
import { Notificaciones } from './Notificaciones'
import { DeclaracionesJuradas } from './DeclaracionesJuradas'

import type { Data } from './services/dataReducer'

// ----------------------------------------------------------------------

type Props = {
  title?: string
}

export function DashboardView({ title = 'Blank' }: Props) {
  const [sociedad, setSociedad] = useState<Data | null>(null)
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>

      <Stack spacing={3} direction="column">
        <Search datos={{ sociedad, setSociedad }} />

        {sociedad ? (
          <>
            <Info datos={{ sociedad, setSociedad }} />
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
  )
}
