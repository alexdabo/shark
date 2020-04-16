import React from 'react'
import { Panel } from '..'
import { Header } from '..'
import { FileModel } from '../../models'
import styles from './CommonStyle'

interface Props {
  file: FileModel
  onClose?: () => void
  onDownload?: () => void
}

export default (props: Props): JSX.Element => {
  const { file } = props
  const classes = styles()
  return (
    <Panel
      header={
        <Header
          fileIcon={file.icon}
          fileName={file.name}
          onClose={props.onClose}
          onDownload={props.onDownload}
        />
      }
    >
      <div className={classes.container}>
        <img src={file.url} alt={file.name} className={classes.element} />
      </div>
    </Panel>
  )
}
