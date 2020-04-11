import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
    },
    container: {
      flexGrow: 1,
      overflowY: 'auto',
    },
  })
)
