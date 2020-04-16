import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    element: {
      maxHeight: '100%',
      maxWidth: '100%',
      margin: 'auto auto',
    },

    // UnsupportedPreview
    info: {
      fontSize: 60,
      color: theme.palette.common.white,
    },
    msg: {
      color: theme.palette.common.white,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },

    // pdf viewer
    pdfViewer: {
      height: 'calc(100% - 5px)',
      width: '100%',
      border: 'none',
    },
  })
)
