import React from 'react'
import { Fab } from '@material-ui/core'
import { Options } from '../'
import AddIcon from '@material-ui/icons/Add'
import FolderIcon from '@material-ui/icons/Folder'
import UploadIcon from '@material-ui/icons/CloudUpload'
import styles from './FabStyle'

interface Props {
  onCreate?: () => void
  onUpload?: () => void
}

export default (props: Props) => {
  const classes = styles()

  const onClick = (type: string) => {
    if (type === 'create' && props.onCreate) props.onCreate()
    if (type === 'upload' && props.onUpload) props.onUpload()
  }

  return (
    <div className={classes.root}>
      <Options
        title="New"
        items={[
          { label: 'Folder', name: 'create', icon: <FolderIcon /> },
          { label: 'Upload', name: 'upload', icon: <UploadIcon /> },
        ]}
        onSelected={(selected) => onClick(selected)}
      >
        <Fab data-testid="fab" color="primary">
          <AddIcon />
        </Fab>
      </Options>
    </div>
  )
}
