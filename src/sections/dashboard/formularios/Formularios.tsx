import type { Company } from 'src/sections/dashboard/dashboardService'

import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { useBoolean } from 'minimal-shared/hooks'
import { useQueryClient } from '@tanstack/react-query'

import { useTheme } from '@mui/material/styles'
import { Stack, Button, Divider, TextField, Autocomplete } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'
import { ReactTable } from 'src/components/react-table/ReactTableTemplate'

import { componentBoxStyles } from 'src/sections/dashboard/index'
import { useDashboard } from 'src/sections/dashboard/dashboardContext'

import { DialogFormularios } from './DialogF29'
import { YEARS, forms, useGetObservations, useDownloadDocument } from './FormulariosService'

import type { Observation } from './FormulariosService'

interface DialogData {
  title?: string
  content: { [key: string]: string }[]
}

export function Formularios({ datos }: { datos: { sociedad: Company | null } }) {
  const theme = useTheme()
  const queryClient = useQueryClient()
  const [period, setPeriod] = useState('')
  const [form, setForm] = useState('')
  const [search, setSearch] = useState(false)
  const openDialog = useBoolean(false)

  const { typesForms, company } = useDashboard()
  const observations = useGetObservations(form, datos.sociedad?.uuid || '', period)
  const downloadDocument = useDownloadDocument()

  const [dialogData, setDialogData] = useState<DialogData>({
    title: '',
    content: [],
  })

  const formName = typesForms.data?.find((option) => option.uuid === form)?.tipo_archivo || ''
  const handleDownload = async (infoPayload: {
    uuid_sociedad: string
    uuid_tipo_archivo: string
    extension_file: string
    period: string
    name: string
  }) => {
    const payload = {
      ...infoPayload,
    }

    const toastId = toast.loading('Descargando archivo...')

    downloadDocument.mutate(
      { ...payload },
      {
        onSuccess: (blob) => {
          const blobURL = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = blobURL

          const nameCompany =
            company.data?.find((c) => c.uuid === infoPayload.uuid_sociedad)?.razon_social ||
            'empresa'

          link.setAttribute(
            'download',
            `${nameCompany}_${infoPayload.name}_${infoPayload.period}.${infoPayload.extension_file}`
          )
          document.body.appendChild(link)
          link.click()
          link.remove()
          URL.revokeObjectURL(blobURL)
          toast.success('Archivo descargado exitosamente!', { id: toastId })
        },
        onError: (error) => {
          toast.error('Error al descargar el archivo. Intenta nuevamente.', { id: toastId })
        },
      }
    )
  }

  const columns =
    forms[formName]?.(
      theme,
      setDialogData,
      openDialog,
      handleDownload,
      {
        uuid_sociedad: datos.sociedad?.uuid,
        uuid_tipo_archivo: form,
        year: period,
        name: formName,
      },
      downloadDocument.isPending
    ) || []

  useEffect(() => {
    if (typesForms.isError) {
      const errorMessage = typesForms.error || 'Error al cargar los datos'
      toast.error(errorMessage.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typesForms.isError])

  const handleSearch = () => {
    setSearch(true)
    queryClient.resetQueries({ queryKey: ['observations'] })

    if (period === '' || form === '') return

    observations.refetch()

    if (observations.isError) {
      const errorMessage = observations.error || 'Error al cargar los datos'
      toast.error(errorMessage.detail)
    }
  }

  useEffect(() => {
    if (period === '') {
      setSearch(false)
    }
  }, [period])

  useEffect(() => {
    setSearch(false)
    setPeriod('')
  }, [datos.sociedad?.uuid])

  return (
    <section>
      <ComponentBox title="Formularios" sx={componentBoxStyles}>
        <Stack spacing={2} direction="row">
          <Autocomplete
            id="forms"
            options={typesForms.data || []}
            size="small"
            sx={{ backgroundColor: 'background.paper' }}
            fullWidth
            value={typesForms.data?.find((option) => option.uuid === form) || null}
            getOptionLabel={(option) => option.tipo_archivo}
            renderInput={(params) => <TextField {...params} label="Reportes" variant="outlined" />}
            loading={typesForms.isFetching}
            onChange={(event, newValue) => {
              setForm(newValue?.uuid || '')
              setSearch(false)
              queryClient.resetQueries({ queryKey: ['observations'] })
            }}
          />

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
              setSearch(false)
              queryClient.resetQueries({ queryKey: ['observations'] })
            }}
          />

          <Button
            disabled={!period || !form}
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ backgroundColor: 'background.paper' }}
            onClick={() => handleSearch()}
          >
            Buscar
          </Button>
        </Stack>
        {search && (
          <>
            <Divider />
            <ReactTable
              columns={columns}
              data={observations.data?.data || ([] as Observation[])}
              getHeaderProps={(column: any) => column.getSortByToggleProps()}
              loading={{ table: observations.isFetching }}
              error={observations.isError ? observations.error.detail : null}
              fieldSortBy={false}
              orderBy="mes"
            />
            <DialogFormularios openDialog={openDialog} data={dialogData} />
          </>
        )}
      </ComponentBox>
    </section>
  )
}
