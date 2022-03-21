import type { FunctionalComponent, VNode } from 'preact'
import ensembleURL from 'url:../images/svg/ensemble.svg'
import styles from './layout.module.css'

type Props = {
  title?: VNode | string
}

const defaultTitle = (
  <>
    <abbr title='Progressive Web App'>PWA</abbr> Resources
  </>
)

export const Layout: FunctionalComponent<Props> = ({ children }) => (
  <div class={styles.wrapper}>
    {children}
    <footer class={styles.footer}>
      <div class={styles.textWrapper}>
        <p class={styles.footerText}>
          Currated and maintained with <span class={styles.heart}>♥</span> by the folks at{' '}
          <a href='https://shareup.app'>Shareup</a>
        </p>
        <p class={styles.footerText}>
          <a href='https://shareup.app/jobs/senior-web-engineer/'>We are hiring!</a>{' '}
          Come build great things with us
        </p>
      </div>
      <figure class={styles.footerImg} aria-hidden>
        <img src={ensembleURL} height='400' alt='' />
      </figure>
    </footer>
  </div>
)
