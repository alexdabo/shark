export default interface DBModel {
  config: ConfigModel
  fileIcons: FileIconModel[]
}

export interface FileIconModel {
  mine: string
  icon: string
}

export interface ConfigModel {
  path: string
  port: number
}
