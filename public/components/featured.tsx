import type { FunctionalComponent } from 'preact'
import componentsUrl from 'url:../images/svg/components.svg'
import computerUrl from 'url:../images/svg/computer.svg'
import iaUrl from 'url:../images/svg/ia.svg'
import sourceWormUrl from 'url:../images/svg/source-worm.svg'
import darkStyles from './dark.module.css'
import { FeaturedRow } from './featured-row'
import styles from './featured.module.css'
import { TripleHeading } from './triple-heading'

export const Featured: FunctionalComponent = () => {
  return (
    <div class={styles.featuredWrapper}>
      <FeaturedRow
        heading='Installation'
        desc='Learn to make your web app installable 💪'
        image={{ url: componentsUrl, width: 304, height: 269 }}
        backgroundColor='var(--brand-pink)'
        button={{
          color: 'var(--brand-yellow)',
          href: '/categories/installation',
          title: 'View all resources in the ‘Installation’ category'
        }}
      />
      <section class={styles.repo}>
        <div class={[styles.info, darkStyles.dark].join(' ')}>
          <TripleHeading title='How this site is built' />
          <p class={styles.desc}>
            A PWA itself, see the source
          </p>
          <p>
            <a
              class='button'
              style={{ '--button-color': 'var(--brand-pink)' }}
              href='https://github.com/shareup/pwa-resources'
            >
              View on GitHub
            </a>
          </p>
          <figure class={styles.decor} aria-hidden='true'>
            <img src={sourceWormUrl} width='181' height='154' alt='' />
          </figure>
        </div>
        <figure class={styles.figure}>
          <img src={computerUrl} width='300' height='400' alt='' />
          <pre>
            <code
              title='Binary representation of ‘PWA’'
              class={['speech', styles.codeSpeech].join(' ')}
            >
              {`01010000
01010111
01000001`}
            </code>
          </pre>
        </figure>
      </section>
      <hr />
      <FeaturedRow
        heading='Service Workers'
        desc='Get going with registration, installation, activation, and caching'
        image={{ url: iaUrl, width: 284, height: 260 }}
        backgroundColor='var(--brand-gold)'
        button={{
          isDark: true,
          color: 'var(--brand-blue)',
          href: '/categories/service-workers',
          title: 'View all resources in the ‘Service Workers’ category'
        }}
      />
    </div>
  )
}
