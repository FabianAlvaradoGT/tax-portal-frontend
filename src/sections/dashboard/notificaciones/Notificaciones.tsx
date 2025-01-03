import type { Company } from 'src/sections/dashboard/useSearch'

import { toast } from 'sonner'
import { useBoolean } from 'minimal-shared/hooks'
import { useMemo, useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { Stack, Button, Divider, Skeleton, TextField, Autocomplete } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'
import { DialogMarkdown } from 'src/components/markdown/DialogMarkdown'
import { ReactTable } from 'src/components/react-table/ReactTableTemplate'

import { componentBoxStyles } from 'src/sections/dashboard/index'

import { NotificationesColumns } from './Columns'
import { YEARS, useNotifications } from './useNotifications'

export function Notificaciones({ datos }: { datos: { sociedad: Company | null } }) {
  const queryClient = useQueryClient()
  const notifications = useNotifications(datos.sociedad?.uuid || '')
  const [period, setPeriod] = useState('')
  const [search, setSearch] = useState(false)
  const openDialog = useBoolean(false)

  const [dialogSetting, setDialogSetting] = useState({
    title: '',
    content: '',
  })

  const handleSearch = () => {
    setSearch(true)
    queryClient.resetQueries({ queryKey: ['notifications'] })

    if (period === '') return

    notifications.refetch()

    if (notifications.isError) {
      const errorMessage = notifications.error || 'Error al cargar los datos'
      toast.error(errorMessage.detail)
    }
  }

  useEffect(() => {
    if (period === '') {
      setSearch(false)
      queryClient.resetQueries({ queryKey: ['notifications'] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period])

  useEffect(() => {
    setSearch(false)
    setPeriod('')
    queryClient.resetQueries({ queryKey: ['notifications'] })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datos.sociedad?.uuid])

  const columns = NotificationesColumns(setDialogSetting, openDialog)

  const tableColumns = useMemo(
    () =>
      notifications.isFetching
        ? columns.map((column: any) => ({
            ...column,
            Cell: <Skeleton />,
          }))
        : columns,
    [notifications.isFetching, columns]
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
              data={notifications.data}
              getHeaderProps={(column: any) => column.getSortByToggleProps()}
              loading={{ table: notifications.isFetching }}
              error={notifications.isError ? notifications.error.detail : null}
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
