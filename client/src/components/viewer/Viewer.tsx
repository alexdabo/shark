import React from 'react'
import { Component } from 'react'
import { Fragment } from 'react'
import { WithStyles } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { Tooltip } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Table } from '@material-ui/core'
import { TableBody } from '@material-ui/core'
import { TableCell } from '@material-ui/core/'
import { TableContainer } from '@material-ui/core'
import { TableHead } from '@material-ui/core'
import { TableRow } from '@material-ui/core'
import { Options } from '..'
import FolderIcon from '@material-ui/icons/Folder'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreIcon from '@material-ui/icons/MoreVert'
import util from '../../utils'
import styles from './ViewerStyle'
import FileModel from '../../models/FileModel'

interface Props extends WithStyles<typeof styles> {
  search: string
  folders: string[]
  files: FileModel[]
  view: 'grid' | 'list'
  onSelectedFile?: (selected: FileModel) => void
  onSelectedFolder?: (directory: string) => void
  onDownloadFile?: (url: string) => void
  onDownloadFolder?: (directory: string) => void
  onDeleteFile?: (selected: FileModel) => void
}

interface State {
  openFI: boolean
  openFO: boolean
  selectedFile: FileModel
  selectedFolder: string
}

class Viewer extends Component<Props, State> {
  public state: State = {
    openFI: false,
    openFO: false,
    selectedFolder: '',
    selectedFile: {
      url: '',
      icon: '',
      name: '',
      mine: '',
      ext: '',
      size: 0,
      accessedAt: '',
      modifiedAt: '',
    },
  }

  private onFolderOptionSelected(eventName: string) {
    if (this.props.onDownloadFolder && eventName === 'download')
      this.props.onDownloadFolder(this.state.selectedFolder)

    this.setState({ openFO: false })
  }

  private onFileOptionSelected(eventName: string) {
    if (this.props.onDownloadFile && eventName === 'download')
      this.props.onDownloadFile(this.state.selectedFile.url)
    if (this.props.onDeleteFile && eventName === 'delete')
      this.props.onDeleteFile(this.state.selectedFile)
    this.setState({ openFI: false })
  }

  private grid(folders: string[], files: FileModel[]): JSX.Element {
    const { classes } = this.props
    return (
      <Grid
        data-testid="grid"
        container
        spacing={1}
        style={{ overflowY: 'auto' }}
        className={classes.gridView}
      >
        {folders.map((folder: string) => (
          <Grid key={folder} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card style={{ padding: 5 }}>
              <Grid container wrap="nowrap">
                <Grid item>
                  <Avatar className={`${classes.avatar} ${classes.folderAvatar}`}>
                    <FolderIcon />
                  </Avatar>
                </Grid>
                <Grid
                  onClick={() =>
                    this.props.onSelectedFolder ? this.props.onSelectedFolder(folder) : null
                  }
                  data-testid={`folder-${folder.split('/').pop()}`}
                  className={classes.gridItem}
                  zeroMinWidth
                  item
                  xs
                >
                  <Tooltip enterDelay={1000} title={folder.split('/').pop()}>
                    <Typography noWrap>{folder.split('/').pop()}</Typography>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <IconButton
                    data-testid={`more-folder-${folder.split('/').pop()}`}
                    onClick={() => this.setState({ openFO: true, selectedFolder: folder })}
                  >
                    <MoreIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} />
        {files.map((file: FileModel) => (
          <Grid key={file.url} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card onDoubleClick={() => {}} style={{ padding: 5 }}>
              <Grid container wrap="nowrap">
                <Grid item>
                  <Avatar className={classes.avatar} alt="file type" src={file.icon} />
                </Grid>
                <Grid
                  onClick={() =>
                    this.props.onSelectedFile ? this.props.onSelectedFile(file) : null
                  }
                  data-testid={`file-${file.name}`}
                  className={classes.gridItem}
                  zeroMinWidth
                  item
                  xs
                >
                  <Tooltip enterDelay={1000} title={file.name}>
                    <Typography noWrap>{file.name}</Typography>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <IconButton
                    data-testid={`more-file-${file.name}`}
                    onClick={() => this.setState({ openFI: true, selectedFile: file })}
                  >
                    <MoreIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  private table(folders: string[], files: FileModel[]): JSX.Element {
    const { classes } = this.props
    return (
      <TableContainer className={classes.table}>
        <Table size="small" aria-label="a dense table">
          <TableHead style={{ backgroundColor: '#dadada' }}>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="center">Content Type</TableCell>
              <TableCell align="right">Modified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="table-body">
            {folders
              ? folders.map((folder) => (
                  <TableRow
                    key={folder}
                    data-testid={`folder-${folder.split('/').pop()}`}
                    className={classes.tableRow}
                    onClick={() =>
                      this.props.onSelectedFolder ? this.props.onSelectedFolder(folder) : null
                    }
                    onAuxClick={() => this.setState({ openFO: true, selectedFolder: folder })}
                  >
                    <TableCell>
                      <Avatar className={`${classes.avatar} ${classes.folderAvatar}`}>
                        <FolderIcon />
                      </Avatar>
                    </TableCell>
                    <TableCell colSpan={4}>{folder.split('/').pop()}</TableCell>
                  </TableRow>
                ))
              : null}
            {files
              ? files.map((file) => (
                  <TableRow
                    key={file.name}
                    data-testid={`file-${file.name}`}
                    className={classes.tableRow}
                    onAuxClick={() => this.setState({ openFI: true, selectedFile: file })}
                    onClick={() =>
                      this.props.onSelectedFile ? this.props.onSelectedFile(file) : null
                    }
                  >
                    <TableCell>
                      <Avatar alt="file type" src={file.icon} />
                    </TableCell>
                    <TableCell>{file.name}</TableCell>
                    <TableCell align="right">{util.formatSize(file.size)}</TableCell>
                    <TableCell align="center">{util.contentType(file.ext)}</TableCell>
                    <TableCell align="right">{util.formatDate(file.modifiedAt)}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  public render(): JSX.Element {
    const { openFI, openFO, selectedFile, selectedFolder } = this.state
    let { files, folders, search, view, classes } = this.props

    if (search !== '') {
      files = files.filter((file: FileModel) => {
        const name: string = file.name || ''
        return name.toLowerCase().indexOf(search.toLowerCase()) > -1
      })
      folders = folders.filter((folder: string) => {
        return folder.toLowerCase().indexOf(search.toLowerCase()) > -1
      })
    }

    const TableView = () => this.table(folders, files)
    const GridView = () => this.grid(folders, files)

    return (
      <Fragment>
        {view === 'grid' ? <GridView /> : null}
        {view === 'list' ? <TableView /> : null}
        <Options
          title={selectedFolder.split('/').pop()}
          avatar={
            <Avatar className={`${classes.avatar} ${classes.folderAvatar}`}>
              <FolderIcon />
            </Avatar>
          }
          closable={true}
          open={openFO}
          onClose={() => this.setState({ openFO: false })}
          onSelected={(eventName) => {
            this.onFolderOptionSelected(eventName)
          }}
          items={[{ label: 'Download', name: 'download', icon: <DownloadIcon /> }]}
        />

        <Options
          title={selectedFile.name}
          avatar={<Avatar className={classes.avatar} src={selectedFile.icon} />}
          closable={true}
          open={openFI}
          onClose={() => this.setState({ openFI: false })}
          onSelected={(eventName) => {
            this.onFileOptionSelected(eventName)
          }}
          items={[
            { label: 'Download', name: 'download', icon: <DownloadIcon /> },
            { label: 'Delete', name: 'delete', icon: <DeleteIcon />, confirm: true },
          ]}
        />
      </Fragment>
    )
  }
}

export default withStyles(styles)(Viewer)
