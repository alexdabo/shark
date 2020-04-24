import { expect } from 'chai'
import * as path from 'path'
import { address } from 'ip'
import Server from '../server/Server'

const server: Server = new Server()
const domain: string = `http://${address()}:8000`

describe('Server', () => {
  it('Start server', (done) => {
    server.start({
      port: Number(domain.split(':').pop()),
      home: path.join(__dirname, '../../public'),
      client: path.join(__dirname, '../../public'),
      mode: 'default',
      onListening: (listeningAt) => {
        // Server should be listening
        expect(server.isListening()).to.equal(true)
        // Server should return a domain.
        expect(listeningAt).to.eql(domain)
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
