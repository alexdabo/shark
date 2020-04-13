import React from 'react'
import { render } from '@testing-library/react'
import { cleanup } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import Viewer from './Viewer'
import FileModel from '../../models/FileModel'

describe('<Viewer/>', () => {
  afterEach(cleanup)

  it('Should render correctly in table view', (done) => {
    const { getByTestId } = render(<Viewer view="list" folders={[]} files={[]} search=""></Viewer>)
    const tableBody = getByTestId('table-body')
    expect(tableBody).toBeInTheDocument
    expect(tableBody.children.length).toBe(0)
    done()
  })

  it('Should render correctly in grid view', (done) => {
    const { getByTestId } = render(<Viewer view="grid" folders={[]} files={[]} search=""></Viewer>)
    const grid = getByTestId('grid')
    expect(grid).toBeInTheDocument
    // Should be 1 because there is a separator between folders and files
    expect(grid.children.length).toBe(1)
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
    expect(tableBody.children.length).toBe(9)
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
          expect(file).toBe(files[5])
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
    expect(grid.children.length).toBe(10)
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
          expect(file).toBe(files[5])
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
          expect(file).toBe(files[5].url)
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
          expect(file).toBe(files[5].url)
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

const folders: string[] = ['/test/test1', '/test/test2', '/test/test3']
const files: FileModel[] = [
  {
    url: 'http://localhost:8000/public/test/book.pdf',
    icon: 'http://localhost:8000/public/fileicon/pdf.svg',
    name: 'book.pdf',
    mine: 'application/pdf',
    ext: '.pdf',
    size: 107613,
    accessedAt: '2020-04-07T16:52:15.295Z',
    modifiedAt: '2020-04-07T16:52:38.135Z',
  },
  {
    url: 'http://localhost:8000/public/test/movie.mkv',
    icon: 'http://localhost:8000/public/fileicon/video.svg',
    name: 'movie.mkv',
    mine: 'video/x-matroska',
    ext: '.mkv',
    size: 170245006,
    accessedAt: '2020-04-07T16:52:15.785Z',
    modifiedAt: '2020-04-07T16:53:58.746Z',
  },
  {
    url: 'http://localhost:8000/public/test/ms-document.docx',
    icon: 'http://localhost:8000/public/fileicon/ms_word.svg',
    name: 'ms-document.docx',
    mine: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ext: '.docx',
    size: 76536,
    accessedAt: '2020-04-07T16:52:15.385Z',
    modifiedAt: '2020-04-07T16:54:15.546Z',
  },
  {
    url: 'http://localhost:8000/public/test/ms-presentation.pptx',
    icon: 'http://localhost:8000/public/fileicon/ms_powerpoint.svg',
    name: 'ms-presentation.pptx',
    mine: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ext: '.pptx',
    size: 1800680,
    accessedAt: '2020-04-07T16:52:15.315Z',
    modifiedAt: '2020-04-07T16:53:41.026Z',
  },
  {
    url: 'http://localhost:8000/public/test/ms-sheet.xlsx',
    icon: 'http://localhost:8000/public/fileicon/ms_excel.svg',
    name: 'ms-sheet.xlsx',
    mine: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ext: '.xlsx',
    size: 36819,
    accessedAt: '2020-04-07T16:52:15.415Z',
    modifiedAt: '2020-04-07T16:53:17.846Z',
  },
  {
    url: 'http://localhost:8000/public/test/picture.jpg',
    icon: 'http://localhost:8000/public/fileicon/image.svg',
    name: 'picture.jpg',
    mine: 'image/jpeg',
    ext: '.jpg',
    size: 131072,
    accessedAt: '2020-04-07T16:52:15.315Z',
    modifiedAt: '2020-04-07T16:53:48.056Z',
  },
]
