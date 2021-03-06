import { Request } from 'express'
import { Response, NextFunction } from 'express'
import * as fs from 'fs'
import * as path from 'path'
import dir from '../../utils/Directory'

export default function DirectoryMiddleware(req: Request, res: Response, next: NextFunction) {
  //@ts-ignore
  const queryPath: string = req.query.path
  const bodyPath: string = req.body.path
  const bodyName: string = req.body.name

  switch (req.method) {
    case 'GET':
      if (queryPath) {
        if (fs.existsSync(path.join(process.env.HOMEDIR, queryPath))) {
          req.query.path = dir.format(path.join(process.env.HOMEDIR, queryPath))
        } else {
          return res.status(422).json({ code: 'BAD_PATH' })
        }
      } else {
        return res.status(422).json({ code: 'BAD_QUERY' })
      }
      break
    case 'POST':
      if (bodyPath) {
        req.body.path = path.join(process.env.HOMEDIR, bodyPath)
        if (fs.existsSync(path.join(process.env.HOMEDIR, bodyPath, '../'))) {
          req.body.path = dir.format(path.join(process.env.HOMEDIR, bodyPath))
        } else {
          return res.status(422).json({ code: 'BAD_PATH' })
        }
      } else {
        return res.status(422).json({ code: 'BAD_BODY' })
      }
      break
    case 'PUT':
      if (bodyPath && bodyName) {
        if (fs.existsSync(path.join(process.env.HOMEDIR, bodyPath))) {
          req.body.path = dir.format(path.join(process.env.HOMEDIR, bodyPath))
          req.body.name = bodyName
        } else {
          return res.status(422).json({ code: 'BAD_PATH' })
        }
      } else {
        return res.status(422).json({ code: 'BAD_BODY' })
      }
      break
    case 'DELETE':
      const directory = queryPath || bodyPath
      if (directory) {
        if (fs.existsSync(path.join(process.env.HOMEDIR, directory))) {
          req.body.path = dir.format(path.join(process.env.HOMEDIR, directory))
        } else {
          return res.status(422).json({ code: 'BAD_PATH' })
        }
      } else {
        return res.status(422).json({ code: 'BAD_BODY' })
      }
      break
  }

  next()
}
