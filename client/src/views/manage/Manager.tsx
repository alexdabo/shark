import React from 'react'
import { History } from 'history'
import { Component } from 'react'
import { Color as AlertType } from '@material-ui/lab/Alert'
import { Panel } from '../../components'
import { Preview } from '../../components'
import { Navigation } from '../../components'
import { Viewer } from '../../components'
import { Alert, AlertOptions } from '../../components'
import { Skeleton } from '../../components'
import { Uploader } from '../../components'
import { AppModel } from '../../models'
import { DirectoryModel } from '../../models'
import { FileModel } from '../../models'
import AppService from '../../services/AppService'
import FolderService from '../../services/FolderService'
import FileService from '../../services/FileService'
interface Props {
  location?: Location
  history?: History
}

interface State {
  // Application
  app: AppModel
  // loading
  loading: boolean
  // directory
  directory: string
  // mode view
  view: 'list' | 'grid'
  // search folder and file
  search: string
  // all folders
  folders: string[]
  // all files
  files: FileModel[]
  // file selected
  file: FileModel
  //Uploader
  openFU: boolean
  // File preview
  openFP: boolean
  //alert
  alert: AlertOptions
}

export default class MainView extends Component<Props, State> {
  public state: State = {
    //@ts-ignore
    app: {},
    loading: true,
    directory: '/',
    view: 'grid',
    search: '',
    folders: [],
    files: [],
    // @ts-ignore
    file: {},
    openFU: false,
    openFP: false,
    alert: {},
  }

  constructor(props: Props) {
    super(props)
    this.props.history?.listen((location) => {
      this.loadDirectory(location.pathname)
    })
  }

  // Services
  private async loadAppInfo(): Promise<void> {
    const service: AppService = new AppService()
    await service.getApp().then((app: AppModel) => {
      this.setState({ app })
    })
  }

  private async loadDirectory(path: string): Promise<void> {
    const service: FolderService = new FolderService()
    this.setState({ loading: true, search: '' })
    service
      .getDirectories(path)
      .then((directory: DirectoryModel) => {
        this.setState({
          directory: directory.path,
          folders: directory.folders,
          files: directory.files,
        })
      })
      .catch(() => this.alert('error', 'Error loading data.'))
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  public addFolder(directory: string): void {
    const service: FolderService = new FolderService()
    service
      .create(directory)
      .then((dir: string) => {
        const { folders } = this.state
        folders.push(dir)
        this.setState({ folders })
      })
      .catch(() => this.alert('error', 'Error creating folder.'))
  }

  public deleteFile(file: FileModel): void {
    const service: FileService = new FileService()
    service
      .delete(file.url || '')
      .then(() => {
        const { files } = this.state
        const index = this.state.files.indexOf(file)
        files.splice(index, 1)
        this.setState({ files })
      })
      .catch(() => this.alert('error', 'Failed to delete file.'))
  }

  public deleteFolder(directory: string): void {
    this.alert('warning', `Delete folder is not yet supported.`)
  }

  public downloadFolder(directory: string): void {
    const service: FolderService = new FolderService()
    this.alert('info', `Ziping folder "${directory.split('/').pop()}"`, true, true)
    service
      .download(directory)
      .catch(() => this.alert('error', 'Failed to download folder.'))

      .finally(() => {
        this.setState({ alert: { show: false } })
      })
  }

  public downloadFile(url: string): void {
    const service: FileService = new FileService()
    service.download(url).catch(() => this.alert('error', 'Failed to download folder.'))
  }

  // Methods

  private alert(type: AlertType, message: string, persistent?: boolean, loading?: boolean): void {
    this.setState({ alert: { show: true, type, message, persistent, loading } })
  }
  private onUploaded(files: FileModel[]): void {
    let stateFiles = this.state.files
    files.forEach((file) => stateFiles.push(file))
    this.setState({ openFU: false, files: stateFiles })
  }
  private navigateFiles(nav: 'before' | 'next'): void {
    const { files, file } = this.state
    const currentFileIndex: number = files.indexOf(file)

    if (nav === 'next') {
      if (currentFileIndex < files.length - 1) this.setState({ file: files[currentFileIndex + 1] })
    } else {
      if (currentFileIndex > 0) this.setState({ file: files[currentFileIndex - 1] })
    }
  }

  // React

  public componentDidMount(): void {
    this.loadAppInfo()
    this.loadDirectory(this.props.location?.pathname || this.state.directory)
  }

  public render() {
    const { app, loading, directory, search, folders } = this.state
    const { view, alert, files, openFP, openFU, file } = this.state
    return (
      <Panel
        header={
          <Navigation
            directory={directory}
            hostname={app.hostname}
            search={search}
            view={view}
            onChangeView={(value) => this.setState({ view: value })}
            onChangeDirectory={(value) => this.props.history?.push(value)}
            onSearch={(value) => this.setState({ search: value })}
            onRefresh={(value) => this.loadDirectory(value)}
            onUpload={() => this.setState({ openFU: true })}
          />
        }
        onDragEnter={() => this.setState({ openFU: true })}
      >
        {loading ? (
          <Skeleton items={4} />
        ) : (
          <Viewer
            view={view}
            search={search}
            folders={folders}
            files={files}
            onSelectedFolder={(value) => this.props.history?.push(value)}
            onSelectedFile={(value) => this.setState({ openFP: true, file: value })}
            onDownloadFolder={(value) => this.downloadFolder(value)}
            onDownloadFile={(value) => this.downloadFile(value)}
            onDeleteFile={(value) => this.deleteFile(value)}
          />
        )}

        <Preview
          open={openFP}
          file={file}
          onClose={() => this.setState({ openFP: false })}
          onDownload={(value) => this.downloadFile(value)}
          onNavigate={(value) => this.navigateFiles(value)}
        />

        <Uploader
          directory={directory}
          open={openFU}
          onClose={() => this.setState({ openFU: false })}
          onUploaded={(value) => this.onUploaded(value)}
        />

        <Alert options={alert} onClose={() => this.setState({ alert: { show: false } })} />
      </Panel>
    )
  }
}
