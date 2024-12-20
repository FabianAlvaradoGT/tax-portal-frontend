import { useState } from 'react'

import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/dashboard'

import { Info } from './Info'
import { Reportes } from './Reportes'
import { Semaforo } from './Semaforo'
import { Notificaciones } from './Notificaciones'

// ----------------------------------------------------------------------

type Props = {
  title?: string
}

export function DashboardView({ title = 'Blank' }: Props) {
  const [sociedad, setSociedad] = useState<string | null>(null)
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>

      <Stack spacing={3} direction="column">
        <Info datos={{ sociedad, setSociedad }} />
        <Semaforo datos={{ sociedad }} />
        <Reportes />
        <Notificaciones />
      </Stack>
    </DashboardContent>
  )
}
