import React from 'react'
import { render } from '@testing-library/react'
import { cleanup } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Preview from './Preview'
import { files } from '../../test'

describe('<Preview/>', () => {
  afterEach(cleanup)
  it('Should render correctly default preview', (done) => {
    const { getByText } = render(<Preview open={true} file={files[4]} />)
    expect(getByText(/Preview not supported/i)).toBeInTheDocument
    done()
  })

  it('Should render correctly image preview', (done) => {
    const { getByText } = render(<Preview open={true} file={files[3]} />)
    expect(getByText(/picture.jpg/i)).toBeInTheDocument
    done()
  })

  it('Should render correctly json preview', (done) => {
    const { getByText } = render(<Preview open={true} file={files[2]} />)
    expect(getByText(/data.json/i)).toBeInTheDocument
    done()
  })

  it('Should render correctly video preview', (done) => {
    const { getByText } = render(<Preview open={true} file={files[1]} />)
    expect(getByText(/movie.mp4/i)).toBeInTheDocument
    done()
  })
})
