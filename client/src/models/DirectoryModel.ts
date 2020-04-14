import FileModel from './FileModel'
export default interface DirectoryModel {
  path: string
  folders: string[]
  files: FileModel[]
}
