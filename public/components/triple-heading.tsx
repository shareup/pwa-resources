import type { FunctionalComponent } from 'preact'
import { isPrerenderContext } from '../prerender-context'
import darkStyles from './dark.module.css'
import styles from './triple-heading.module.css'

type Props = {
  title: string
  url?: URL
  id?: string
}

export const TripleHeading: FunctionalComponent<Props> = (
  { title, url, id }
) => {
  const isPrerender = isPrerenderContext()

  return (
    <h2 class={styles.heading} id={id}>
      <Link url={url}>
        <span class={styles.visible}>
          {title}
          {url
            ? (
              <svg
                width='22'
                height='22'
                viewBox='0 0 17 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g>
                  <title />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M6.5 1H15.5C16.0523 1 16.5 1.44772 16.5 2V11C16.5 11.5523 16.0523 12 15.5 12C14.9477 12 14.5 11.5523 14.5 11V4.41421L2.70711 16.2071C2.31658 16.5976 1.68342 16.5976 1.29289 16.2071C0.902369 15.8166 0.902369 15.1834 1.29289 14.7929L13.0858 3H6.5C5.94772 3 5.5 2.55228 5.5 2C5.5 1.44772 5.94772 1 6.5 1Z'
                  />
                </g>
              </svg>
            )
            : null}
        </span>
        {isPrerender
          ? null
          : (
            <figure aria-hidden class={styles.figure}>
              <span class={styles.first}>
                {title}
              </span>
              <span class={styles.second}>
                {title}
              </span>
            </figure>
          )}
      </Link>
    </h2>
  )
}

type LinkProps = {
  url?: URL
}

const Link: FunctionalComponent<LinkProps> = ({ url, children }) => {
  if (!url) {
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <a class={styles.link} href={url.toString()}>
      {children}
    </a>
  )
}
