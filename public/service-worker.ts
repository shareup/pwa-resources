/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope
export {}

const cacheName = 'pwaResourcesV2' + (import.meta.env.NODE_ENV || 'dev')
const fallbackHtmlUrl = '/index.html'

self.addEventListener('error', e => {
  console.error('caught unhandled error in service worker', e, e.error, e.filename, e.lineno)
})

self.addEventListener('install', e => {
  e.waitUntil(async () => {
    await self.skipWaiting()

    const cache = await caches.open(cacheName)
    cache.add(fallbackHtmlUrl)
  })
})

self.addEventListener('activate', e => {
  e.waitUntil(async () => {
    // @ts-ignore
    if (self.registration.navigationPreload) {
      // @ts-ignore
      await self.registration.navigationPreload.enable()
    }

    await self.clients.claim()
  })
})

self.addEventListener('fetch', (e: FetchEvent) => {
  e.respondWith((async () => {
    console.debug('fetch request', e.request)

    try {
      if (e.request.method !== 'GET') {
        return fetch(e.request)
      }

      if (e.request.destination === 'document') {
        // NOTE: we always fetch documents in the background to either cache
        // initially or update an existing cache asynchronously
        const networkResponse = (async () => {
          const response = await fetch(e.request)

          if (response.ok) {
            console.debug({ url: e.request.url, putInCache: true, isDocument: true })
            const cache = await caches.open(cacheName)
            cache.put(e.request, response.clone())
          }

          return response
        })()

        const cachedResponse = await caches.match(e.request)

        if (cachedResponse) {
          console.debug({ url: e.request.url, fromCache: true, isDocument: true })
          return cachedResponse
        } else {
          console.debug({ url: e.request.url, fromNetwork: true, isDocument: true })
          return networkResponse
        }
      } else {
        // NOTE: assets are fine to return from cache every time
        const cachedResponse = await caches.match(e.request)
        if (cachedResponse) {
          console.debug({ url: e.request.url, fromCache: true })
          return cachedResponse
        }

        // @ts-ignore
        const preloadResponse = await e.preloadResponse
        if (preloadResponse) {
          console.debug({ url: e.request.url, preloaded: true })
          return preloadResponse
        }

        const response = await fetch(e.request)

        if (response.ok) {
          console.debug({ url: e.request.url, putInCache: true })
          const cache = await caches.open(cacheName)
          cache.put(e.request, response.clone())
        }

        return response
      }
    } catch (err) {
      console.error('error handling fetch', err)
      console.error(err.stack)

      if (e.request.destination === 'document') {
        return caches.match(fallbackHtmlUrl, { cacheName })
      }

      return textResponse('error', 500)
    }
  })())
})

self.addEventListener('message', e => {
  e.waitUntil(async () => {
    console.debug('message', e.data)
  })
})

function textResponse(text: string, status = 200): Response {
  return new Response(text, {
    status,
    headers: {
      'content-type': 'text/plain'
    }
  })
}