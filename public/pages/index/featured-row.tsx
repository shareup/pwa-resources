import type { FunctionalComponent } from 'preact'
import styles from './featured-row.module.css'

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
      style={{ '--background-color': backgroundColor }}
    >
      <div>
        <h2 class={styles.heading}>{heading}</h2>
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
      <figure class={styles.figure}>
        <img src={image.url} width={image.width} height={image.height} alt='' />
      </figure>
    </section>
  )
}
