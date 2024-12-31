import { EyeOutlined, FilePdfOutlined, FileExcelOutlined } from '@ant-design/icons'

import { Stack, Button, Tooltip, IconButton } from '@mui/material'

interface Props {
  Header: string
  accessor?: string
  Cell?: any
  disableSortBy?: boolean
  Filter?: any
  filter?: string
  className?: string
  width?: number
  intl?: any
  id?: string
}

export const F50Columns = (
  theme: any,
  setDialogData: any,
  openDialog: any,
  handleDownload: any,
  info: any
): Props[] => [
  {
    Header: 'Mes',
    accessor: 'mes',
  },
  {
    Header: 'Estado',
    accessor: 'estado',
  },
  {
    Header: 'Detalle',
    Cell: ({ row, table }: any) => (
      <>
        {typeof row.original.detalle === 'string' ? (
          `${row.original.detalle}`
        ) : (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Tooltip
              title="Ver"
              componentsProps={{
                tooltip: {
                  sx: {
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[800]
                        : theme.palette.grey[50],
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[50]
                        : theme.palette.grey[700],
                  },
                },
              }}
            >
              <IconButton
                color="info"
                size="small"
                onClick={(e: any) => {
                  setDialogData({
                    title: 'Detalle',
                    content: row.original.detalle,
                  })
                  openDialog.onTrue()
                }}
              >
                <EyeOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </>
    ),
  },
  {
    id: 'options',
    Header: 'Opciones',
    className: 'cell-center',
    width: 50,
    disableSortBy: true,
    Cell: ({ row, table }: any) => (
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <Tooltip
          title="Descargar Excel"
          componentsProps={{
            tooltip: {
              sx: {
                color:
                  theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[800],
                bgcolor:
                  theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
              },
            },
          }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<FileExcelOutlined />}
            onClick={() => {
              console.log('info', info)
              const payload = {
                uuid_sociedad: info.uuid_sociedad,
                uuid_tipo_archivo: info.uuid_tipo_archivo,
                extension_file: 'xlsx',
                period: info.period + `${row.original.mes}`.padStart(2, '0'),
                name: info.name,
              }
              handleDownload(payload)
            }}
            color="success"
          >
            Excel
          </Button>
        </Tooltip>
        <Tooltip
          title="Descargar PDF"
          componentsProps={{
            tooltip: {
              sx: {
                color:
                  theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[800],
                bgcolor:
                  theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
              },
            },
          }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<FilePdfOutlined />}
            onClick={() => {
              console.log('info', info)
              const payload = {
                uuid_sociedad: info.uuid_sociedad,
                uuid_tipo_archivo: info.uuid_tipo_archivo,
                extension_file: 'pdf',
                period: info.period + `${row.original.mes}`.padStart(2, '0'),
                name: info.name,
              }
              handleDownload(payload)
            }}
            color="error"
          >
            PDF
          </Button>
        </Tooltip>
      </Stack>
    ),
  },
]

export const F3600Columns = (
  theme: any,
  setDialogData: any,
  openDialog: any,
  handleDownload: any,
  info: any
): Props[] => [
  {
    Header: 'Mes',
    accessor: 'mes',
  },
  {
    Header: 'Estado',
    accessor: 'estado',
  },
  {
    Header: 'Detalle',
    accessor: 'detalle',
    Cell: ({ row, table }: any) => (
      <>
        {typeof row.original.detalle === 'string' ? (
          `${row.original.detalle}`
        ) : (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Tooltip
              title="Ver"
              componentsProps={{
                tooltip: {
                  sx: {
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[800]
                        : theme.palette.grey[50],
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[50]
                        : theme.palette.grey[700],
                  },
                },
              }}
            >
              <IconButton
                color="info"
                size="small"
                onClick={(e: any) => {
                  setDialogData({
                    title: 'Detalle',
                    content: row.original.detalle,
                  })
                  openDialog.onTrue()
                }}
              >
                <EyeOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </>
    ),
  },
  {
    id: 'options',
    Header: 'Opciones',
    className: 'cell-center',
    width: 50,
    disableSortBy: true,
    Cell: ({ row, table }: any) => (
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <Tooltip
          title="Descargar Excel"
          componentsProps={{
            tooltip: {
              sx: {
                color:
                  theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[800],
                bgcolor:
                  theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
              },
            },
          }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<FileExcelOutlined />}
            onClick={() => {
              console.log('info', info)
              const payload = {
                uuid_sociedad: info.uuid_sociedad,
                uuid_tipo_archivo: info.uuid_tipo_archivo,
                extension_file: 'xlsx',
                period: info.period + `${row.original.mes}`.padStart(2, '0'),
                name: info.name,
              }
              handleDownload(payload)
            }}
            color="success"
          >
            Excel
          </Button>
        </Tooltip>
        <Tooltip
          title="Descargar PDF"
          componentsProps={{
            tooltip: {
              sx: {
                color:
                  theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[800],
                bgcolor:
                  theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
              },
            },
          }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<FilePdfOutlined />}
            onClick={() => {
              console.log('info', info)
              const payload = {
                uuid_sociedad: info.uuid_sociedad,
                uuid_tipo_archivo: info.uuid_tipo_archivo,
                extension_file: 'pdf',
                period: info.period + `${row.original.mes}`.padStart(2, '0'),
                name: info.name,
              }
              handleDownload(payload)
            }}
            color="error"
          >
            PDF
          </Button>
        </Tooltip>
      </Stack>
    ),
  },
]

export const F29Columns = (
  theme: any,
  setDialogData: any,
  openDialog: any,
  handleDownload: any,
  info: any
): Props[] => [
  {
    Header: 'Mes',
    accessor: 'mes',
  },
  {
    Header: 'Estado',
    accessor: 'estado',
  },
  {
    Header: 'Detalle',
    accessor: 'detalle',
    className: 'cell-center',
    width: 50,
    disableSortBy: true,
    Cell: ({ row, table }: any) => (
      <>
        {typeof row.original.detalle === 'string' ? (
          `${row.original.detalle}`
        ) : (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Tooltip
              title="Ver"
              componentsProps={{
                tooltip: {
                  sx: {
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[800]
                        : theme.palette.grey[50],
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[50]
                        : theme.palette.grey[700],
                  },
                },
              }}
            >
              <IconButton
                color="info"
                size="small"
                onClick={(e: any) => {
                  setDialogData({
                    title: 'Detalle',
                    content: row.original.detalle,
                  })
                  openDialog.onTrue()
                }}
              >
                <EyeOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </>
    ),
  },
  {
    id: 'options',
    Header: 'Opciones',
    className: 'cell-center',
    width: 50,
    disableSortBy: true,
    Cell: ({ row, table }: any) => (
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <Tooltip
          title="Descargar Excel"
          componentsProps={{
            tooltip: {
              sx: {
                color:
                  theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[800],
                bgcolor:
                  theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
              },
            },
          }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<FileExcelOutlined />}
            onClick={() => {
              console.log('info', info)
              const payload = {
                uuid_sociedad: info.uuid_sociedad,
                uuid_tipo_archivo: info.uuid_tipo_archivo,
                extension_file: 'xlsx',
                period: info.period + `${row.original.mes}`.padStart(2, '0'),
                name: info.name,
              }
              handleDownload(payload)
            }}
            color="success"
          >
            Excel
          </Button>
        </Tooltip>
        <Tooltip
          title="Descargar PDF"
          componentsProps={{
            tooltip: {
              sx: {
                color:
                  theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[800],
                bgcolor:
                  theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
              },
            },
          }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<FilePdfOutlined />}
            onClick={() => {
              console.log('info', info)
              const payload = {
                uuid_sociedad: info.uuid_sociedad,
                uuid_tipo_archivo: info.uuid_tipo_archivo,
                extension_file: 'pdf',
                period: info.period + `${row.original.mes}`.padStart(2, '0'),
                name: info.name,
              }
              handleDownload(payload)
            }}
            color="error"
          >
            PDF
          </Button>
        </Tooltip>
      </Stack>
    ),
  },
]

export const F22Columns = (
  theme: any,
  setDialogData: any,
  openDialog: any,
  handleDownload: any,
  info: any
): Props[] => [
  {
    Header: 'Mes',
    accessor: 'mes',
  },
  {
    Header: 'Estado',
    accessor: 'estado',
  },
  {
    Header: 'Detalle',
    accessor: 'detalle',
    className: 'cell-center',
    width: 50,
    disableSortBy: true,
    Cell: ({ row, table }: any) => (
      <>
        {typeof row.original.detalle === 'string' ? (
          `${row.original.detalle}`
        ) : (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Tooltip
              title="Ver"
              componentsProps={{
                tooltip: {
                  sx: {
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[800]
                        : theme.palette.grey[50],
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[50]
                        : theme.palette.grey[700],
                  },
                },
              }}
            >
              <IconButton
                color="info"
                size="small"
                onClick={(e: any) => {
                  setDialogData({
                    title: 'Detalle',
                    content: row.original.detalle,
                  })
                  openDialog.onTrue()
                }}
              >
                <EyeOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </>
    ),
  },
  {
    id: 'options',
    Header: 'Opciones',
    className: 'cell-center',
    width: 50,
    disableSortBy: true,
    Cell: ({ row, table }: any) => (
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <Tooltip
          title="Descargar Excel"
          componentsProps={{
            tooltip: {
              sx: {
                color:
                  theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[800],
                bgcolor:
                  theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
              },
            },
          }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<FileExcelOutlined />}
            onClick={() => {
              console.log('info', info)
              const payload = {
                uuid_sociedad: info.uuid_sociedad,
                uuid_tipo_archivo: info.uuid_tipo_archivo,
                extension_file: 'xlsx',
                period: info.period + `${row.original.mes}`.padStart(2, '0'),
                name: info.name,
              }
              handleDownload(payload)
            }}
            color="success"
          >
            Excel
          </Button>
        </Tooltip>
        <Tooltip
          title="Descargar PDF"
          componentsProps={{
            tooltip: {
              sx: {
                color:
                  theme.palette.mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[800],
                bgcolor:
                  theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
              },
            },
          }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<FilePdfOutlined />}
            onClick={() => {
              console.log('info', info)
              const payload = {
                uuid_sociedad: info.uuid_sociedad,
                uuid_tipo_archivo: info.uuid_tipo_archivo,
                extension_file: 'pdf',
                period: info.period + `${row.original.mes}`.padStart(2, '0'),
                name: info.name,
              }
              handleDownload(payload)
            }}
            color="error"
          >
            PDF
          </Button>
        </Tooltip>
      </Stack>
    ),
  },
]
