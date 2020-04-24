import * as request from 'supertest'
import { expect } from 'chai'
import app from './AppTest.spec'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'

// Create tmp folder to store compressed folders
before('Create TmpFolder', (done) => {
  const tmpdir = path.join(os.tmpdir(), 'shark')
  if (!fs.existsSync(tmpdir)) {
    fs.mkdirSync(tmpdir)
  }
  done()
})

describe('FolderController', () => {
  it('POST    =>  /api/folder', (done) => {
    request(app)
      .post('/api/folder')
      .send({ path: '/shark-test' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err
        expect(res.body).to.contain({ url: '/shark-test' })
        done()
      })
  })

  it('GET     =>  /api/folder', (done) => {
    const folderTest: string = path.join(process.env.HOMEDIR, '/shark-test/folder-test')
    const fileTest: string = path.join(process.env.HOMEDIR, '/shark-test/file-test.txt')
    fs.appendFileSync(fileTest, 'Hello content!')
    fs.mkdirSync(folderTest)

    request(app)
      .get('/api/folder')
      .query({ path: '/shark-test' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw err

        // Should be the directory to which the request was made
        expect(res.body).to.have.property('path').to.equals('/shark-test')

        // Should be a list of folders with only one directory
        expect(res.body)
          .to.have.property('folders')
          .to.be.instanceof(Array)
          .that.eql(['/shark-test/folder-test'])

        // Should have ownership of files with length 1
        expect(res.body).to.have.property('files').to.be.instanceof(Array).with.lengthOf(1)

        // Should have a file with url consisting of domain and file name
        expect(res.body.files[0])
          .to.have.property('url')
          .to.equals(`${process.env.DOMAIN}/public/shark-test/file-test.txt`)

        // Should have the default file icon consisting of domain and file name
        expect(res.body.files[0])
          .to.have.property('icon')
          .to.equals(`${process.env.DOMAIN}/public/fileicon/file.svg`)

        fs.unlinkSync(fileTest)
        fs.rmdirSync(folderTest)
        done()
      })
  })

  it('GET     =>  /api/folder/download', (done) => {
    request(app)
      .get('/api/folder/download')
      .query({ path: '/shark-test' })
      .expect('Content-Type', /application\/zip/)
      .expect(200)
      .end((err) => {
        if (err) throw err
        done()
      })
  })

  it('PUT     =>  /api/folder', (done) => {
    request(app)
      .put('/api/folder')
      .send({ path: '/shark-test', name: 'shark-test-edited' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.contain({ url: '/shark-test-edited' })
        if (err) throw err
        done()
      })
  })

  it('DELETE  =>  /api/folder', (done) => {
    request(app)
      .delete('/api/folder')
      .query({ path: '/shark-test-edited' })
      .expect('Content-Length', '0')
      .expect(200)
      .end((err) => {
        if (err) throw err
        done()
      })
  })
})
