import type { FunctionalComponent } from 'preact'
import thumbsUrl from 'url:../images/thumbs.png'
import { useDB } from '../db-context'
import { useFetched } from '../hooks/use-fetched'
import styles from './header.module.css'

export const Header: FunctionalComponent = () => {
  const db = useDB()
  const { state: favs, error: favsError, fetch: fetchFavs } = useFetched(undefined, async () => {
    return db && db.getAllKeys('favs')
  }, [db])

  const hasFavs = favs && favs.length

  return (
    <header class={styles.header}>
      <div class={styles.title}>
        <figure aria-hidden class={styles.titleHeadingFigure}>
          <span class={styles.titleHeading}>
            P<span>WA</span>
          </span>
          <span class={styles.titleHeading}>
            P<span>WA</span>
          </span>
        </figure>
        <h1 class={styles.titleHeading}>
          <abbr title='Progressive Web App'>
            P<span>WA</span>
          </abbr>{' '}
          Resources
        </h1>
        <p class={styles.titleSubheading}>A curated collection</p>
      </div>
      <aside class={styles.aside}>
        <p class={styles.asideText}>Progressive Web Apps</p>
        <p class={styles.buttonWrapper}>
          {hasFavs
            ? (
              <a href='/categories/favs' class={['button', styles.button].join(' ')}>
                View your <abbr title='favorites'>♥‘s</abbr>
              </a>
            )
            : null}
        </p>
        <figure class={styles.figure}>
          <img src={thumbsUrl} width='462' height='360' />
        </figure>
      </aside>
    </header>
  )
}
