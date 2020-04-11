import React from 'react'
import axios from 'axios'
import style from './DownloaderStyle'

interface Props {
  src: string
  children?: JSX.Element
  onDownload?: () => void
}

export default (props: Props): JSX.Element => {
  const { src, children, onDownload } = props
  const classes = style()
  const download = async () => {
    axios({
      url: src,
      method: 'GET',
      responseType: 'blob', // important
    })
      .then((response: any) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', src.split('/').pop() || '')
        document.body.appendChild(link)
        link.click()
      })
      .finally(() => {
        if (onDownload) onDownload()
      })
  }
  return (
    <div className={classes.root} onClick={() => download()}>
      {children}
    </div>
  )
}
