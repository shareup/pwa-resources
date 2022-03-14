/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope

const cacheName = 'pwaResourcesV8' + (import.meta.env.NODE_ENV || '---')

self.addEventListener('error', e => {
  console.error('caught unhandled error in service worker', e, e.error, e.filename, e.lineno)
})

self.addEventListener('install', e => {
  self.skipWaiting()

  e.waitUntil(async () => {
    const cache = await caches.open(cacheName)
    cache.add('/')
    // TODO: how do we know what filenames to cache here?
  })
})

self.addEventListener('activate', e => {
  self.clients.claim()

  if ('navigationPreload' in self.registration) {
    // @ts-ignore
    self.registration.navigationPreload.enable()
  }
})

self.addEventListener('fetch', (e: FetchEvent) => {
  if (e.request.method !== 'GET') {
    return
  }

  e.respondWith((async () => {
    try {
      if (import.meta.env.NODE_ENV === 'development') {
        const url = new URL(e.request.url)
        const fromCache = !!url.searchParams.get('fromcache')

        if (fromCache) {
          const networkResponse = getFromNetworkAndCache(e)
          const cachedResponse = await getFromCache(e.request)
          return cachedResponse || await networkResponse
        } else {
          return await getFromNetworkAndCache(e)
        }
      }

      if (isHtmlRequest(e.request)) {
        // NOTE: we always fetch documents in the background to either cache
        // initially or update an existing cache asynchronously
        const networkResponse = getFromNetworkAndCache(e)
        const cachedResponse = await getFromCache(e.request)

        if (cachedResponse) {
          networkResponse
            .catch(err => {
              if (import.meta.env.NODE_ENV === 'development') {
                console.error('could not fetch and cache a newer version of', e.request.url, err)
              }
            })

          return cachedResponse
        } else {
          return await networkResponse
        }
      } else {
        // NOTE: assets are fine to return from cache every time
        const cachedResponse = await getFromCache(e.request)
        if (cachedResponse) { return cachedResponse }
        return await getFromNetworkAndCache(e)
      }
    } catch (err) {
      console.error('error handling fetch', err)
      console.error(err.stack)

      if (isHtmlRequest(e.request)) {
        // NOTE: fallback to serving the index as our offline page… it should
        // do client-side routing and work fine…
        return caches.match('/', { cacheName })
      }

      return new Response('error', {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-store'
        }
      })
    }
  })())
})

function isHtmlRequest(request: Request): boolean {
  return request.mode === 'navigate'
    || request.destination === 'document'
    || request.headers.get('Accept').includes('text/html')
}

async function getFromNetworkAndCache(e: FetchEvent): Promise<Response> {
  // @ts-ignore
  let response = await e.preloadResponse

  if (!response) {
    response = await fetch(e.request)
  }

  if (response.ok) {
    const cache = await caches.open(cacheName)
    cache.put(e.request, response.clone())
  }

  return response
}

function getFromCache(request: Request): Promise<Response | undefined> {
  return caches.match(request, { cacheName })
}

self.addEventListener('message', e => {
  e.waitUntil(async () => {
    console.debug('message', e.data)
  })
})
