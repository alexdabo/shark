import * as os from 'os'
import * as fs from 'fs'
import * as path from 'path'
import DBModel from '../models/DBModel'

export const languages: string[] = ['en', 'es']
export type language = 'en' | 'es'
export function lang() {
  const configFile = path.join(os.homedir(), '.shark/config.json')
  if (fs.existsSync(configFile)) {
    const file = fs.readFileSync(configFile)
    //@ts-ignore
    process.env.APP_LANG = JSON.parse(file).config.lang || locale()
  } else {
    process.env.APP_LANG = locale()
  }
}
export function locale() {
  let locale: string = process.env.LANG?.replace(/[_:].*/, '')
  if (!languages.includes(locale)) locale = 'en'
  return locale
}

export const defaultDB: DBModel = {
  config: {
    path: os.homedir(),
    port: 8000,
    lang: locale(),
  },
  fileIcons: [
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
  ],
}
