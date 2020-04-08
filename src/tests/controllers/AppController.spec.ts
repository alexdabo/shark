import * as request from 'supertest'
import app from './AppTest.spec'

describe('AppController', () => {
  it('GET     =>  /app/info', (done) => {
    request(app)
      .get('/api/app')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err: Error) => {
        if (err) throw err
        done()
      })
  })
})
