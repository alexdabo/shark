import { ipcRenderer } from 'electron'
import * as React from 'react'
import * as fs from 'fs'
import * as ps from 'portscanner'
import * as path from 'path'
import * as isDev from 'electron-is-dev'
import { Component } from 'react'
import { shell } from 'electron'
import Server from '../../server/Server'
import Layout from './components/Layout'
import TextField from './components/TextField'
import Button from './components/Button'
import Icon from './components/Icon'
import Alert, { AlertType } from './components/Alert'
import ConfigRepository from '../../repositories/ConfigRepository'
import { ConfigModel } from '../../models/DBModel'
import i18n from '../locales/MainViewI18n'

interface Props {}

interface State {
  // Server status
  serverActive: boolean
  serverWaiting: boolean
  // Alert
  alertShow: boolean
  alertType: AlertType
  alertMessage: string
  // Inputs
  path: string
  port: number
}

export default class MainView extends Component<Props, State> {
  private server: Server = new Server()
  public state: State = {
    serverActive: false,
    serverWaiting: false,
    alertShow: false,
    alertType: 'success',
    alertMessage: '',
    path: '',
    port: 0,
  }
  /*****************************************************************
   *                             Server                            *
   *****************************************************************/
  private startServer(): void {
    this.server.start({
      port: this.state.port,
      home: this.state.path,
      client: path.join(__dirname, '../../../client/build'),
      mode: isDev ? 'default' : 'history',
      onListening: (domain) => {
        this.setState({ serverActive: true, serverWaiting: false })
        this.showAlert('success', i18n.t('openBrowser', { domain }).replace(/&#x2F;/g, '/'))
        ipcRenderer.send('serverStatusChange', true)
        console.log(`${i18n.t('serverListeningAt')}
        DOMAIN: ${domain}
        HOME:   ${process.env.HOMEDIR}
      `)
      },
      onError: (err) => {
        this.showAlert(
          'danger',
          err.message.replace('0.0.0.0', this.server.ip()) || i18n.t('serverErrorStarting'),
          6000
        )
        this.setState({ serverActive: false, serverWaiting: false })
      },
    })
  }

  private closeServer(): void {
    this.server.close(
      // when server is closed
      () => {
        this.setState({ serverActive: false, serverWaiting: false })
        this.hideAlert()
        ipcRenderer.send('serverStatusChange', false)
        console.log(i18n.t('serverStopped'))
      }
    )
  }
  /*****************************************************************
   *                             Methods                           *
   *****************************************************************/

  // Validation
  private async isValid(): Promise<boolean> {
    let errors: number = 0
    this.hideAlert()
    if (!fs.existsSync(this.state.path)) {
      this.showAlert(
        'warning',
        i18n.t('notExist', { dir: this.state.path }).replace(/&#x2F;/g, '/')
      )
      errors += 1
    }
    if ((await ps.checkPortStatus(this.state.port, '127.0.0.1')) === 'open') {
      this.showAlert('warning', i18n.t('portInUse', { port: this.state.port }))
      errors += 1
    }

    return errors === 0
  }

  private showAlert(type: AlertType, message: string, time?: number): void {
    this.setState({ alertShow: true, alertType: type, alertMessage: message })
    if (time)
      setTimeout(() => {
        this.hideAlert()
      }, time)
  }
  private hideAlert(): void {
    this.setState({ alertShow: false })
    if (this.server.isListening())
      this.showAlert(
        'success',
        i18n.t('openBrowser', { domain: this.server.domain() }).replace(/&#x2F;/g, '/')
      )
  }
  /*****************************************************************
   *                            Events                             *
   *****************************************************************/
  private async onStartStopServer(): Promise<void> {
    this.setState({ serverWaiting: true })

    if (!this.server.isListening()) {
      if (await this.isValid()) {
        this.startServer()
      } else {
        this.setState({ serverWaiting: false })
      }
    } else {
      this.closeServer()
    }
  }

  private async onSave(): Promise<void> {
    const repository: ConfigRepository = new ConfigRepository()
    if (await this.isValid()) {
      repository.update({
        path: this.state.path,
        port: Number(this.state.port),
      })
      this.showAlert('success', i18n.t('saved'), 3000)
    }
  }

  /*****************************************************************
   *                              React                            *
   *****************************************************************/
  public async componentDidMount(): Promise<void> {
    const repository: ConfigRepository = new ConfigRepository()
    const config: ConfigModel = await repository.find()
    this.setState({ path: config.path, port: config.port })
  }

  public render(): JSX.Element {
    return (
      <Layout
        headerAction={
          <div>
            {this.state.serverActive ? (
              <Button
                onClick={() => shell.openExternalSync(this.server.domain())}
                disabled={!this.state.serverActive}
              >
                <Icon name="Window" color="#ffffff" />
              </Button>
            ) : null}
            <Button onClick={() => this.onStartStopServer()}>
              {this.state.serverWaiting ? (
                <span style={{ color: '#ffffff' }}>
                  <span
                    style={{ marginRight: 10 }}
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span>{this.state.serverActive ? i18n.t('stopping') : i18n.t('starting')}</span>
                </span>
              ) : this.state.serverActive ? (
                <Icon name="StopFill" color="#ffffff" />
              ) : (
                <Icon name="PlayFill" color="#ffffff" />
              )}
            </Button>
          </div>
        }
        footerAction={
          <div>
            <Button
              onClick={() => this.onSave()}
              disabled={this.state.serverActive}
              color="primary"
            >
              <span>{i18n.t('save')}</span>
            </Button>
          </div>
        }
      >
        <div>
          <TextField
            onChange={(value) => this.setState({ path: value })}
            disabled={this.state.serverActive}
            value={this.state.path}
            label={i18n.t('directory')}
          />

          <TextField
            onChange={(value) => this.setState({ port: value })}
            disabled={this.state.serverActive}
            value={this.state.port || 8000}
            type="number"
            label={i18n.t('port')}
            min={0}
            max={65536}
          />
          <Alert
            show={this.state.alertShow}
            message={this.state.alertMessage}
            type={this.state.alertType}
          />
        </div>
      </Layout>
    )
  }
}
