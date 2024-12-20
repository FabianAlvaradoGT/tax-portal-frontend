import type { Theme, SxProps } from '@mui/material'

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

import { ComponentBox } from 'src/components/layout/component-box'

import { CircleIcon } from './CircleIcon'
import { dataSemaforo } from './useDashboard'

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
                          ? '#00ff00'
                          : countObservaciones < 3
                            ? '#ffff00'
                            : '#ff0000'
                      return (
                        <TableCell key={indexRow} align="center">
                          <Tooltip title={`Observaciones: ${countObservaciones}`}>
                            <CircleIcon color={colors} height={30} />
                          </Tooltip>
                        </TableCell>
                      )
                    })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ComponentBox>
    </section>
  )
}
