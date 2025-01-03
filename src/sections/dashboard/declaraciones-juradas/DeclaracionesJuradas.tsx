import type { Company } from 'src/sections/dashboard/useSearch'

import { toast } from 'sonner'
import { useMemo, useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { Stack, Button, Divider, Skeleton, TextField, Autocomplete } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'
import { ReactTable } from 'src/components/react-table/ReactTableTemplate'

import { componentBoxStyles } from 'src/sections/dashboard/index'

import { useDashboard } from '../dashboardContext'
import { DeclaracionesJuradasColumns } from './Columns'
import { useDownloadDocument } from '../formularios/useFormularios'
import { YEARS, useDeclaracionesJuradas } from './useDeclaracionesJuradas'

// ----------------------------------------------------------------------

export function DeclaracionesJuradas({ datos }: { datos: { sociedad: Company | null } }) {
  const queryClient = useQueryClient()
  const { typesForms, company } = useDashboard()
  const [period, setPeriod] = useState('')
  const [search, setSearch] = useState(false)

  const declaracionesJuradas = useDeclaracionesJuradas(datos.sociedad?.uuid || '', period)
  const downloadDocument = useDownloadDocument()

  const handleSearch = () => {
    setSearch(true)
    queryClient.resetQueries({ queryKey: ['declaraciones-juradas'] })

    if (period === '') return

    declaracionesJuradas.refetch()

    if (declaracionesJuradas.isError) {
      const errorMessage = declaracionesJuradas.error || 'Error al cargar los datos'
      toast.error(errorMessage.detail)
    }
  }

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

    if (infoPayload.uuid_tipo_archivo === '') {
      toast.error('No se encontro el tipo de archivo. Intenta nuevamente.')
      return
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
          toast.error(error.detail || 'Error al descargar el archivo. Intenta nuevamente.', {
            id: toastId,
          })
        },
      }
    )
  }

  useEffect(() => {
    if (period === '') {
      setSearch(false)
      queryClient.resetQueries({ queryKey: ['declaraciones-juradas'] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period])

  useEffect(() => {
    setSearch(false)
    setPeriod('')
    queryClient.resetQueries({ queryKey: ['declaraciones-juradas'] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datos.sociedad?.uuid])

  const columns = DeclaracionesJuradasColumns()
  const tableColumns = useMemo(
    () =>
      declaracionesJuradas.isFetching
        ? columns.map((column: any) => ({
            ...column,
            Cell: <Skeleton />,
          }))
        : columns,
    [declaracionesJuradas.isFetching, columns]
  )

  return (
    <section>
      <ComponentBox title="Declaraciones Juradas" sx={componentBoxStyles}>
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
            sx={{ backgroundColor: 'background.paper' }}
            disabled={!period}
            fullWidth
            onClick={() => handleSearch()}
          >
            Buscar
          </Button>
          <Button
            variant="outlined"
            color="success"
            disabled={!period}
            sx={{ backgroundColor: 'background.paper' }}
            fullWidth
            onClick={() => {
              const idForm =
                typesForms.data?.find((form) => form.tipo_archivo === 'Declaraciones_Juradas')
                  ?.uuid || ''
              const formName =
                typesForms.data?.find((option) => option.uuid === idForm)?.tipo_archivo || ''
              handleDownload({
                uuid_sociedad: datos.sociedad?.uuid || '',
                uuid_tipo_archivo: idForm,
                extension_file: 'xlsx',
                period,
                name: formName,
              })
            }}
          >
            Descargar
          </Button>
        </Stack>

        {search && (
          <>
            <Divider />
            <ReactTable
              columns={tableColumns}
              data={declaracionesJuradas.data}
              getHeaderProps={(column: any) => column.getSortByToggleProps()}
              loading={{ table: declaracionesJuradas.isFetching }}
              error={declaracionesJuradas.isError ? declaracionesJuradas.error.detail : null}
              fieldSortBy={false}
              orderBy="id"
            />
          </>
        )}
      </ComponentBox>
    </section>
  )
}
