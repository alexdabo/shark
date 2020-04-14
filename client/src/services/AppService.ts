import axios from 'axios'
import Service from './Service'
import AppModel from '../models/AppModel'

export default class AppService extends Service {
  public async getApp(): Promise<AppModel> {
    const res = await axios.get(this.apiURL('/app'))
    const app: AppModel = res.data
    return app
  }
}
