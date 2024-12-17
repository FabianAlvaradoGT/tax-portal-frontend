import { useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/dashboard'

import { useAuthContext } from 'src/auth/hooks'

// ----------------------------------------------------------------------

type Props = {
  title?: string
}

export function HomeView({ title = 'Blank' }: Props) {
  const { user } = useAuthContext()
  const theme = useTheme()
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>

      <Typography variant="h3">
        Bienvenido <span style={{ color: theme.palette.primary.main }}>{user?.displayName}</span> a
        Tax Portal ⚙️🤖🦾
      </Typography>

      <Typography variant="h5" sx={{ mt: 5 }}>
        🚧 En construcción
      </Typography>
    </DashboardContent>
  )
}
