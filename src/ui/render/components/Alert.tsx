import * as React from 'react'

interface Props {
  type: AlertType
  message: string
  show: boolean
}

export default (props: Props): JSX.Element => {
  const { type, message, show } = props
  return (
    <div>
      {show ? (
        <div className={`alert alert-${type}`} role="alert">
          {message}
        </div>
      ) : null}
    </div>
  )
}
export type AlertType = 'success' | 'warning' | 'danger' | 'info'
