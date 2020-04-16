import { FileModel } from '../models'

export const folders: string[] = ['/test/test1', '/test/test2', '/test/test3']

export const files: FileModel[] = [
  {
    url: 'http://localhost:8000/public/test/book.pdf',
    icon: 'http://localhost:8000/public/fileicon/pdf.svg',
    name: 'book.pdf',
    mine: 'application/pdf',
    ext: '.pdf',
    size: 10000,
    accessedAt: '2020-04-07T16:52:15.295Z',
    modifiedAt: '2020-04-07T16:52:38.135Z',
  },
  {
    url: 'http://localhost:8000/public/test/movie.mp4',
    icon: 'http://localhost:8000/public/fileicon/video.svg',
    name: 'movie.mp4',
    mine: 'video/mp4',
    ext: '.pm4',
    size: 10000,
    accessedAt: '2020-04-07T16:52:15.785Z',
    modifiedAt: '2020-04-07T16:53:58.746Z',
  },
  {
    url: 'http://localhost:8000/public/test/data.json',
    icon: 'http://localhost:8000/public/fileicon/file.svg',
    name: 'data.json',
    mine: 'application/json',
    ext: '.json',
    size: 1000,
    accessedAt: '2020-04-07T16:52:15.385Z',
    modifiedAt: '2020-04-07T16:54:15.546Z',
  },
  {
    url: 'http://localhost:8000/public/test/picture.jpg',
    icon: 'http://localhost:8000/public/fileicon/image.svg',
    name: 'picture.jpg',
    mine: 'image/jpeg',
    ext: '.jpg',
    size: 10000,
    accessedAt: '2020-04-07T16:52:15.315Z',
    modifiedAt: '2020-04-07T16:53:48.056Z',
  },
  {
    url: 'http://localhost:8000/public/test/ms-document.docx',
    icon: 'http://localhost:8000/public/fileicon/ms_word.svg',
    name: 'ms-document.docx',
    mine: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ext: '.docx',
    size: 10000,
    accessedAt: '2020-04-07T16:52:15.385Z',
    modifiedAt: '2020-04-07T16:54:15.546Z',
  },
]
