import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { cleanup } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Navigation from './Navigation'

describe('<Navigation/>', () => {
  afterEach(cleanup)

  it('Should render correctly', (done) => {
    const { getByText } = render(<Navigation view="grid" directory="/test" hostname="" search="" />)
    expect(getByText(/test/i)).toBeInTheDocument()
    done()
  })

  it('Should return search string', (done) => {
    const { getByTestId } = render(
      <Navigation
        directory=""
        hostname=""
        search=""
        view="grid"
        onSearch={(value) => {
          expect(value).toBe('my folder')
          done()
        }}
      />
    )

    fireEvent.input(getByTestId('search'), { target: { value: 'my folder' } })
  })

  it('Should clean search string', (done) => {
    const { getByTestId } = render(
      <Navigation
        directory=""
        hostname=""
        search="my folder"
        view="grid"
        onSearch={(value) => {
          expect(value).toBe('')
          done()
        }}
      />
    )

    fireEvent.click(getByTestId('clear-search'))
  })

  it('Should go back one folder', (done) => {
    const { getByTestId } = render(
      <Navigation
        directory="/folder1/folder2/folder3"
        hostname=""
        search=""
        view="grid"
        onChangeDirectory={(value) => {
          expect(value).toBe('/folder1/folder2')
          done()
        }}
        onSearch={() => {}}
      />
    )

    fireEvent.click(getByTestId('dir-folder2'))
    done()
  })
})
