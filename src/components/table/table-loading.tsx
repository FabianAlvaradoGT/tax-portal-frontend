import { Stack, CircularProgress } from '@mui/material'

export const TableLoading = () => (
  <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
    <CircularProgress />
    <span>Consultando...</span>
  </Stack>
)
