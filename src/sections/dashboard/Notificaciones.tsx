import type { Theme, SxProps } from '@mui/material'

import { useState } from 'react'

import { Stack, Button, Divider, MenuItem, TextField } from '@mui/material'

import { TablePagination } from 'src/components/table/table'
import { ComponentBox } from 'src/components/layout/component-box'

import { YEARS } from './services/useDeclaracionesJuradas'
import { COLUMNS, TABLE_DATA } from './services/useNotifications'

import type { Data } from './services/dataReducer'

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
  backgroundColor: 'background.paper',
}

export function Notificaciones({ datos }: { datos: { sociedad: Data | null } }) {
  const [period, setPeriod] = useState('')
  const [search, setSearch] = useState(false)

  return (
    <section>
      <ComponentBox title="Notificaciones" sx={componentBoxStyles}>
        <Stack spacing={2} direction="row">
          <TextField
            variant="outlined"
            select
            fullWidth
            label="Período"
            size="small"
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
          >
            {YEARS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            color="secondary"
            disabled={!period}
            fullWidth
            onClick={() => setSearch(!search)}
          >
            Buscar
          </Button>
        </Stack>

        {search && (
          <>
            <Divider />
            <TablePagination columns={COLUMNS} data={TABLE_DATA} />
          </>
        )}
      </ComponentBox>
    </section>
  )
}
