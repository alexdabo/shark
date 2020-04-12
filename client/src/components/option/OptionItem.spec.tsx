import React from 'react'
import { render } from '@testing-library/react'
import { cleanup } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import OptionItem from './OptionItem'

describe('<OptionItem/>', () => {
  afterEach(cleanup)

  it('Should render correctly', (done) => {
    const { getByText, getByTestId } = render(
      <OptionItem label="label" name="eventName" icon={<div></div>} onClick={() => done()} />
    )
    expect(getByText(/label/i)).toBeInTheDocument
    fireEvent.click(getByTestId('eventName'))
    done()
  })

  it('Should be confirmed', (done) => {
    const { getByText, getByTestId } = render(
      <OptionItem
        label=""
        name="eventName"
        icon={<div></div>}
        confirm={true}
        onClick={() => done()}
      />
    )
    // first click
    fireEvent.click(getByTestId('eventName'))
    expect(getByText(/click to confirm/i)).toBeInTheDocument
    // click to confirm
    fireEvent.click(getByTestId('eventName-to-confirm'))
    done()
  })
})
