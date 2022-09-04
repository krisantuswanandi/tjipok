import { pusher } from '../../server/utils/pusher'
import type { NextApiHandler} from 'next'

const handler: NextApiHandler = (_req, res) => {
  pusher.trigger('my-channel', 'my-event', { message: 'hello world!!!' })
  
  res.status(200).json({
    message: 'OK'
  })
}

export default handler
