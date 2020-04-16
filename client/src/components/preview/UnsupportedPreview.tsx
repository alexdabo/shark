import React from 'react'
import { Panel } from '..'
import { Header } from '..'
import { FileModel } from '../../models'
import styles from './CommonStyle'
import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Fab } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import DownloadIcon from '@material-ui/icons/CloudDownload'

interface Props {
  file: FileModel
  onClose?: () => void
  onDownload?: () => void
}

export default (props: Props): JSX.Element => {
  const { file } = props
  const classes = styles()
  return (
    <Panel header={<Header fileIcon={file.icon} fileName={file.name} onClose={props.onClose} />}>
      <div className={classes.container}>
        <Grid
          className={classes.element}
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={5}
        >
          <Grid item xs>
            <InfoIcon className={classes.info} />
          </Grid>
          <Grid item xs className={classes.msg}>
            <Typography variant="h6">Preview not supported</Typography>
          </Grid>
          <Grid item xs>
            <Fab color="primary" variant="extended" onClick={props.onDownload}>
              <DownloadIcon className={classes.extendedIcon} />
              Download
            </Fab>
          </Grid>
        </Grid>
      </div>
    </Panel>
  )
}
