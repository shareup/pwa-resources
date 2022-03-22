import { promises as fs } from 'fs'
import * as path from 'path'
import type { Options, Plugin } from 'wmr'

export default (options: Options) => {
  options.host = '0.0.0.0'
  options.port = parseInt(process.env.PORT || '8080', 10)

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

  options.plugins = [cacheUrlsPlugin()]

  return options
}

function cacheUrlsPlugin(): Plugin {
  let count = 0

  return {
    enforce: 'post',
    name: 'cache-urls-plugin',
    writeBundle: async function(options, bundle) {
      const urls: string[] = []

      for (const [filename, output] of Object.entries(bundle)) {
        // NOTE: don't cache the service worker itself and don't worry about index.html
        if (output.fileName.startsWith('service-worker.') || output.fileName === 'index.html') {
          continue
        }

        urls.push(`/${output.fileName}`)
      }

      // NOTE: we cannot use this.emitFile because cache-urls.json is already in the bundle

      const pathInDist = path.join(options.dir, 'cache-urls.json')
      await fs.writeFile(pathInDist, JSON.stringify(urls))
      console.debug(`wrote ${pathInDist}`)
    }
  }
}
