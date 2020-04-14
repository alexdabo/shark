interface App {
  author: string
  description: string
  license: string
  name: string
  version: string
}

export default interface AppModel {
  hostname: string
  platform: string
  release: string
  username: string
  app: App
}
