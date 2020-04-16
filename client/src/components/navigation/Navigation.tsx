import React from 'react'
import { Hidden } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { CardHeader } from '@material-ui/core'
import { AppBar } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Breadcrumbs } from '@material-ui/core'
import { Link } from '@material-ui/core'
import { InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import ListIcon from '@material-ui/icons/ViewList'
import GridIcon from '@material-ui/icons/ViewModule'
import ClearIcon from '@material-ui/icons/Clear'
import RefreshIcon from '@material-ui/icons/Refresh'
import FolderIcon from '@material-ui/icons/Folder'
import UploadIcon from '@material-ui/icons/CloudUpload'
import { Typography } from '@material-ui/core'
import styles from './NavigationStyle'

interface Props {
  directory: string
  hostname: string
  search: string
  view: 'list' | 'grid'
  onChangeView?: (view: 'list' | 'grid') => void
  onChangeDirectory?: (directory: string) => void
  onSearch?: (search: string) => void
  onRefresh?: (directory: string) => void
  onCreateFolder?: () => void
  onUpload?: () => void
}

export default (props: Props): JSX.Element => {
  const classes = styles()
  const { directory, hostname, search, view } = props

  const directories = (): string[] => {
    let directories: string[] = []

    for (let index = 0; index < directory.length; index++) {
      if (directory.charAt(index) === '/' && directory.substr(0, index) !== '') {
        directories.push(directory.substr(0, index))
      }
    }
    directories.push(directory)
    return directories
  }

  return (
    <Box>
      <AppBar color="primary" position="relative" elevation={1}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Hidden smUp>
                <Avatar src={require('../../assets/logo.svg')} alt="Logo" />
              </Hidden>
              <Hidden xsDown>
                <CardHeader
                  style={{ padding: 0 }}
                  avatar={<Avatar src={require('../../assets/logo.svg')} alt="Logo" />}
                  title={
                    <Typography className={classes.title} variant="h6" noWrap>
                      Shark
                    </Typography>
                  }
                  subheader={<Typography className={classes.subtitle}>{hostname}</Typography>}
                />
              </Hidden>
            </Grid>
            <Hidden xsDown>
              <Grid item xs />
            </Hidden>
            <Grid item>
              <div className={classes.searchRoot}>
                <InputBase
                  onChange={(event) => (props.onSearch ? props.onSearch(event.target.value) : null)}
                  value={search}
                  className={classes.searchInput}
                  placeholder="Search..."
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
                {search.length === 0 ? (
                  <SearchIcon />
                ) : (
                  <ClearIcon
                    data-testid="clear-search"
                    onClick={() => (props.onSearch ? props.onSearch('') : null)}
                  />
                )}
              </div>
            </Grid>
            <Hidden xsDown>
              <Grid item>
                {view === 'list' ? (
                  <IconButton
                    onClick={() => (props.onChangeView ? props.onChangeView('grid') : null)}
                    className={classes.iconBtn}
                  >
                    <GridIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => (props.onChangeView ? props.onChangeView('list') : null)}
                    className={classes.iconBtn}
                  >
                    <ListIcon />
                  </IconButton>
                )}

                {props.onUpload ? (
                  <IconButton onClick={props.onUpload} className={classes.iconBtn}>
                    <UploadIcon />
                  </IconButton>
                ) : null}

                {props.onCreateFolder ? (
                  <IconButton onClick={props.onCreateFolder} className={classes.iconBtn}>
                    <FolderIcon />
                  </IconButton>
                ) : null}
                {props.onRefresh ? (
                  <IconButton
                    onClick={() => (props.onRefresh ? props.onRefresh(directory) : null)}
                    className={classes.iconBtn}
                  >
                    <RefreshIcon />
                  </IconButton>
                ) : null}
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>

        <Toolbar variant="dense" className={classes.breadcrumbContainer}>
          <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
            <Link
              onClick={() => (props.onChangeDirectory ? props.onChangeDirectory('/') : null)}
              className={classes.link}
            >
              <HomeIcon className={classes.icon} /> Home{' '}
            </Link>
            {directories().map((directory: string) => (
              <Link
                data-testid={`dir-${directory.split('/').pop()}`}
                className={classes.link}
                key={directory}
                color="inherit"
                onClick={() =>
                  props.onChangeDirectory ? props.onChangeDirectory(directory) : null
                }
              >
                {directory.split('/').pop()}
              </Link>
            ))}
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
