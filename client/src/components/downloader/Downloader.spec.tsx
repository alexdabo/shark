import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { cleanup } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Downloader from './Downloader'

describe('<Downloader/>', () => {
  afterEach(cleanup)

  it('Should render correctly', (done) => {
    const { getByText } = render(
      <Downloader src="">
        <span>download</span>
      </Downloader>
    )
    const btn = getByText(/download/i)
    expect(btn).toBeInTheDocument()
    done()
  })

  it('Should download', (done) => {
    const { getByText } = render(
      <Downloader src="https://via.placeholder.com/600/92c952" onDownload={() => done()}>
        <span>download</span>
      </Downloader>
    )
    const btn = getByText(/download/i)
    fireEvent.click(btn)
    done()
  })
})
