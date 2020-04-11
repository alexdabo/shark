import React from 'react'
import { render } from '@testing-library/react'
import { cleanup } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Alert from './Alert'

describe('<Alert/>', () => {
  afterEach(cleanup)

  it('It should correctly display the alert message', (done) => {
    const { getByText } = render(<Alert options={{ show: true, message: 'alert' }} />)
    const alert = getByText(/alert/i)
    expect(alert).toBeInTheDocument()
    done()
  })

  it('should be success', (done) => {
    const { getByRole } = render(<Alert options={{ show: true, message: 'alert' }} />)
    expect(getByRole('alert')).toHaveClass('MuiAlert-filledSuccess')
    done()
  })

  it('should be warning', (done) => {
    const { getByRole } = render(
      <Alert options={{ show: true, message: 'alert', type: 'warning' }} />
    )
    expect(getByRole('alert')).toHaveClass('MuiAlert-filledWarning')
    done()
  })

  it('should be persistent', (done) => {
    const { getByRole } = render(
      <Alert options={{ show: true, message: 'alert', type: 'warning', persistent: true }} />
    )
    expect(getByRole('alert').childNodes.length).toBe(2)
    done()
  })

  it('should has progressbar', (done) => {
    const { getByRole } = render(
      <Alert options={{ show: true, message: 'alert', type: 'warning', loading: true }} />
    )
    expect(getByRole('progressbar')).toBeInTheDocument()
    done()
  })

  it('Should close the alert', (done) => {
    const { getByTitle } = render(
      <Alert options={{ show: true, message: 'alert' }} onClose={() => done()} />
    )
    fireEvent.click(getByTitle('Close'))
  })
})
