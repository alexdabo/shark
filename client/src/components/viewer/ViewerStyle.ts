import { Theme } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles'

export default (theme: Theme) => ({
  folderAvatar: {
    backgroundColor: fade(theme.palette.primary.main, 0.9),
  },
  avatar: {
    marginRight: 10,
    marginTop: 4,
  },

  // empty
  emptyContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  emptyContent: {
    margin: 'auto',
    color: '#dce0e6',
  },
  emptyImage: {
    width: 120,
    height: 120,
    margin: theme.spacing(1),
  },

  // grid view
  gridView: {
    width: 'calc(100vw + 3px)',
    maxHeight: '100%',
    paddingBottom: '90px!important',
    paddingTop: 10,
    paddingLeft: 4,
  },
  gridItem: {
    margin: 'auto',
    paddingBlock: 15,
  },
  // table view
  table: { paddingBottom: 90 },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
    },
  },
})
