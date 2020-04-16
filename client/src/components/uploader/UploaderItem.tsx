import React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { WithStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import Progress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import FileModel from '../../models/FileModel'
import FileService from '../../services/FileService'

interface Props extends WithStyles<typeof styles> {
  file: File
  path: string
  uploaded: (file: FileModel) => void
}

interface State {
  progress: number
  sizeProgress: string
}

class FileUploadItemComponent extends Component<Props, State> {
  public state: any = {
    progress: 0,
    sizeProgress: '',
  }
  private async upload(): Promise<void> {
    const service: FileService = new FileService()
    service
      .upload(this.props.path, this.props.file, (progress: number, sizeProgress: string) => {
        this.setState({ progress, sizeProgress })
      })
      .then((file: FileModel) => this.props.uploaded(file))
      .catch(() => {})
      .finally(() => {
        this.setState({ progress: 100 })
      })
  }

  componentDidMount() {
    this.upload()
  }

  public render(): JSX.Element {
    const { file } = this.props
    const { progress, sizeProgress } = this.state
    return (
      <Grid key={file.name} item xs={12}>
        <Card style={{ padding: 5 }}>
          <Grid container wrap="nowrap">
            <Grid item>{/*<FileType extension={'.' + file.name.split('.').pop()} />*/}</Grid>
            <Grid item xs zeroMinWidth style={{ margin: 'auto' }}>
              <Tooltip enterDelay={1000} title={file.name}>
                <div>
                  <Typography noWrap>{file.name}</Typography>
                  <Progress variant="determinate" value={progress} color="secondary" />
                  <Typography noWrap style={{ color: '#bdbdbd', fontSize: 12 }}>
                    <Grid container>
                      <Grid item xs>
                        {sizeProgress}
                      </Grid>
                      <Grid item xs style={{ textAlign: 'right' }}>
                        {progress ? `${progress}%` : ''}
                      </Grid>
                    </Grid>
                  </Typography>
                </div>
              </Tooltip>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )
  }
}

const styles = (theme: Theme) => ({})

export default withStyles(styles)(FileUploadItemComponent)
