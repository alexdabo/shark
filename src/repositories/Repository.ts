import * as DB from 'lowdb'
import * as path from 'path'
import * as os from 'os'
import * as File from 'lowdb/adapters/FileSync'
import { defaultDB } from '../configs/app.config'
import DBModel from '../models/DBModel'

export default class Repository {
  protected db = DB(new File(path.join(os.homedir(), '.shark', 'config.json')))
  constructor() {
    const model: DBModel = defaultDB
    this.db.defaults(model).write()
  }
}
