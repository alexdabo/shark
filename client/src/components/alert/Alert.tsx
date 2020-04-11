import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert, { Color } from '@material-ui/lab/Alert'
import Progress from '@material-ui/core/LinearProgress'
export interface AlertOptions {
  show?: boolean
  message?: string
  persistent?: boolean
  loading?: boolean
  type?: Color
}
interface Props {
  options: AlertOptions
  onClose?: () => void
}

export default (props: Props): JSX.Element => {
  const { show, message, persistent, loading, type } = props.options

  return (
    <div>
      {!persistent ? (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={show}
          autoHideDuration={6000}
          onClose={() => (props.onClose ? props.onClose() : null)}
        >
          <Alert
            onClose={() => (props.onClose ? props.onClose() : null)}
            severity={type}
            variant="filled"
          >
            {message}
            {loading ? <Progress color="secondary" /> : null}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={show}>
          <Alert severity={type} variant="filled">
            {message}
            {loading ? <Progress color="secondary" /> : null}
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}
