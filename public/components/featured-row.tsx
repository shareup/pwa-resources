import type { FunctionalComponent } from 'preact'
import styles from './featured-row.module.css'
import { TripleHeading } from './triple-heading'

type Props = {
  image: {
    url: string
    width: number
    height: number
  }
  heading: string
  desc: string
  backgroundColor: string
  button: {
    isDark?: boolean
    color: string
    href: string
    title: string
  }
}

export const FeaturedRow: FunctionalComponent<Props> = (
  { image, backgroundColor, button, heading, desc }
) => {
  return (
    <section
      class={styles.row}
      style={{ '--background-color': backgroundColor, '--link-color': 'var(--brand-black)' }}
    >
      <div class={styles.featuredRowContent}>
        <TripleHeading title={heading} />
        <p class={styles.desc}>{desc}</p>
        <p>
          <a
            class='button'
            style={{
              '--button-color': button.color,
              color: button.isDark ? 'var(--brand-white)' : null
            }}
            href={button.href}
            title={button.title}
          >
            View Category
          </a>
        </p>
      </div>
      <figure class={styles.figure} aria-hidden='true'>
        <img
          src={image.url}
          width={image.width}
          height={image.height}
          alt=''
        />
      </figure>
    </section>
  )
}
