import { Application } from 'express'
import * as path from 'path'
import * as os from 'os'
import Server from '../../server/Server'

// Express application for testing
class AppTest extends Server {
  constructor() {
    super()
    process.env.DOMAIN = 'http://localhost:8000'
    process.env.HOMEDIR = os.homedir().replace(/[\\]/g, '/')
  }
  app(): Application {
    return this.expressServer(
      process.env.HOMEDIR,
      path.join(__dirname, '../../../public'),
      'default'
    )
  }
}

export default new AppTest().app()
