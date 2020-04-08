import * as DB from 'lowdb'
import * as path from 'path'
import * as os from 'os'
import * as File from 'lowdb/adapters/FileSync'
import DBModel from '../models/DBModel'
import { FileIconModel } from '../models/DBModel'

export default class Repository {
  protected db = DB(new File(path.join(os.homedir(), '.shark', 'config.json')))
  constructor() {
    const model: DBModel = {
      config: {
        path: os.homedir(),
        port: 8000,
      },
      fileIcons: icons,
    }
    this.db.defaults(model).write()
  }
}

const icons: FileIconModel[] = [
  // default
  {
    mine: '*',
    icon: '@/file.svg',
  },
  // Images
  {
    mine: 'image/*',
    icon: '@/image.svg',
  },
  // Audio
  {
    mine: 'audio/*',
    icon: '@/audio.svg',
  },
  // Video
  {
    mine: 'video/*',
    icon: '@/video.svg',
  },
  // docs
  {
    mine: 'application/pdf',
    icon: '@/pdf.svg',
  },
  {
    mine: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    icon: '@/ms_excel.svg',
  },
  {
    mine: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    icon: '@/ms_word.svg',
  },
  {
    mine: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    icon: '@/ms_powerpoint.svg',
  },
  {
    mine: 'application/vnd.ms-access',
    icon: '@/ms_access.svg',
  },
  //compressed
  {
    mine: 'application/zip',
    icon: '@/zip.svg',
  },
  {
    mine: 'application/rar',
    icon: '@/rar.svg',
  },
]
