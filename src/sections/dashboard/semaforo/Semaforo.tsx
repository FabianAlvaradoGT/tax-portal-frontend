import type { Theme, SxProps } from '@mui/material'
import type { Company } from 'src/sections/dashboard/useSearch'

import { toast } from 'sonner'
import { useState, useEffect } from 'react'

import { useTheme } from '@mui/material/styles'
import {
  Table,
  Tooltip,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
} from '@mui/material'

import { CircleIcon } from 'src/components/others/CircleIcon'
import { TableLoading } from 'src/components/table/table-loading'
import { ComponentBox } from 'src/components/layout/component-box'

import { getForms } from './useSemaforo'

import type { Forms } from './useSemaforo'

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
  backgroundColor: 'background.paper',
}

export function Semaforo({ datos }: { datos: { sociedad: Company | null } }) {
  const theme = useTheme()

  const [data, setData] = useState<Forms[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getForms(datos.sociedad?.uuid || '')
      .then((d) => {
        setData(d)
      })
      .catch((err) => {
        const errorMessage = err.detail || 'Error al cargar los datos'
        toast.error(errorMessage)
        setError(errorMessage)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [datos.sociedad?.uuid])

  const allPeriods = data.flatMap((item) => item.data).map((item) => item.periodo)
  const maxPeriod = Math.max(...allPeriods)
  const minPeriod = Math.min(...allPeriods)

  return (
    <section>
      <ComponentBox title="Semáforo Observaciones" sx={componentBoxStyles}>
        <TableContainer sx={{ width: '100%' }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '2px',
              width: '700px',
              margin: 'auto',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" />
                {Array.from({ length: maxPeriod - minPeriod + 1 }, (_, i) => i + minPeriod)
                  .sort((a, b) => b - a)
                  .map((period) => (
                    <TableCell key={period} align="center">
                      <b>{period}</b>
                    </TableCell>
                  ))}
              </TableRow>
              <TableRow />
            </TableHead>
            <TableBody>
              {error && (
                <TableRow>
                  <TableCell colSpan={maxPeriod - minPeriod + 2} align="center">
                    {error}
                  </TableCell>
                </TableRow>
              )}

              {loading && (
                <TableRow>
                  <TableCell colSpan={maxPeriod - minPeriod + 2} align="center">
                    <TableLoading />
                  </TableCell>
                </TableRow>
              )}

              {data.length == 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={maxPeriod - minPeriod + 2} align="center">
                    No hay datos
                  </TableCell>
                </TableRow>
              )}

              {data.length > 0 &&
                data.map(
                  (
                    item: {
                      form_name: string
                      data: { periodo: number; observaciones: number }[]
                    },
                    index: number
                  ) => (
                    <TableRow key={index}>
                      <TableCell>{item.form_name}</TableCell>

                      {Array.from({ length: maxPeriod - minPeriod + 1 }, (_, i) => i + minPeriod)
                        .sort((a, b) => b - a)
                        .map((period, indexRow) => {
                          const countObservaciones =
                            item.data.find((entry) => entry.periodo === period)?.observaciones || 0
                          const colors =
                            countObservaciones === 0
                              ? theme.palette.success.main
                              : countObservaciones < 3
                                ? theme.palette.warning.light
                                : theme.palette.error.main
                          return (
                            <TableCell key={indexRow} align="center">
                              <Tooltip title={`Observaciones: ${countObservaciones}`}>
                                <CircleIcon color={colors} height={30} width={30} />
                              </Tooltip>
                            </TableCell>
                          )
                        })}
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </ComponentBox>
    </section>
  )
}
