import type { DialogProps } from '@mui/material/Dialog'
import type { UseBooleanReturn } from 'minimal-shared/hooks'

import { useRef, useState } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

import { Markdown } from 'src/components/markdown'

// ----------------------------------------------------------------------

export function DialogMarkdown({
  openDialog,
  markdownContent,
}: {
  openDialog: UseBooleanReturn
  markdownContent: string
}) {
  const [scroll] = useState<DialogProps['scroll']>('paper')

  const descriptionElementRef = useRef<HTMLElement>(null)

  return (
    <Dialog open={openDialog.value} onClose={openDialog.onFalse} scroll={scroll}>
      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
          <Markdown children={markdownContent} />
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={openDialog.onFalse}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}
