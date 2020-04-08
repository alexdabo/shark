import * as React from 'react'

interface Props {
  value: any
  type?: 'password' | 'text' | 'number'
  label?: string
  disabled?: boolean
  min?: number
  max?: number
  onChange: (value: any) => void
}
export default (props: Props): JSX.Element => {
  const { value, label, type, disabled, min, max } = props
  return (
    <fieldset className="input-container" disabled={disabled}>
      <legend>{label}</legend>
      <input
        onChange={(event) => props.onChange(event.target.value)}
        type={type || 'text'}
        value={value}
        min={min}
        max={max}
      />
    </fieldset>
  )
}
