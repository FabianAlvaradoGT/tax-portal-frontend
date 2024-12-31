import type { DialogProps } from '@mui/material/Dialog'
import type { UseBooleanReturn } from 'minimal-shared/hooks'

import { useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  DialogTitle,
  TableContainer,
} from '@mui/material'

// ----------------------------------------------------------------------
interface Content {
  [key: string]: string
}

export function DialogFormularios({
  openDialog,
  data,
}: {
  openDialog: UseBooleanReturn
  data: {
    title?: string
    content: Content[]
  }
}) {
  const [scroll] = useState<DialogProps['scroll']>('paper')

  const keys = data.content.length > 0 ? Object.keys(data.content[0]) : []

  return (
    <Dialog open={openDialog.value} onClose={openDialog.onFalse} scroll={scroll} maxWidth="md">
      {data.title && <DialogTitle>{data.title}</DialogTitle>}
      <DialogContent dividers={scroll === 'paper'}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {keys.map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.content.map((row, index) => (
                <TableRow key={index}>
                  {keys.map((key) => (
                    <TableCell key={key}>{row[key]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions>
        <Button onClick={openDialog.onFalse}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}
