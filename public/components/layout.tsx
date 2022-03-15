import type { FunctionalComponent, VNode } from 'preact'
import styles from './layout.module.css'

type Props = {
  title?: VNode | string
}

const defaultTitle = (
  <>
    <abbr title='Progressive Web App'>PWA</abbr> Resources
  </>
)

export const Layout: FunctionalComponent<Props> = ({ children, title = defaultTitle }) => (
  <div class={styles.wrapper}>
    <header>
      <h1>{title}</h1>
      <p>A curated collection.</p>
    </header>
    <main>
      {children}
    </main>
    <footer>
      <p>
      Currated and maintained with ♥ by the folks at <a href='https://shareup.app'>Shareup</a>.
      </p>
      <p>
        <a href='https://shareup.app/jobs/senior-web-engineer/'>We are hiring!</a> {' '}
        Come build great things with us
      </p>
    </footer>
  </div>
)
