import React from 'react'
import Modal from '@material-ui/core/Modal'
import { Grid, IconButton, Typography, Tooltip } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { List } from '@material-ui/core'
import { ListSubheader } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import { Slide } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Item from './OptionItem'
import styles from './OptionsStyle'

interface Props {
  open?: boolean
  avatar?: JSX.Element
  title?: string
  closable?: boolean
  items?: OptionItem[]
  onClose?: () => void
  onSelected?: (name: string) => void
}

export default (props: Props) => {
  const classes = styles()
  const { open, title, items, avatar, closable } = props

  const onSelected = (selected: string): void => {
    if (props.onSelected) props.onSelected(selected)
  }

  return (
    <Modal open={open || false} onClose={() => (props.onClose ? props.onClose() : null)}>
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
                <List
                  data-testid="list"
                  subheader={
                    <ListSubheader>
                      <Grid data-testid="subheader" container wrap="nowrap">
                        {avatar ? <Grid item>{avatar}</Grid> : null}
                        {title ? (
                          <Grid item xs zeroMinWidth style={{ margin: 'auto' }}>
                            <Tooltip enterDelay={1000} title={title}>
                              <Typography noWrap style={{ padding: 7.5 }}>
                                {title}
                              </Typography>
                            </Tooltip>
                          </Grid>
                        ) : null}
                        {closable ? (
                          <Grid item>
                            <IconButton
                              data-testid="close"
                              onClick={() => (props.onClose ? props.onClose() : null)}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Grid>
                        ) : null}
                      </Grid>
                    </ListSubheader>
                  }
                >
                  <Divider />
                  {items
                    ? items.map((item) => (
                        <Item
                          key={item.name}
                          label={item.label}
                          name={item.name}
                          icon={item.icon}
                          confirm={item.confirm}
                          onClick={() => onSelected(item.name)}
                        />
                      ))
                    : null}
                </List>
              </Card>
            </Grid>
          </Slide>
        </Grid>
      </Card>
    </Modal>
  )
}

export interface OptionItem {
  icon: JSX.Element
  name: string
  label: string
  confirm?: boolean
}
