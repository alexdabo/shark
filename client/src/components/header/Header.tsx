import React from 'react'
import { AppBar } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import { Hidden } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import styles from './HeaderStyle'

interface Actions {
  icon: JSX.Element
  key: string
  action: () => void
}

interface Props {
  fileName?: string
  fileIcon?: string
  actions?: Actions[]
  onClose?: () => void
  onDownload?: () => void
}

export default (props: Props): JSX.Element => {
  const { fileIcon, fileName, actions } = props
  const classes = styles()

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
        <Toolbar data-testid="toolbar" variant="dense">
          <Hidden smUp>
            <IconButton onClick={props.onClose} edge="start" color="inherit">
              <ArrowBackIcon />
            </IconButton>
          </Hidden>
          {fileIcon ? <Avatar className={classes.avatar} src={fileIcon} /> : null}
          <Typography variant="h6" className={classes.title}>
            {fileName}
          </Typography>

          {actions
            ? actions.map((item) => (
                <IconButton key={item.key} onClick={item.action} color="inherit">
                  {item.icon}
                </IconButton>
              ))
            : null}

          {props.onDownload ? (
            <IconButton
              data-testid="action-download"
              key="download"
              onClick={props.onDownload}
              color="inherit"
            >
              <DownloadIcon />
            </IconButton>
          ) : null}
          <Hidden xsDown>
            <IconButton onClick={props.onClose} color="inherit">
              <CloseIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  )
}
