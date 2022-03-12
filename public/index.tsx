import swUrl from 'bundle:./service-worker'
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

const Index = lazy(async () => (await import('./pages/index')).Index)
const Collection = lazy(async () => (await import('./pages/collection')).Collection)
const NotFound = lazy(async () => (await import('./pages/not-found')).NotFound)

const App = () => (
  <DBContext>
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path='/' component={Index} />
          <Route path='/collections/:slug' component={Collection} />
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  </DBContext>
)

hydrate(<App />)

export function prerender() {
  return ssr(<App />)
}
