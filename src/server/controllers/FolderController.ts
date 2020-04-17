import * as express from 'express'
import * as path from 'path'
import { Request } from 'express'
import { Response } from 'express'
import { NextFunction } from 'express'
import * as os from 'os'
import middleware from '../middlewares/FolderMiddleware'
import dir from '../../utils/Directory'
import FileModel from '../../models/FileModel'

const router = express.Router()

// set middleware
router.use('/', (req: Request, res: Response, next: NextFunction) => {
  middleware(req, res, next)
})

// methods
router.get('/', async (req: Request, res: Response) => {
  //@ts-ignore
  const query: { path: string } = req.query

  res.send({
    path: query.path.replace(process.env.HOME, ''),
    folders: dir.readFolders(query.path),
    files: await dir.readFiles(query.path),
  })
})

router.get('/download', async (req: Request, res: Response) => {
  //@ts-ignore
  const query: { path: string } = req.query

  try {
    res.download(
      await dir.zip(query.path, path.join(os.tmpdir(), 'shark', query.path.split('/').pop()))
    )
  } catch (error) {
    res.status(500).send({ code: error.code })
  }
})

router.post('/', (req: Request, res: Response) => {
  const body: { path: string } = req.body

  try {
    const created: FileModel = {
      url: dir.createFolder(body.path).replace(process.env.HOME, ''),
    }
    res.send(created)
  } catch (error) {
    res.status(500).send({ code: error.code })
  }
})

router.put('/', (req: Request, res: Response) => {
  const body: { path: string; name: string } = req.body
  try {
    const created: FileModel = {
      url: dir.rename(body.path, body.name),
    }
    res.send(created)
  } catch (error) {
    res.status(500).send({ code: error.code })
  }
})

router.delete('/', (req: Request, res: Response) => {
  const body: { path: string } = req.body
  try {
    dir.deleteFolder(body.path)
    res.send()
  } catch (error) {
    res.status(500).send({ code: error.code })
  }
})

module.exports = router
