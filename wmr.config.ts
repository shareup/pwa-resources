import { promises as fs } from 'fs'
import * as path from 'path'

export default options => {
  options.host = '0.0.0.0'
  options.port = parseInt(process.env.PORT || '8080', 10)

  options.middleware.push(async (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
      return next()
    }

    const reqPath = req.path.replace(/^\//, '')

    if (reqPath.startsWith('service-worker.') && reqPath.endsWith('.js')) {
      const realPath = path.join(options.out, 'chunks', reqPath)

      const bytes = await fs.readFile(realPath)

      res.writeHead(200, {
        'Content-Type': 'application/javascript'
      })
      res.end(bytes)
    } else {
      next()
    }
  })

  return options
}
