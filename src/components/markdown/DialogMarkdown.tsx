import type { DialogProps } from '@mui/material/Dialog'
import type { UseBooleanReturn } from 'minimal-shared/hooks'

import { useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { DialogTitle } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import { Markdown } from 'src/components/markdown'

// ----------------------------------------------------------------------

export function DialogMarkdown({
  openDialog,
  markdownContent,
}: {
  openDialog: UseBooleanReturn
  markdownContent: {
    title: string
    content: string
  }
}) {
  const [scroll] = useState<DialogProps['scroll']>('paper')

  return (
    <Dialog open={openDialog.value} onClose={openDialog.onFalse} scroll={scroll} maxWidth="md">
      <DialogTitle>{markdownContent.title}</DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <Markdown children={markdownContent.content} />
      </DialogContent>

      <DialogActions>
        <Button onClick={openDialog.onFalse}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}
