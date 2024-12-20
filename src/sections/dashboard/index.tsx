import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/dashboard'

import { Info } from './Info'
import { Reportes } from './Reportes'
import { Observaciones } from './Observaciones'
import { Notificaciones } from './Notificaciones'

// ----------------------------------------------------------------------

type Props = {
  title?: string
}

export function DashboardView({ title = 'Blank' }: Props) {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>

      <Info />
      <Observaciones />
      <Reportes />
      <Notificaciones />
    </DashboardContent>
  )
}
