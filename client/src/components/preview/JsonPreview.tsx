import React from 'react'
import { Component } from 'react'
import ReactJson from 'react-json-view'
import WebIcon from '@material-ui/icons/Web'
import axios from 'axios'
import { Panel } from '..'
import { Header } from '..'
import { FileModel } from '../../models'

interface Props {
  file: FileModel
  onClose?: () => void
  onDownload?: () => void
}
interface State {
  json: object
}

export default class JsonPreview extends Component<Props, State> {
  public state: State = {
    json: {},
  }

  componentDidMount() {
    axios.get(this.props.file.url).then((res) => this.setState({ json: res.data }))
  }

  public render(): JSX.Element {
    const { file } = this.props
    const { json } = this.state

    return (
      <Panel
        header={
          <Header
            fileIcon={file.icon}
            fileName={file.name}
            onClose={this.props.onClose}
            onDownload={this.props.onDownload}
            actions={[
              {
                icon: <WebIcon />,
                key: 'action-web',
                action: () => {
                  window.open(file.url, '_blank')
                },
              },
            ]}
          />
        }
      >
        <ReactJson
          src={json}
          enableClipboard={true}
          displayDataTypes={false}
          theme="summerfruit"
          style={{ minHeight: '100%' }}
        />
      </Panel>
    )
  }
}
