import * as React from 'react'

interface Props {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  color?: 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'primary'
  onClick?: () => void
  children?: JSX.Element
}

export default (props: Props): JSX.Element => {
  const { disabled, type, color } = props
  return (
    <button
      className={`btn ${color ? `btn-${color}` : ''}`}
      style={{ marginLeft: 5, marginRight: 5 }}
      onClick={props.onClick}
      disabled={disabled}
      type={type || 'button'}
    >
      {props.children}
    </button>
  )
}
