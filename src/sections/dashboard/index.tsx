import { toast } from 'sonner'
import { useState, useEffect } from 'react'

import { Alert, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/dashboard'

import { Info } from './Info'
import { Search } from './Search'
import { Semaforo } from './Semaforo'
import { Formularios } from './Formularios'
import { Notificaciones } from './Notificaciones'
import { getCompanyAll } from './services/useSearch'
import { DeclaracionesJuradas } from './DeclaracionesJuradas'

import type { Company } from './services/useSearch'

// ----------------------------------------------------------------------

type Props = {
  title?: string
}

export function DashboardView({ title = 'Blank' }: Props) {
  const [data, setData] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCompanyAll()
      .then((d) => {
        setData(d)
      })
      .catch((err) => {
        const errorMessage = err.detail || 'Error al cargar los datos'
        toast.error(errorMessage)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const [sociedad, setSociedad] = useState<Company | null>(null)

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>

      <Stack spacing={3} direction="column">
        <Search datos={{ sociedad, setSociedad, data, loading }} />

        {sociedad ? (
          <>
            <Info datos={{ sociedad, data }} />
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
