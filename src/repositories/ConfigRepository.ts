import Repository from './Repository'
import { ConfigModel } from '../models/DBModel'

export default class ConfigRepository extends Repository {
  public async find(): Promise<ConfigModel> {
    return await this.db.get('config').value()
  }

  public async update(configModel: ConfigModel): Promise<ConfigModel> {
    let stored: ConfigModel = await this.find()
    configModel.path = configModel.path || stored.path
    configModel.port = configModel.port || stored.port
    configModel.lang = configModel.lang || stored.lang
    const { config } = await this.db.set('config', configModel).write()
    return config
  }
}
