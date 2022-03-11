import {
  ErrorBoundary,
  hydrate,
  lazy,
  LocationProvider,
  prerender as ssr,
  Route,
  Router
} from 'preact-iso'

const Index = lazy(async () => (await import('./pages/index')).Index)
const Collection = lazy(async () => (await import('./pages/collection')).Collection)
const NotFound = lazy(async () => (await import('./pages/not-found')).NotFound)

const App = () => (
  <LocationProvider>
    <ErrorBoundary>
      <Router>
        <Route path='/' component={Index} />
        <Route path='/collections/:slug' component={Collection} />
        <Route default component={NotFound} />
      </Router>
    </ErrorBoundary>
  </LocationProvider>
)

hydrate(<App />)

export function prerender() {
  return ssr(<App />)
}
