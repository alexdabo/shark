import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as cors from 'cors'
import * as history from 'connect-history-api-fallback'
import * as ip from 'ip'
import * as os from 'os'
import * as path from 'path'
import { Server as HTTPServer } from 'http'
import ServerOptions from '../utils/ServerOptions'
import dir from '../utils/Directory'

export default class Server {
  private server: HTTPServer
  private listening: boolean

  public start(options: ServerOptions): void {
    const { home, client, port, mode, onListening, onError } = options

    // Config express application
    const application: express.Application = this.expressServer(home, client, mode)

    // init server
    this.server = application
      .listen(port, () => {
        this.listening = true
      })
      .on('listening', () => {
        this.setDomain(`http://${ip.address()}${port === 80 ? '' : `:${port}`}`)
        this.setHome(home)
        onListening(this.domain())
      })
      .on('error', onError)
  }

  public close(onClose?: () => void): void {
    this.server
      .close(() => {
        this.listening = false
        this.setDomain(null)
      })
      .on('close', onClose)
  }

  // create express server configuration
  protected expressServer(
    homedir: string,
    client: string,
    mode: 'history' | 'default'
  ): express.Application {
    let app: express.Application = express()
    app = express()

    // set cors
    app.use(cors())

    // set connect-history-api-fallback
    if (mode === 'history') app.use(history())

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    //set public files
    app.use('/', express.static(client))
    app.use('/public', express.static(homedir))
    app.use('/public/fileicon', express.static(path.join(os.homedir(), '.shark/fileicons')))

    // set endpoints
    app.use('/api/app', require('./controllers/AppController'))
    app.use('/api/folder', require('./controllers/FolderController'))
    app.use('/api/file', require('./controllers/FileController'))

    return app
  }

  public isListening(): boolean {
    return this.listening
  }
  public domain(): string {
    return process.env.DOMAIN
  }

  public ip(): string {
    return ip.address()
  }
  private setDomain(domain: string) {
    process.env.DOMAIN = domain ? domain : undefined
  }

  private setHome(home?: string) {
    process.env.HOMEDIR = home ? dir.format(home) : undefined
  }
}
