import type { Theme, SxProps } from '@mui/material'

import { useTheme } from '@mui/material/styles'
import {
  Table,
  Alert,
  Tooltip,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
} from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'

import { CircleIcon } from './CircleIcon'
import { dataSemaforo } from './services/useDashboard'

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
  backgroundColor: 'background.paper',
}

export function Semaforo({ datos }: { datos: { sociedad: string | null } }) {
  const theme = useTheme()

  const data = dataSemaforo()

  const allPeriods = data.flatMap((item) => item.data).map((entry) => entry.periodo)
  const maxPeriod = Math.max(...allPeriods)
  const minPeriod = Math.min(...allPeriods)

  return (
    <section>
      <ComponentBox title="Semáforo Observaciones" sx={componentBoxStyles}>
        {datos.sociedad ? (
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
                {data.map((item, index) => (
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info" variant="outlined">
            Seleccione una sociedad para ver el semáforo
          </Alert>
        )}
      </ComponentBox>
    </section>
  )
}
