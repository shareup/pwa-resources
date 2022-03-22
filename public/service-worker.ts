/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope

const cacheName = 'pwaResourcesV9' + (import.meta.env.NODE_ENV || '---')

self.addEventListener('error', e => {
  console.error('caught unhandled error in service worker', e, e.error, e.filename, e.lineno)
})

self.addEventListener('install', e => {
  self.skipWaiting()
  ;(async () => {
    const cache = await caches.open(cacheName)
    await cache.add('/')

    const urlsRequest = fetch('/cache-urls.json')
    const urlsResponse = await urlsRequest

    if (urlsResponse.ok) {
      const urls = await urlsResponse.json() as string[]
      await cache.addAll(urls)
    }
  })()
})

self.addEventListener('activate', e => {
  self.clients.claim()
})

self.addEventListener('fetch', (e: FetchEvent) => {
  if (e.request.method !== 'GET') {
    return
  }

  e.respondWith((async () => {
    try {
      if (import.meta.env.NODE_ENV === 'development') {
        return await getFromNetworkAndCache(e)
      }

      if (isHtmlRequest(e.request)) {
        // NOTE: we always fetch documents in the background to either cache
        // initially or update an existing cache asynchronously
        const networkResponse = getFromNetworkAndCache(e)
        const cachedResponse = await getFromCache(e.request)

        if (cachedResponse) {
          // NOTE: update the cache async when the network request resolves
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
        //       assuming they are hashed or have a versioned url 🤞
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
  const response = await fetch(e.request)

  if (response.ok) {
    const cache = await caches.open(cacheName)
    cache.put(e.request, response.clone())
  }

  return response
}

function getFromCache(request: Request): Promise<Response | undefined> {
  return caches.match(request, { cacheName })
}
