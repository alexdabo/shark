import { expect } from 'chai'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'
import FileIconRepository from '../../repositories/FileIconRepository'
import FileOption from '../../models/FileModel'

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
    repo.findOne(files[2]).then((result) => {
      expect(result)
        .to.have.property('icon')
        .to.be.equal(`${process.env.DOMAIN}/public/fileicon/file.svg`)
    })
    done()
  })

  it('Load with mine image/png', (done) => {
    const repo: FileIconRepository = new FileIconRepository()
    repo.findOne(files[3]).then((result) => {
      expect(result)
        .to.have.property('icon')
        .to.be.equal(`${process.env.DOMAIN}/public/fileicon/image.svg`)
    })
    done()
  })

  it('Load a list', (done) => {
    const repo: FileIconRepository = new FileIconRepository()
    repo.findForAll(files).then((result) => {
      expect(result[0])
        .to.have.property('icon')
        .to.be.equal(`${process.env.DOMAIN}/public/fileicon/pdf.svg`)
      expect(result[1])
        .to.have.property('icon')
        .to.be.equal(`${process.env.DOMAIN}/public/fileicon/video.svg`)
      expect(result[2])
        .to.have.property('icon')
        .to.be.equal(`${process.env.DOMAIN}/public/fileicon/file.svg`)
      expect(result[3])
        .to.have.property('icon')
        .to.be.equal(`${process.env.DOMAIN}/public/fileicon/image.svg`)
      expect(result[4])
        .to.have.property('icon')
        .to.be.equal(`${process.env.DOMAIN}/public/fileicon/ms_word.svg`)
    })
    done()
  })
})

const files: FileOption[] = [
  {
    url: `${process.env.DOMAIN}/public/test/book.pdf`,
    name: 'book.pdf',
    mine: 'application/pdf',
    ext: '.pdf',
    size: 10000,
  },
  {
    url: `${process.env.DOMAIN}/public/test/movie.mp4`,
    name: 'movie.mp4',
    mine: 'video/mp4',
    ext: '.pm4',
    size: 10000,
  },
  {
    url: `${process.env.DOMAIN}/public/test/data.json`,
    name: 'data.json',
    mine: 'application/json',
    ext: '.json',
    size: 1000,
  },
  {
    url: `${process.env.DOMAIN}/public/test/picture.png`,
    name: 'picture.png',
    mine: 'image/png',
    ext: '.png',
    size: 10000,
  },
  {
    url: `${process.env.DOMAIN}/public/test/ms-document.docx`,
    name: 'ms-document.docx',
    mine: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ext: '.docx',
    size: 10000,
  },
]
