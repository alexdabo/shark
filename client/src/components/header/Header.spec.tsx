import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { cleanup } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Header from './Header'

describe('<Header/>', () => {
  afterEach(cleanup)

  it('Should render correctly', (done) => {
    const { getByText } = render(
      <Header directory="/test" hostname="" search="" onChange={() => {}} onSearch={() => {}} />
    )
    expect(getByText(/test/i)).toBeInTheDocument()
    done()
  })

  it('Should return search string', (done) => {
    const { getByPlaceholderText } = render(
      <Header
        directory=""
        hostname=""
        search=""
        onChange={() => {}}
        onSearch={(value) => {
          expect(value).toBe('my folder')
          done()
        }}
      />
    )

    fireEvent.input(getByPlaceholderText('Search...'), { target: { value: 'my folder' } })
    done()
  })

  it('Should clean search string', (done) => {
    const { getByTestId } = render(
      <Header
        directory=""
        hostname=""
        search="my folder"
        onChange={() => {}}
        onSearch={(value) => {
          expect(value).toBe('')
          done()
        }}
      />
    )

    fireEvent.click(getByTestId('clear-search'))
    done()
  })

  it('Should go back one folder', (done) => {
    const { getByTestId } = render(
      <Header
        directory="/folder1/folder2/folder3"
        hostname=""
        search=""
        onChange={(value) => {
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
