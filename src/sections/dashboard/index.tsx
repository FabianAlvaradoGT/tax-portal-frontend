import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/dashboard'

// ----------------------------------------------------------------------

type Props = {
  title?: string
}

export function DashboardView({ title = 'Blank' }: Props) {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>
      <Typography variant="h5" sx={{ mt: 5 }}>
        🚧 En construcción
      </Typography>
    </DashboardContent>
  )
}
