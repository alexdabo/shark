import React from 'react'
import { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core'
import { Theme } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import ManagerView from './manage/Manager'

const theme: Theme = createMuiTheme({
  palette: {
    primary: { main: '#0097fc' },
    secondary: { main: '#19b4fc' },
  },
})

export default class App extends Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/:dir?" component={ManagerView} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}
