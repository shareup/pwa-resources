import { promises as fs } from 'fs'
import path from 'path'

export default options => {
  options.middleware.push(async (req, res, next) => {
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
