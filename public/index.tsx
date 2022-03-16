import swUrl from 'bundle:./service-worker'
import type { FunctionalComponent } from 'preact'
import {
  ErrorBoundary,
  hydrate,
  lazy,
  LocationProvider,
  prerender as ssr,
  Route,
  Router
} from 'preact-iso'
import { DBContext } from './db-context'
import { PrerenderContext } from './prerender-context'

if ('navigator' in self && 'serviceWorker' in navigator) {
  const betterUrl = swUrl.replace(/chunks\//, '')

  navigator.serviceWorker.register(betterUrl, { scope: '/', type: 'module' })
    .then(reg => {
      return reg.update()
    })
    .catch(e => {
      console.error('error registering or updating the service worker', e)
    })
}

import { Category } from './components/category'
import { Index } from './components/index'
import { NotFound } from './components/not-found'

const App: FunctionalComponent = () => (
  <DBContext>
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path='/' component={Index} />
          <Route path='/categories/:slug' component={Category} />
          <Route path='/categories/all' component={Category} />
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  </DBContext>
)

hydrate(<App />)

export function prerender() {
  return ssr(
    <PrerenderContext>
      <App />
    </PrerenderContext>
  )
}
