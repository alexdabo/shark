import React from 'react'
import i18n from '../../i18n'
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
  const [open, setOpen] = React.useState(false)

  const onClick = (type: string) => {
    if (type === 'create' && props.onCreate) props.onCreate()
    if (type === 'upload' && props.onUpload) props.onUpload()
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Fab onClick={() => setOpen(true)} data-testid="fab" color="primary">
        <AddIcon />
      </Fab>
      <Options
        title={i18n.t('simple.new')}
        open={open}
        closable={true}
        onClose={() => setOpen(false)}
        items={[
          { label: i18n.t('simple.folder'), name: 'create', icon: <FolderIcon /> },
          { label: i18n.t('simple.upload'), name: 'upload', icon: <UploadIcon /> },
        ]}
        onSelected={(selected) => onClick(selected)}
      />
    </div>
  )
}
