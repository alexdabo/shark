import Repository from './Repository'
import FileModel from '../models/FileModel'
import { FileIconModel } from '../models/DBModel'

export default class FileIconRepository extends Repository {
  public async findOne(file: FileModel): Promise<FileModel> {
    let icons: FileIconModel[] = await this.db.get('fileIcons').value()
    let fileIcon: FileIconModel = icons.find((fileicon) => fileicon.mine === '*')

    if (file.mine) {
      icons = icons
        // filter type
        .filter((result) => {
          return result.mine.split('/')[0] === file.mine.split('/')[0]
        })
        // filter extension
        .filter((result) => {
          return (
            result.mine.split('/').pop() === file.mine.split('/').pop() ||
            result.mine.split('/').pop() === '*'
          )
        })
      fileIcon = icons[0] || fileIcon
    }
    file.icon = fileIcon.icon.replace('@/', `${process.env.DOMAIN}/public/fileicon/`)
    return file
  }

  public async findForAll(files: FileModel[]): Promise<FileModel[]> {
    let icons: FileIconModel[] = await this.db.get('fileIcons').value()

    files.forEach((file) => {
      let iconsTmp: FileIconModel[] = icons
      let fileIcon: FileIconModel = iconsTmp.find((fileicon) => fileicon.mine === '*')
      if (file.mine) {
        iconsTmp = iconsTmp
          .filter((result) => {
            return result.mine.split('/')[0] === file.mine.split('/')[0]
          })
          .filter((result) => {
            return (
              result.mine.split('/').pop() === file.mine.split('/').pop() ||
              result.mine.split('/').pop() === '*'
            )
          })
      }
      fileIcon = iconsTmp[0] || fileIcon
      file.icon = fileIcon.icon.replace('@/', `${process.env.DOMAIN}/public/fileicon/`)
    })

    return files
  }
}
