import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles'
export default makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    subtitle: {
      color: '#fafafa',
      fontSize: 12,
      marginTop: -12,
    },
    breadcrumbContainer: {
      backgroundColor: '#ffffff',
      overflow: 'auto',
    },
    breadcrumb: {
      margin: theme.spacing(1.5),
      paddingRight: theme.spacing(2),
    },
    link: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },

    searchRoot: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      width: '100%',
      height: 20,
      padding: theme.spacing(1),
      color: 'inherit',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchInput: {
      color: fade(theme.palette.common.white, 1),
      flex: 1,
    },
    iconBtn: {
      color: fade(theme.palette.common.white, 1),
    },
  })
)
