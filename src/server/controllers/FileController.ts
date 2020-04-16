import * as express from 'express'
import { Request } from 'express'
import { Response } from 'express'
import { NextFunction } from 'express'
import * as multer from 'multer'
import * as path from 'path'
import * as fs from 'fs'
import middleware from '../middlewares/FileMiddleware'
import dir from '../../utils/Directory'

const router = express.Router()

// set middleware
router.use('/', (req: Request, res: Response, next: NextFunction) => {
  middleware(req, res, next)
})

router.post('/', (req: Request, res: Response) => {
  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      const destination: string = path.join(process.env.HOME, req.query.path || req.body.path)
      req.body.destination = destination
      callback(null, destination)
    },
    filename: function (req, file, callback) {
      if (fs.existsSync(path.join(req.body.destination, file.originalname))) {
        file.originalname = `${Date.now()}-${file.originalname}`
      }
      req.body.path = path.join(req.body.destination, file.originalname)
      callback(null, file.originalname)
    },
  })

  var upload = multer({ storage: storage }).single('file')
  upload(req, res, async function (err) {
    if (err) {
      return res.end('Error uploading file.')
    }

    res.send(await dir.fileProps(req.body.path))
  })
})

router.delete('/', (req: Request, res: Response) => {
  const body: { path: string } = req.body
  try {
    dir.deleteFile(body.path)
    res.send()
  } catch (error) {
    res.status(500).send({ code: error.code })
  }
})

module.exports = router
