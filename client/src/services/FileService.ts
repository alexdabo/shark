import axios from 'axios'
import Service from './Service'
import util from '../utils'

export default class FileService extends Service {
  public async upload(
    path: string,
    file: File,
    onUploadProgress: (progress: number, sizeProgress: string) => void
  ): Promise<any> {
    let formData = new FormData()
    formData.append('path', path)
    formData.append('file', file)

    const res = await axios.post(this.apiURL('/file'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progress: any) => {
        onUploadProgress(
          //@ts-ignore
          parseInt(Math.round((progress.loaded * 100) / progress.total)),
          `${util.formatSize(progress.loaded)} of ${util.formatSize(progress.total)}`
        )
      },
    })
    return res.data
  }

  public async download(url: string): Promise<void> {
    await axios({
      url,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response: any) => {
      const blobURL = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = blobURL
      link.setAttribute('download', decodeURI(url.split('/').pop() || ''))
      document.body.appendChild(link)
      link.click()
    })
  }

  public async delete(path: string): Promise<any> {
    const res = await axios.delete(this.apiURL('/file'), { data: { path } })
    return res.data
  }
}
