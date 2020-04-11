import '@testing-library/jest-dom'
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Panel from './Panel'

describe('<Panel/>', () => {
  afterEach(cleanup)

  it('Should render correctly', (done) => {
    const { getByText } = render(<Panel header={<div>header</div>}>body</Panel>)
    expect(getByText(/header/i)).toBeInTheDocument
    expect(getByText(/body/i)).toBeInTheDocument
    done()
  })
})
