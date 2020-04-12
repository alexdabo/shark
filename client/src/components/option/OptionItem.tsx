import React from 'react'
import { ListItem } from '@material-ui/core'
import { ListItemIcon } from '@material-ui/core'
import { ListItemText } from '@material-ui/core'
import styles from './OptionItemStyle'

interface Props {
  name: string
  label: string
  icon: JSX.Element
  confirm?: boolean
  onClick?: () => void
}

export default (props: Props): JSX.Element => {
  const { name, label, icon, confirm } = props
  const [toConfirm, setConfirm] = React.useState(false)
  const classes = styles()

  const onClick = (): void => {
    setConfirm(false)
    if (props.onClick) props.onClick()
  }

  const onConfirm = (): void => {
    setConfirm(true)
    setTimeout(() => {
      setConfirm(false)
    }, 3000)
  }
  return (
    <div>
      {!confirm ? (
        <ListItem
          data-testid={name}
          onClick={() => (props.onClick ? props.onClick() : null)}
          className={classes.item}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      ) : !toConfirm ? (
        <ListItem data-testid={name} className={classes.item} onClick={() => onConfirm()}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      ) : (
        <ListItem
          data-testid={`${name}-to-confirm`}
          className={classes.item}
          onClick={() => (props.onClick ? onClick() : null)}
        >
          <ListItemIcon className={classes.confirm}>{icon}</ListItemIcon>
          <ListItemText className={classes.confirm} primary="Click to confirm" />
        </ListItem>
      )}
    </div>
  )
}
