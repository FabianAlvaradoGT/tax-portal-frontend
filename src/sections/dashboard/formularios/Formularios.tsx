import type { Company } from 'src/sections/dashboard/useSearch'

import { toast } from 'sonner'
import { useBoolean } from 'minimal-shared/hooks'
import { useMemo, useState, useEffect } from 'react'

import { useTheme } from '@mui/material/styles'
import { Stack, Button, Divider, Skeleton, TextField, Autocomplete } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'
import { ReactTable } from 'src/components/react-table/ReactTableTemplate'

import { componentBoxStyles } from 'src/sections/dashboard/index'

import { DialogFormularios } from './DialogF29'
import { YEARS, forms, getTypeForms, getObservations, postDownloadDocument } from './useFormularios'

import type { TypeForms, DataObservation } from './useFormularios'

interface DialogData {
  title?: string
  content: { [key: string]: string }[]
}

export function Formularios({ datos }: { datos: { sociedad: Company | null } }) {
  const theme = useTheme()
  const [period, setPeriod] = useState('')
  const [form, setForm] = useState('')
  const [search, setSearch] = useState(false)
  const openDialog = useBoolean(false)

  const [dialogData, setDialogData] = useState<DialogData>({
    title: '',
    content: [],
  })

  const [dataTypeForms, setDataTypeForms] = useState<TypeForms[]>([])
  const [data, setData] = useState<DataObservation[]>([])
  const [loading, setLoading] = useState({
    typeForm: false,
    data: false,
  })
  const [error, setError] = useState({
    typeForm: '',
    data: '',
  })

  const formName = dataTypeForms.find((option) => option.uuid === form)?.tipo_archivo || ''
  const handleDownload = async (infoPayload: {
    uuid_sociedad: string
    uuid_tipo_archivo: string
    extension_file: string
    period: string
    name: string
  }) => {
    const payload = {
      uuid_tipo_archivo: infoPayload.uuid_tipo_archivo,
      uuid_sociedad: infoPayload.uuid_sociedad,
      period: infoPayload.period,
      extension_file: infoPayload.extension_file,
    }

    const toastId = toast.loading('Descargando archivo...')

    try {
      const response = await postDownloadDocument(payload)

      const downloadUrl = window.URL.createObjectURL(response)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute(
        'download',
        `${infoPayload.name}_${infoPayload.period}.${infoPayload.extension_file}`
      )
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(downloadUrl)

      toast.success('Archivo descargado exitosamente!', { id: toastId })
    } catch (e) {
      toast.error('Error al descargar el archivo. Intenta nuevamente.', { id: toastId })
      console.error(e)
    }
  }

  const columns = useMemo(
    () =>
      forms[formName]?.(theme, setDialogData, openDialog, handleDownload, {
        uuid_sociedad: datos.sociedad?.uuid,
        uuid_tipo_archivo: form,
        year: period,
        name: formName,
      }) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formName, period, form, datos.sociedad?.uuid]
  )
  const tableColumns = useMemo(
    () =>
      loading.data
        ? columns.map((column: any) => ({
            ...column,
            Cell: <Skeleton />,
          }))
        : columns,
    [loading.data, columns]
  )

  useEffect(() => {
    setSearch(true)
    setLoading({
      ...loading,
      typeForm: true,
    })
    setError({
      ...error,
      typeForm: '',
    })
    setDataTypeForms([])

    getTypeForms()
      .then((d) => {
        setDataTypeForms(d)
      })
      .catch((err) => {
        const errorMessage = err.detail || 'Error al cargar los datos'
        toast.error(errorMessage)
        setError({
          ...error,
          typeForm: errorMessage,
        })
      })
      .finally(() => {
        setLoading({
          ...loading,
          typeForm: false,
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = () => {
    setSearch(true)
    setLoading({
      ...loading,
      data: true,
    })
    setError({
      ...error,
      data: '',
    })
    setData([])

    if (period === '' || form === '') return

    getObservations(form, datos.sociedad?.uuid || '', period)
      .then((d) => {
        setData(d.data)
      })
      .catch((err) => {
        const errorMessage = err.detail || 'Error al cargar los datos'
        setError({
          ...error,
          data: errorMessage,
        })
      })
      .finally(() => {
        setLoading({
          ...loading,
          data: false,
        })
      })
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
            options={dataTypeForms}
            size="small"
            sx={{ backgroundColor: 'background.paper' }}
            fullWidth
            value={dataTypeForms.find((option) => option.uuid === form) || null}
            getOptionLabel={(option) => option.tipo_archivo}
            renderInput={(params) => <TextField {...params} label="Reportes" variant="outlined" />}
            onChange={(event, newValue) => {
              setForm(newValue?.uuid || '')
              setData([])
              setSearch(false)
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
              setData([])
              setSearch(false)
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
              columns={tableColumns}
              data={data}
              getHeaderProps={(column: any) => column.getSortByToggleProps()}
              loading={{ table: loading.data }}
              error={error.data ?? false}
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
