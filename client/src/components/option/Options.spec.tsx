import React from 'react'
import { render } from '@testing-library/react'
import { cleanup } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Options, { OptionItem } from './Options'
import Download from '@material-ui/icons/CloudDownload'
import Upload from '@material-ui/icons/CloudUpload'

const items: OptionItem[] = [
  { label: 'Download', name: 'download', icon: <Download /> },
  { label: 'Upload', name: 'upload', icon: <Upload /> },
]

describe('<Options/>', () => {
  afterEach(cleanup)

  it('Should show modal', (done) => {
    const { getByText } = render(
      <Options items={[]}>
        <button>click me</button>
      </Options>
    )
    expect(getByText(/click me/i)).toBeInTheDocument
    done()
  })

  it('Should launch the modal', (done) => {
    const { getByTestId, getByText } = render(
      <Options title="option title" items={items}>
        <button data-testid="button">click me</button>
      </Options>
    )
    // launch modal
    fireEvent.click(getByTestId('button'))

    // title
    expect(getByText(/option title/i)).toBeInTheDocument

    // expect 4 children's
    // 2 options, 1 separator, and title
    expect(getByTestId('list').children.length).toBe(4)

    done()
  })

  it('Should choose a option', (done) => {
    const { getByTestId } = render(
      <Options
        title="option title"
        items={items}
        onSelected={(selected) => {
          expect(selected).toBe('download')
          done()
        }}
      >
        <button data-testid="button">click me</button>
      </Options>
    )
    // launch modal
    fireEvent.click(getByTestId('button'))

    // select a option
    fireEvent.click(getByTestId('download'))
  })
})
