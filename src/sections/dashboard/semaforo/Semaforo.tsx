import type { Company } from 'src/sections/dashboard/useSearch'

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

import { componentBoxStyles } from 'src/sections/dashboard/index'

import { useGetForms } from './useSemaforo'

export function Semaforo({ datos }: { datos: { sociedad: Company | null } }) {
  const theme = useTheme()
  const forms = useGetForms(datos.sociedad?.uuid || '')

  const allPeriods = forms.data.flatMap((item) => item.data).map((item) => item.periodo)
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
              backgroundColor: 'background.paper',
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
              {forms.isError && (
                <TableRow>
                  <TableCell colSpan={maxPeriod - minPeriod + 2} align="center">
                    {forms.error.detail}
                  </TableCell>
                </TableRow>
              )}

              {forms.isFetching && (
                <TableRow>
                  <TableCell colSpan={maxPeriod - minPeriod + 2} align="center">
                    <TableLoading />
                  </TableCell>
                </TableRow>
              )}

              {forms.data.length == 0 && !forms.isFetching && !forms.isError && (
                <TableRow>
                  <TableCell colSpan={maxPeriod - minPeriod + 2} align="center">
                    No hay datos
                  </TableCell>
                </TableRow>
              )}

              {forms.data.length > 0 &&
                forms.data.map(
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
