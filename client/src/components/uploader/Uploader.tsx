import React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { WithStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Zoom from '@material-ui/core/Zoom'
import Grid from '@material-ui/core/Grid'
import Dropzone from 'react-dropzone'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import CloseIcon from '@material-ui/icons/Close'
import UploadIcon from '@material-ui/icons/CloudUpload'
import UploaderItem from './UploaderItem'
import FileModel from '../../models/FileModel'

interface Props extends WithStyles<typeof styles> {
  open: boolean
  directory: string
  onUploaded?: (files: FileModel[]) => void
  onClose?: () => void
}

interface State {
  loading: boolean
  files: File[]
  loadedFiles: FileModel[]
}

class FileUploadComponent extends Component<Props, State> {
  public state: State = {
    loading: false,
    files: [],
    loadedFiles: [],
  }

  private close(): void {
    if (this.props.onClose) this.props.onClose()
    this.setState({ files: [] })
  }

  private onDrop(files: File[]) {
    this.setState({ files, loading: true })
  }

  private onUploaded(file: FileModel) {
    const { loadedFiles } = this.state
    loadedFiles.push(file)
    this.setState({ loadedFiles })
    if (this.state.files.length === loadedFiles.length) {
      this.setState({ files: [], loadedFiles: [], loading: false })
      if (this.props.onUploaded) this.props.onUploaded(loadedFiles)
    }
  }

  public render(): JSX.Element {
    const { classes, directory } = this.props
    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.close()}
        disableBackdropClick
        disableEscapeKeyDown
        fullScreen
      >
        <div className={classes.root}>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Upload
              </Typography>
              <IconButton
                disabled={this.state.loading}
                onClick={() => this.close()}
                className={classes.toolBtn}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Zoom in={this.props.open} mountOnEnter unmountOnExit>
            <div className={classes.container}>
              <Dropzone onDrop={(files) => this.onDrop(files)}>
                {({ getRootProps, getInputProps }) => (
                  <div>
                    {this.state.files.length === 0 ? (
                      <div
                        {...getRootProps({
                          className: classes.dropzone,
                          style: {
                            flexDirection: 'column',
                            position: 'absolute',
                            margin: 5,
                          },
                        })}
                      >
                        <input {...getInputProps()} />
                        <UploadIcon style={{ fontSize: 60 }} />
                        <p>Drag and drop files here to upload.</p>
                        <b>Or click to select files</b>
                      </div>
                    ) : (
                      <div className={classes.files} style={{ position: 'absolute' }}>
                        <Grid container spacing={1}>
                          {this.state.files.map((file: File) => (
                            <UploaderItem
                              key={file.name}
                              file={file}
                              path={directory}
                              uploaded={(file) => this.onUploaded(file)}
                            />
                          ))}
                        </Grid>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
          </Zoom>
        </div>
      </Dialog>
    )
  }
}
const styles = (theme: Theme) => ({
  root: {
    height: '100vh',
    width: '100%',
    margin: 'auto auto',
    overflow: 'none',
  },
  title: {
    flexGrow: 1,
  },
  toolBtn: {
    color: theme.palette.common.white,
  },
  container: {
    marginTop: 65,
    height: 'calc(100vh - 65px)',
    width: '100%',
    display: 'flex',
  },
  dropzone: {
    flex: 1,
    display: 'flex',
    height: 'calc(100vh - 120px)',
    width: 'calc(100% - 60px)',
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  },
  files: {
    width: 'calc(100% - 40px)',
    padding: '20px',
  },
})

export default withStyles(styles)(FileUploadComponent)
