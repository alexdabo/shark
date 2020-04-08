import { expect } from 'chai'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'
import FileIconRepository from '../repositories/FileIconRepository'

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

describe('FileIconRepository', () => {
  it('Load without mine', (done) => {
    const repo: FileIconRepository = new FileIconRepository()
    repo.findByMine().then((result) => {
      expect(result).to.contain({ mine: '*', icon: 'undefined/public/fileicon/file.svg' })
    })
    done()
  })

  it('Load with mine image/png', (done) => {
    const repo: FileIconRepository = new FileIconRepository()
    repo.findByMine('image/png').then((result) => {
      expect(result).to.contain({ mine: 'image/*', icon: 'undefined/public/fileicon/image.svg' })
    })
    done()
  })
})
