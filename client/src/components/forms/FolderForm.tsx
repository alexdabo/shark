import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

interface Props {
  open: boolean
  onClose?: () => void
  onSubmit?: (name: string) => void
}

export default (props: Props): JSX.Element => {
  const { open } = props
  const [name, setName] = React.useState('')

  const onSubmit = (event: any) => {
    event.preventDefault()

    if (props.onClose) props.onClose()
    if (props.onSubmit) props.onSubmit(name)
    setName('')
  }
  return (
    <Dialog onClose={props.onClose} open={open} disableBackdropClick disableEscapeKeyDown>
      <form onSubmit={onSubmit}>
        <DialogTitle>New folder</DialogTitle>
        <DialogContent>
          <TextField
            data-testid="name-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button data-testid="cancel-btn" onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button data-testid="submit-btn" type="submit" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
