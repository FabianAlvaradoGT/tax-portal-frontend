import type { Company } from 'src/sections/dashboard/useSearch'

import { toast } from 'sonner'
import { useBoolean } from 'minimal-shared/hooks'
import { useMemo, useState, useEffect } from 'react'

import { Stack, Button, Divider, Skeleton, TextField, Autocomplete } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'
import { DialogMarkdown } from 'src/components/markdown/DialogMarkdown'
import { ReactTable } from 'src/components/react-table/ReactTableTemplate'

import { componentBoxStyles } from 'src/sections/dashboard/index'

import { NotificationesColumns } from './Columns'
import { YEARS, getNotification } from './useNotifications'

import type { Notification } from './useNotifications'

export function Notificaciones({ datos }: { datos: { sociedad: Company | null } }) {
  const [period, setPeriod] = useState('')
  const [search, setSearch] = useState(false)

  const [data, setData] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const openDialog = useBoolean(false)

  const [dialogSetting, setDialogSetting] = useState('')

  const handleSearch = () => {
    setSearch(true)
    setLoading(true)
    setData([])

    if (period === '') return

    getNotification(datos.sociedad?.uuid || '')
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
  }

  useEffect(() => {
    if (period === '') {
      setSearch(false)
      setData([])
    }
  }, [period])

  const columns = NotificationesColumns(setDialogSetting, openDialog)

  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column: any) => ({
            ...column,
            Cell: <Skeleton />,
          }))
        : columns,
    [loading, columns]
  )

  return (
    <section>
      <ComponentBox title="Notificaciones" sx={componentBoxStyles}>
        <Stack spacing={2} direction="row">
          <Autocomplete
            id="period"
            options={YEARS}
            size="small"
            sx={{ backgroundColor: 'background.paper' }}
            fullWidth
            value={YEARS.find((option) => option.value === period) || null}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Periodo" variant="outlined" />}
            onChange={(event, newValue) => {
              setPeriod(newValue?.value || '')
            }}
          />
          <Button
            variant="outlined"
            color="secondary"
            disabled={!period}
            sx={{ backgroundColor: 'background.paper' }}
            fullWidth
            onClick={() => handleSearch()}
          >
            Buscar
          </Button>
        </Stack>

        {search && (
          <>
            <Divider />
            <ReactTable
              columns={tableColumns}
              data={data}
              getHeaderProps={(column: any) => column.getSortByToggleProps()}
              loading={{ table: loading }}
              error={error ?? false}
              fieldSortBy={false}
              orderBy="id"
            />
            <DialogMarkdown openDialog={openDialog} markdownContent={dialogSetting} />
          </>
        )}
      </ComponentBox>
    </section>
  )
}
