import * as React from 'react'

interface Props {
  headerAction?: JSX.Element
  footerAction?: JSX.Element
  children?: JSX.Element
}

export default (props: Props): JSX.Element => {
  return (
    <React.Fragment>
      <div className="card" style={style.root}>
        {
          <div
            // @ts-ignore
            style={style.header}
            className="card-header primary py-1 d-flex flex-row align-items-center justify-content-between"
          >
            <div>
              <img src="icons/icon.svg" alt="logo" width="40" />
            </div>
            {props.headerAction}
          </div>
        }
        {
          //@ts-ignore
          <div style={style.body} className="card-body">
            {props.children}
          </div>
        }
        {props.footerAction ? (
          //@ts-ignore
          <div className="modal-footer" style={style.footer}>
            {props.footerAction}
          </div>
        ) : null}
      </div>
    </React.Fragment>
  )
}

const style = {
  root: {
    height: '100vh',
  },
  header: {
    position: 'fixed',
    width: '100%',
  },
  body: {
    overflow: 'auto',
    position: 'fixed',
    width: '100%',
    bottom: 50,
    top: 50,
  },
  footer: {
    position: 'fixed',
    padding: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
}
