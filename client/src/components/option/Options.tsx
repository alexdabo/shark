import React from 'react'
import Modal from '@material-ui/core/Modal'
import { Grid } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { List } from '@material-ui/core'
import { ListSubheader } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import { ListItem } from '@material-ui/core'
import { ListItemIcon } from '@material-ui/core'
import { ListItemText } from '@material-ui/core'
import { Slide } from '@material-ui/core'
import styles from './OptionsStyle'

interface Props {
  title?: string
  items: OptionItem[]
  children: JSX.Element
  onEvent?: 'onClick' | 'onAuxClick'
  onSelected?: (name: string) => void
}

export default (props: Props) => {
  const classes = styles()
  const [open, setOpen] = React.useState(false)
  const { title, items } = props
  let { onEvent } = props
  onEvent = onEvent || 'onClick'

  const onSelected = (selected: string): void => {
    setOpen(false)
    if (props.onSelected) props.onSelected(selected)
  }

  return (
    <div>
      {onEvent === 'onClick' ? (
        <span onClick={() => setOpen(true)}>{props.children}</span>
      ) : (
        <span onAuxClick={() => setOpen(true)}>{props.children}</span>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Card>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
            className={classes.options}
          >
            <Slide in={open} direction="up" mountOnEnter unmountOnExit>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <List data-testid="list" subheader={<ListSubheader>{title}</ListSubheader>}>
                    <Divider />
                    {items.map((item) => (
                      <ListItem
                        key={item.name}
                        data-testid={item.name}
                        onClick={() => onSelected(item.name)}
                        className={classes.item}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
            </Slide>
          </Grid>
        </Card>
      </Modal>
    </div>
  )
}

export interface OptionItem {
  icon: JSX.Element
  name: string
  label: string
}
