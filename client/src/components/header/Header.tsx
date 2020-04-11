import React from 'react'
import { Hidden } from '@material-ui/core'
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
import ClearIcon from '@material-ui/icons/Clear'
import { Typography } from '@material-ui/core'
import styles from './HeaderStyle'

interface Props {
  directory: string
  hostname: string
  search: string
  onChange: (directory: string) => void
  onSearch: (search: string) => void
}

export default (props: Props): JSX.Element => {
  const classes = styles()
  const { directory, hostname, search } = props

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
    <Box boxShadow={5}>
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
              <div className={classes.searchRoot} style={{}}>
                <InputBase
                  onChange={(event) => props.onSearch(event.target.value)}
                  value={search}
                  className={classes.searchInput}
                  placeholder="Search..."
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
                {search.length === 0 ? (
                  <SearchIcon />
                ) : (
                  <ClearIcon data-testid="clear-search" onClick={() => props.onSearch('')} />
                )}
              </div>
            </Grid>
          </Grid>
        </Toolbar>

        <Toolbar variant="dense" className={classes.breadcrumbContainer}>
          <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
            <Link
              onClick={() => {
                props.onChange('/')
              }}
              className={classes.link}
            >
              <HomeIcon className={classes.icon} /> Home{' '}
            </Link>
            {directories().map((directory: string) => (
              <Link
                // for testing
                data-testid={`dir-${directory.split('/').pop()}`}
                className={classes.link}
                key={directory}
                color="inherit"
                onClick={() => {
                  props.onChange(directory)
                }}
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
