import React from 'react'
import i18n from '../../i18n'
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
        <DialogTitle>{i18n.t('simple.newFolder')}</DialogTitle>
        <DialogContent>
          <TextField
            data-testid="name-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoFocus
            margin="dense"
            label={i18n.t('simple.name')}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button data-testid="cancel-btn" onClick={props.onClose} color="primary">
            {i18n.t('simple.cancel')}
          </Button>
          <Button data-testid="submit-btn" type="submit" color="primary">
            {i18n.t('simple.create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
