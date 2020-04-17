import '@testing-library/jest-dom'
import React from 'react'
import { render, cleanup, fireEvent, getByText } from '@testing-library/react'
import FolderForm from './FolderForm'

describe('<FolderForm/>', () => {
  afterEach(cleanup)

  it('Should render correctly', (done) => {
    const { getByText } = render(<FolderForm open={true} />)
    expect(getByText(/New folder/i)).toBeInTheDocument
    done()
  })

  it('Should cancel', (done) => {
    const { getByTestId } = render(
      <FolderForm
        open={true}
        onClose={() => {
          done()
        }}
      />
    )
    expect(getByTestId('cancel-btn')).toBeInTheDocument
    fireEvent.click(getByTestId('cancel-btn'))
    done()
  })

  it('Should submit', (done) => {
    const { getByTestId } = render(
      <FolderForm
        open={true}
        onSubmit={(value) => {
          expect(value).toBe('')
          done()
        }}
      />
    )
    expect(getByTestId('submit-btn')).toBeInTheDocument
    expect(getByTestId('name-input')).toBeInTheDocument
    fireEvent.change(getByTestId('name-input'))
    fireEvent.click(getByTestId('submit-btn'))
    done()
  })
})
