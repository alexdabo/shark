import React from 'react'
import { render } from '@testing-library/react'
import { cleanup } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Options from './Options'
import Download from '@material-ui/icons/CloudDownload'
import Upload from '@material-ui/icons/CloudUpload'

describe('<Options/>', () => {
  afterEach(cleanup)

  it('Should render correctly', (done) => {
    const { getByText } = render(<Options title="options" open={true} closable={true} items={[]} />)
    expect(getByText(/options/i)).toBeInTheDocument
    done()
  })

  it('Should launch the modal', (done) => {
    const { getByTestId } = render(
      <Options
        title="options"
        avatar={<div></div>}
        open={true}
        closable={true}
        items={[]}
        onClose={() => done()}
      />
    )

    // expect 3 children's
    // 1 avatar, 1 title, and close  button
    expect(getByTestId('subheader').children.length).toBe(3)

    // expect 2 children's
    // 1 subheader and 1 divisor
    expect(getByTestId('list').children.length).toBe(2)

    // close
    fireEvent.click(getByTestId('close'))
  })

  it('Should choose a option', (done) => {
    const { getByTestId } = render(
      <Options
        title="options"
        avatar={<div></div>}
        open={true}
        closable={true}
        items={[
          { label: 'Download', name: 'download', icon: <Download /> },
          { label: 'Upload', name: 'upload', icon: <Upload /> },
        ]}
        onSelected={(selected) => {
          expect(selected).toBe('download')
          done()
        }}
      />
    )

    // expect 4 children's
    // 1 subheader, 1 divisor, and 2 options
    expect(getByTestId('list').children.length).toBe(4)

    // select a option
    fireEvent.click(getByTestId('download'))
  })
})
