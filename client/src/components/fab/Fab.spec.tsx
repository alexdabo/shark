import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { cleanup } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Fab from './Fab'

describe('<Fab/>', () => {
  afterEach(cleanup)

  it('Should show modal', (done) => {
    const { getByTestId } = render(<Fab />)
    const fab = getByTestId('fab')
    fireEvent.click(fab)
    done()
  })

  it('Should click on folder option', (done) => {
    const { getByTestId } = render(
      <Fab
        onCreate={() => {
          done()
        }}
      />
    )
    // launch modal
    const fab = getByTestId('fab')
    fireEvent.click(fab)
    // new folder event
    const createBtn = getByTestId('create')
    fireEvent.click(createBtn)
  })

  it('Should click on upload option', (done) => {
    const { getByTestId } = render(
      <Fab
        onUpload={() => {
          done()
        }}
      />
    )
    // launch modal
    const fab = getByTestId('fab')
    fireEvent.click(fab)
    // Upload click
    const uploadBtn = getByTestId('upload')
    fireEvent.click(uploadBtn)
  })
})
