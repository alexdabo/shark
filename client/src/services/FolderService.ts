import axios from 'axios'
import Service from './Service'
import DirectoryModel from '../models/DirectoryModel'

export default class FolderService extends Service {
  public async getDirectories(path: string): Promise<DirectoryModel> {
    const res = await axios.get(this.apiURL('/folder'), {
      params: { path },
    })
    const directory: DirectoryModel = res.data
    return directory
  }

  public async create(path: string): Promise<string> {
    const res = await axios.post(this.apiURL('/folder'), { path })
    return res.data.url
  }

  public async download(path: string): Promise<void> {
    await axios({
      url: this.apiURL('/folder/download'),
      method: 'GET',
      params: { path },
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${path.split('/').pop()}.zip`)
      document.body.appendChild(link)
      link.click()
    })
  }

  public async rename(path: string, filename: string): Promise<any> {
    const res = await axios.put(this.apiURL('/folder'), { path, name: filename })
    return res.data
  }
}
