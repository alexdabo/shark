import React from 'react'
import { render } from '@testing-library/react'
import { cleanup } from '@testing-library/react'
import Header from './Header'

describe('<Header/>', () => {
  afterEach(cleanup)
  it('Should render correctly', (done) => {
    const { getByText, getByTestId } = render(<Header fileName="file.jpg" fileIcon="icon" />)
    expect(getByText(/file.jpg/i)).toBeInTheDocument
    expect(getByTestId('toolbar').children.length).toBe(2)
    done()
  })
})
