import * as React from 'react'
import { shell } from 'electron'
import i18n from '../locales/AboutViewI18n'
import App from '../../utils/AppInfo'

export default class About extends React.Component {
  private app = App

  private redirect(): void {
    const URL: string = this.app.repository.replace('.git', '/issues')
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
    if (regex.test(URL)) {
      shell.openExternalSync(URL)
    }
  }

  public render(): JSX.Element {
    return (
      <div className="container" style={style.root}>
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <img src="icons/icon.svg" alt="logo" width="125" />
            <div style={style.title}>
              <span style={{ fontWeight: 'bold' }}>{this.app.name}</span>
            </div>
            <div>
              <span>
                {i18n.t('version')} {this.app.version}
              </span>
            </div>
            <div>
              <span>{i18n.t('description')}</span>
            </div>
            <div style={style.copyright}>
              <span>{this.app.copyright}</span>
            </div>
          </div>
        </div>
        <div
          style={{ position: 'absolute', right: '0.5em', bottom: '0.5em' }}
          onClick={() => this.redirect()}
        >
          <div style={style.link}>
            <span>{i18n.t('issues')} </span>
          </div>
        </div>
      </div>
    )
  }
}

const style = {
  root: {
    height: '100vh',
    paddingTop: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 20,
  },
  copyright: {
    marginTop: 20,
    color: '#999999',
    fontSize: 12,
  },
  link: {
    cursor: 'pointer',
    color: '#80a0c2',
    fontSize: 12,
  },
}
