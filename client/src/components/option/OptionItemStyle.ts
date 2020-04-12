import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles'
export default makeStyles((theme: Theme) =>
  createStyles({
    confirm: {
      color: 'orange',
    },
    item: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: fade(theme.palette.primary.main, 0.15),
      },
    },
  })
)
