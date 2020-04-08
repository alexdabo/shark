import * as express from 'express'
import { Request } from 'express'
import { Response } from 'express'
import * as os from 'os'
import AppInfo from '../../utils/AppInfo'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send({
    hostname: os.hostname(),
    platform: os.platform(),
    release: os.release(),
    username: os.userInfo().username,
    app: AppInfo,
  })
})

module.exports = router
