import { expect } from 'chai'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'
import ConfigRepository from '../repositories/ConfigRepository'
import { ConfigModel } from '../models/DBModel'

// Create config folder
// Configuration data is stored in this folder
before('Create ConfigFolder', (done) => {
  const configdir = path.join(os.homedir(), '.shark')
  const configfile = path.join(os.homedir(), '.shark', 'config.json')
  if (!fs.existsSync(configdir)) {
    fs.mkdirSync(configdir)
  }
  if (fs.existsSync(configfile)) {
    fs.unlinkSync(configfile)
  }
  done()
})

describe('ConfigRepository', () => {
  it('Default config', (done) => {
    const repo: ConfigRepository = new ConfigRepository()
    repo.find().then((config) => {
      expect(config).to.contain({ path: os.homedir(), port: 8000 })
    })
    done()
  })

  it('Update config', (done) => {
    const repo: ConfigRepository = new ConfigRepository()

    const config: ConfigModel = {
      port: 3000,
      path: path.join(os.homedir(), 'test'),
    }

    repo.update(config).then((config) => {
      expect(config).to.contain({
        port: 3000,
        path: path.join(os.homedir(), 'test'),
      })
    })
    done()
  })
})
