import * as request from 'supertest'
import app from './AppTest.spec'

describe('FileController', () => {
  it('POST    =>  /api/file - Upload a file', (done) => {
    request(app)
      .post('/api/file')
      .field('path', '/')
      .attach('file', __filename)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err: Error) => {
        if (err) throw err
        done()
      })
  })

  it('DELETE  =>  /api/file', (done) => {
    request(app)
      .delete('/api/file')
      .send({ path: `/FileController.spec.ts` })
      .expect('Content-Length', '0')
      .expect(200)
      .end((err: Error) => {
        if (err) throw err
        done()
      })
  })
})
