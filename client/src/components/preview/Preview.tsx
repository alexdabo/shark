import React from 'react'
import { Modal, IconButton } from '@material-ui/core'
import NextIcon from '@material-ui/icons/NavigateNext'
import BeforeIcon from '@material-ui/icons/NavigateBefore'
import ImagePreview from './ImagePreview'
import VideoPreview from './VideoPreview'
import JsonPreview from './JsonPreview'
import PdfPreview from './PdfPreview'
import UnsupportedPreview from './UnsupportedPreview'
import { FileModel } from '../../models'
import styles from './PreviewStyle'

interface Props {
  open: boolean
  file: FileModel
  onClose?: () => void
  onDownload?: (url: string) => void
  onNavigate?: (nav: 'before' | 'next') => void
}

export default (props: Props): JSX.Element => {
  const { open, file } = props
  const classes = styles()

  const Preview = (): JSX.Element => {
    let viewer: JSX.Element
    let { mine } = props.file

    // When mine type is undefined
    mine = mine || ''

    if (mine.startsWith('image')) mine = 'image'
    if (mine.startsWith('video')) mine = 'video'
    if (mine.startsWith('application/pdf')) mine = 'pdf'
    if (mine.startsWith('application/json')) mine = 'json'

    switch (mine) {
      case 'image':
        viewer = (
          <ImagePreview
            file={file}
            onClose={props.onClose}
            onDownload={() => (props.onDownload ? props.onDownload(file.url) : null)}
          />
        )
        break

      case 'video':
        viewer = (
          <VideoPreview
            file={file}
            onClose={props.onClose}
            onDownload={() => (props.onDownload ? props.onDownload(file.url) : null)}
          />
        )
        break

      case 'pdf':
        viewer = <PdfPreview file={file} onClose={props.onClose} />
        break

      case 'json':
        viewer = (
          <JsonPreview
            file={file}
            onClose={props.onClose}
            onDownload={() => (props.onDownload ? props.onDownload(file.url) : null)}
          />
        )
        break

      default:
        viewer = (
          <UnsupportedPreview
            file={file}
            onClose={props.onClose}
            onDownload={() => (props.onDownload ? props.onDownload(file.url) : null)}
          />
        )
        break
    }
    return viewer
  }

  return (
    <Modal className={classes.root} open={open} onClose={props.onClose}>
      <div>
        {props.onNavigate ? (
          <IconButton
            onClick={() => (props.onNavigate ? props.onNavigate('before') : null)}
            className={classes.navLeft}
          >
            <BeforeIcon />
          </IconButton>
        ) : null}
        {props.onNavigate ? (
          <IconButton
            onClick={() => (props.onNavigate ? props.onNavigate('next') : null)}
            className={classes.navRight}
          >
            <NextIcon />
          </IconButton>
        ) : null}

        <Preview />
      </div>
    </Modal>
  )
}
