import type { FunctionalComponent } from 'preact'
import { useCallback } from 'preact/hooks'
import thumbsUrl from 'url:../images/thumbs.png'
import styles from './header.module.css'

export const Header: FunctionalComponent = () => {
  const click = useCallback((e: MouseEvent) => {
    // e.preventDefault()
    // // NOTE: we stop prop so the router doesn't grab it and pushState
    // e.stopPropagation()
    // console.debug('clicked favs link')
  }, [])

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
          <a href='/categories/favs' class={['button', styles.button].join(' ')} onClick={click}>
            View your <abbr title='favorites'>♥‘s</abbr>
          </a>
        </p>
        <figure class={styles.figure}>
          <img src={thumbsUrl} width='462' height='360' />
        </figure>
      </aside>
    </header>
  )
}
