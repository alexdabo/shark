import * as fs from 'fs-extra'
import * as path from 'path'
import * as mt from 'mime-types'
import * as compressing from 'compressing'
import FileModel from '../models/FileModel'
import dir from './Directory'
import FileIconRepository from '../repositories/FileIconRepository'

const format = (directory: string): string => {
  return directory.replace(/[\\]/g, '/')
}

const fileProps = (directory: string): FileModel => {
  directory = dir.format(directory)
  const fileStat: fs.Stats = fs.statSync(directory)

  return {
    url: encodeURI(directory.replace(process.env.HOME, `${process.env.DOMAIN}/public`)),
    icon: '',
    name: path.basename(directory),
    mine: mt.contentType(path.extname(directory)) || undefined,
    ext: path.extname(directory),
    size: fs.statSync(directory).size,
    accessedAt: fileStat.atime,
    modifiedAt: fileStat.ctime,
  }
}

export default {
  // replace "\" with "/" in the directories to make it cross-platform
  format: (directory: string): string => {
    return format(directory)
  },

  createFolder: (path: string): string => {
    path = format(path)
    try {
      fs.mkdirSync(path)
    } catch (error) {
      throw error
    }
    return path
  },

  deleteFolder: (path: string): string => {
    path = dir.format(path)
    try {
      fs.rmdirSync(path)
    } catch (error) {
      throw error
    }
    return path
  },

  deleteFile: (path: string): void => {
    path = dir.format(path)
    try {
      fs.unlinkSync(path)
    } catch (error) {
      throw error
    }
  },

  rename: (path: string, name: string): string => {
    path = dir.format(path)
    const destination: string = path.replace(path.split('/').pop(), name)
    try {
      fs.renameSync(path, destination)
    } catch (error) {
      throw error
    }
    return destination.replace(process.env.HOME, '')
  },

  move: (origin: string, destination: string): string => {
    origin = dir.format(origin)
    destination = dir.format(destination)
    try {
      fs.moveSync(origin, destination)
    } catch (error) {
      throw error
    }
    return destination
  },

  copy: (origin: string, destination?: string): string => {
    origin = origin.replace(/[\\]/g, '/')
    destination = destination.replace(/[\\]/g, '/')
    const des: string = destination || `${origin}_(copy)`
    try {
      fs.copySync(origin, des)
    } catch (error) {
      throw error
    }
    return des
  },

  zip: async (origin: string, destination?: string): Promise<string> => {
    origin = dir.format(origin)
    destination = dir.format(destination || origin)
    destination = destination.endsWith('.zip') ? destination : `${destination}.zip`
    try {
      await compressing.zip.compressDir(origin, destination)
    } catch (error) {
      throw error
    }
    return destination
  },

  fileProps: (directory: string): FileModel => {
    return fileProps(directory)
  },

  readFiles: async (directory: string): Promise<FileModel[]> => {
    let files: FileModel[] = []

    files = fs
      .readdirSync(directory, { withFileTypes: true })
      .filter((file) => file.isFile() && !/(^|\/)\.[^\/\.]/g.test(file.name))
      .map((file): FileModel => fileProps(path.join(directory, file.name)))

    return await new FileIconRepository().findForAll(files)
  },

  readFolders: (directory: string): string[] => {
    let folders: string[] = []

    folders = fs
      .readdirSync(directory, { withFileTypes: true })
      .filter((folder) => folder.isDirectory() && !/(^|\/)\.[^\/\.]/g.test(folder.name))
      .map((folder) => path.join(directory, folder.name).replace(process.env.HOME, ''))
      .map((folder) => dir.format(folder).replace(process.env.HOME, ''))
    return folders
  },
}
