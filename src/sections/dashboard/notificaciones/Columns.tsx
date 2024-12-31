import { EyeOutlined } from '@ant-design/icons'

import { useTheme } from '@mui/material/styles'
import { Stack, Tooltip, IconButton } from '@mui/material'

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

export const NotificationesColumns = (setDialogSetting: any, openDialog: any): Props[] => {
  const theme = useTheme()
  return [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Descripción',
      accessor: 'descripcion',
    },
    {
      Header: 'Fecha',
      accessor: 'fecha',
    },
    {
      Header: 'Tipo Notificación',
      accessor: 'tipo_notificacion',
    },
    {
      id: 'options',
      Header: 'Opciones',
      className: 'cell-center',
      width: 50,
      disableSortBy: true,
      Cell: ({ row, table }: any) => (
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
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
                e.stopPropagation()
                setDialogSetting({
                  content: row.original.mensaje,
                  title: `Notificación ID ${row.original.id}`,
                })
                openDialog.onTrue()
              }}
            >
              <EyeOutlined />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ]
}
