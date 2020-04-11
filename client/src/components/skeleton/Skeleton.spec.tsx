import '@testing-library/jest-dom'
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Skeleton from './Skeleton'

describe('<Skeleton/>', () => {
  afterEach(cleanup)

  it('Should render correctly', (done) => {
    const { getByTestId } = render(<Skeleton />)
    expect(getByTestId('skeleton').childNodes.length).toBe(1)
    done()
  })

  it("Should have 5 child's", (done) => {
    const { getByTestId } = render(<Skeleton items={5} />)
    expect(getByTestId('skeleton').childNodes.length).toBe(5)
    done()
  })
})
