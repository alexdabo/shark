import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AboutView from '../render/AboutView'
import app from '../../utils/AppInfo'

window.addEventListener('DOMContentLoaded', () => {
  document.title = app.name
  ReactDOM.render(<AboutView />, document.getElementById('root'))
})
