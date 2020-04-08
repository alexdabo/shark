export default interface ServerOptions {
  port: number
  home: string
  client: string
  mode: 'history' | 'default'
  onListening: (domain: string) => void
  onError: (err: Error) => void
}
