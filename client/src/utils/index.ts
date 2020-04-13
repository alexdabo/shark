import moment from 'moment'

export default {
  formatSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },

  contentType: (extension: string): string => {
    return extension.toUpperCase().replace('.', '')
  },

  formatDate: (date: string): string => {
    return moment(date).format('MMM Do YY')
  },
}
