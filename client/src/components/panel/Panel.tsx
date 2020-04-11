import React from 'react'
import { Box } from '@material-ui/core'
import styles from './PanelStyle'

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  header?: JSX.Element
}

export default (props: Props): JSX.Element => {
  const classes = styles()
  return (
    <div className={classes.root}>
      <Box boxShadow={3}>{props.header}</Box>
      <Box {...props} className={classes.container}>
        {props.children}
      </Box>
    </div>
  )
}
