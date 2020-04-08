import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MainView from '../render/MainView'
import app from '../../utils/AppInfo'

window.addEventListener('DOMContentLoaded', () => {
  document.title = app.name
  ReactDOM.render(<MainView />, document.getElementById('root'))
})
