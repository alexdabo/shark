import { expect } from 'chai'
import * as path from 'path'
import { address } from 'ip'
import Server from '../server/Server'

const server: Server = new Server()
const doamin: string = `http://${address()}:8000`

describe('Server', () => {
  it('Start server', (done) => {
    server.start({
      port: Number(doamin.split(':').pop()),
      home: path.join(__dirname, '../../public'),
      client: path.join(__dirname, '../../public'),
      mode: 'default',
      onListening: (domain) => {
        // Server should be listening
        expect(server.isListening()).to.equal(true)
        // Server should return a domain.
        expect(domain).to.eql(doamin)
      },
      onError: () => {},
    })
    done()
  }),
    it('Close server', (done) => {
      server.close(() => {
        // Server shouldn't be listening
        expect(server.isListening()).to.equal(false)
      })
      done()
    })
})
