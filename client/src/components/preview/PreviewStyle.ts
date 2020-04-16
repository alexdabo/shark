import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles'
export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgba(80,80,80,.85)',
    },
    navRight: {
      backgroundColor: fade(theme.palette.common.black, 0.15),
      color: fade(theme.palette.common.white, 0.75),
      position: 'absolute',
      zIndex: 999,
      top: '50%',
      right: 0,
    },
    navLeft: {
      backgroundColor: fade(theme.palette.common.black, 0.15),
      color: fade(theme.palette.common.white, 0.75),
      position: 'absolute',
      zIndex: 999,
      top: '50%',
      left: 0,
    },
  })
)
