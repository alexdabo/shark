import { Request } from 'express'
import { Response, NextFunction } from 'express'
import * as fs from 'fs'
import * as path from 'path'
import dir from '../../utils/Directory'

export default function FileMiddleware(req: Request, res: Response, next: NextFunction) {
  const bodyPath: string = req.body.path

  switch (req.method) {
    case 'DELETE':
      if (bodyPath) {
        const directory = decodeURI(
          dir.format(
            path.join(process.env.HOME, bodyPath.replace(`${process.env.DOMAIN}/public`, ''))
          )
        )
        if (fs.existsSync(directory)) {
          req.body.path = dir.format(directory)
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
