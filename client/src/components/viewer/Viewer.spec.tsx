import React from 'react'
import { render } from '@testing-library/react'
import { cleanup } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Viewer from './Viewer'
import { folders } from '../../test'
import { files } from '../../test'

describe('<Viewer/>', () => {
  afterEach(cleanup)

  it('Should render correctly folder is empty', (done) => {
    const { getByTestId } = render(<Viewer view="list" folders={[]} files={[]} search=""></Viewer>)
    expect(getByTestId('folderIsEmpty')).toBeInTheDocument
    done()
  })

  it('Should render correctly in table view', (done) => {
    const { getByTestId } = render(
      <Viewer view="list" folders={folders} files={[]} search=""></Viewer>
    )
    const tableBody = getByTestId('table-body')
    expect(tableBody).toBeInTheDocument
    expect(tableBody.children.length).toBe(3)
    done()
  })

  it('Should render correctly in grid view', (done) => {
    const { getByTestId } = render(
      <Viewer view="grid" folders={folders} files={[]} search=""></Viewer>
    )
    const grid = getByTestId('grid')
    expect(grid).toBeInTheDocument
    // Should be 4 because there is a separator between folders and files
    expect(grid.children.length).toBe(4)
    done()
  })
})

describe('<Viewer view="list"/>', () => {
  afterEach(cleanup)

  it('Should have folders and files', (done) => {
    const { getByTestId } = render(
      <Viewer view="list" folders={folders} files={files} search=""></Viewer>
    )
    const tableBody = getByTestId('table-body')
    expect(tableBody).toBeInTheDocument
    // 3 folders and 5 files
    expect(tableBody.children.length).toBe(8)
    done()
  })

  it('Should search one file', (done) => {
    const search: string = 'book'
    const { getByTestId } = render(
      <Viewer view="list" folders={folders} files={files} search={search}></Viewer>
    )
    const grid = getByTestId('table-body')
    expect(grid).toBeInTheDocument
    expect(grid.children.length).toBe(1)
    done()
  })

  it('Should search three folder', (done) => {
    const search: string = 'test'
    const { getByTestId } = render(
      <Viewer view="list" folders={folders} files={files} search={search}></Viewer>
    )
    const grid = getByTestId('table-body')
    expect(grid).toBeInTheDocument
    expect(grid.children.length).toBe(3)
    done()
  })

  it('Should select one file', (done) => {
    const { getByTestId } = render(
      <Viewer
        view="list"
        folders={folders}
        files={files}
        search=""
        onSelectedFile={(file) => {
          expect(file).toBe(files[3])
          done()
        }}
      ></Viewer>
    )
    const pictureFile = getByTestId('file-picture.jpg')
    expect(pictureFile).toBeInTheDocument
    fireEvent.click(pictureFile)
  })

  it('Should select one folder', (done) => {
    const { getByTestId } = render(
      <Viewer
        view="list"
        folders={folders}
        files={files}
        search=""
        onSelectedFolder={(folder) => {
          expect(folder).toBe(folders[0])
          done()
        }}
      ></Viewer>
    )
    const folder = getByTestId('folder-test1')
    expect(folder).toBeInTheDocument
    fireEvent.click(folder)
  })
})

describe('<Viewer view="grid"/>', () => {
  afterEach(cleanup)

  it('Should have folders and files', (done) => {
    const { getByTestId } = render(
      <Viewer view="grid" folders={folders} files={files} search=""></Viewer>
    )
    const grid = getByTestId('grid')
    expect(grid).toBeInTheDocument
    expect(grid.children.length).toBe(9)
    done()
  })

  it('Should search one file', (done) => {
    const search: string = 'book'
    const { getByTestId } = render(
      <Viewer view="grid" folders={folders} files={files} search={search}></Viewer>
    )
    const grid = getByTestId('grid')
    expect(grid).toBeInTheDocument
    expect(grid.children.length).toBe(2)
    done()
  })

  it('Should search three folder', (done) => {
    const search: string = 'test'
    const { getByTestId } = render(
      <Viewer view="grid" folders={folders} files={files} search={search}></Viewer>
    )
    const grid = getByTestId('grid')
    expect(grid).toBeInTheDocument
    expect(grid.children.length).toBe(4)
    done()
  })

  it('Should select one file', (done) => {
    const { getByTestId } = render(
      <Viewer
        view="grid"
        folders={folders}
        files={files}
        search=""
        onSelectedFile={(file) => {
          expect(file).toBe(files[3])
          done()
        }}
      ></Viewer>
    )
    const pictureFile = getByTestId('file-picture.jpg')
    expect(pictureFile).toBeInTheDocument
    fireEvent.click(pictureFile)
  })

  it('Should select one folder', (done) => {
    const { getByTestId } = render(
      <Viewer
        view="grid"
        folders={folders}
        files={files}
        search=""
        onSelectedFolder={(folder) => {
          expect(folder).toBe(folders[0])
          done()
        }}
      ></Viewer>
    )
    const folder = getByTestId('folder-test1')
    expect(folder).toBeInTheDocument
    fireEvent.click(folder)
  })

  it('Should download one folder', (done) => {
    const { getByTestId } = render(
      <Viewer
        view="grid"
        folders={folders}
        files={files}
        search=""
        onDownloadFolder={(folder) => {
          expect(folder).toBe(folders[0])
          done()
        }}
      ></Viewer>
    )
    const moreBtn = getByTestId('more-folder-test1')
    expect(moreBtn).toBeInTheDocument
    fireEvent.click(moreBtn)

    const DownloadOption = getByTestId('download')
    expect(DownloadOption).toBeInTheDocument
    fireEvent.click(DownloadOption)
  })

  it('Should download one file', (done) => {
    const { getByTestId } = render(
      <Viewer
        view="grid"
        folders={folders}
        files={files}
        search=""
        onDownloadFile={(file) => {
          expect(file).toBe(files[3].url)
          done()
        }}
      ></Viewer>
    )
    const moreBtn = getByTestId('more-file-picture.jpg')
    expect(moreBtn).toBeInTheDocument
    fireEvent.click(moreBtn)

    const downloadOption = getByTestId('download')
    expect(downloadOption).toBeInTheDocument
    fireEvent.click(downloadOption)
  })

  it('Should delete one file', (done) => {
    const { getByTestId } = render(
      <Viewer
        view="grid"
        folders={folders}
        files={files}
        search=""
        onDeleteFile={(file) => {
          expect(file).toBe(files[3])
          done()
        }}
      ></Viewer>
    )
    const moreBtn = getByTestId('more-file-picture.jpg')
    expect(moreBtn).toBeInTheDocument
    fireEvent.click(moreBtn)

    const deleteOption = getByTestId('delete')
    expect(deleteOption).toBeInTheDocument
    fireEvent.click(deleteOption)

    const deleteConfirm = getByTestId('delete-to-confirm')
    expect(deleteConfirm).toBeInTheDocument
    fireEvent.click(deleteConfirm)
  })
})
