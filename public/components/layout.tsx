import type { FunctionalComponent, VNode } from 'preact'
import team1Url from 'url:../images/svg/team1.svg'
import team2Url from 'url:../images/svg/team2.svg'
import team3Url from 'url:../images/svg/team3.svg'
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
      <p>
        Currated and maintained with ♥ by the folks at <a href='https://shareup.app'>Shareup</a>
      </p>
      <p>
        <a href='https://shareup.app/jobs/senior-web-engineer/'>We are hiring!</a>{' '}
        Come build great things with us
      </p>
      <figure>
        <img src={team1Url} width='139' height='146' alt='' />
        <img src={team2Url} width='91' height='102' alt='' />
        <img src={team3Url} width='155' height='138' alt='' />
      </figure>
    </footer>
  </div>
)
