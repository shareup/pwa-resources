import type { FunctionalComponent } from 'preact'
import bananaUrl from '../images/svg/banana.svg'
import catsUrl from '../images/svg/cats.svg'
import convoUrl from '../images/svg/convo.svg'
import { categories, categoryToSlugs } from '../resources'
import styles from './gs-and-nav.module.css'
import { TripleHeading } from './triple-heading'

export const GettingStartedAndNav: FunctionalComponent = () => {
  return (
    <div class={styles.columns}>
      <div class={styles.gsWrapper}>
        <section class={styles.gs}>
          <TripleHeading title='Getting Started' />
          <p class={styles.gsDesc}>Guides for how to get up & running</p>
          <p>
            <a
              class={['button', styles.button].join(' ')}
              href='/categories/getting-started'
              title='View all resources in the ‘Getting Started’ category'
            >
              View Category
            </a>
          </p>
          <figure class={styles.gsFigure} aria-hidden>
            <img
              src={bananaUrl}
              width='345'
              height='220'
              alt=''
            />
          </figure>
        </section>
        <figure class={styles.offlineFigure}>
          <div class={styles.offlineConvo}>
            <p class={[styles.offlineConvoQuestion, 'speech'].join(' ')}>You don’t work offline?</p>
            <p class={[styles.offlineConvoAnswer, 'speech'].join(' ')}>You do‽</p>
          </div>
          <img
            src={convoUrl}
            width='331'
            height='190'
            alt='Two cartoon characters staring at each other One asks the other: "You don’t work offline? The other responds: "You do?"'
          />
        </figure>
      </div>
      <div class={styles.navWrapper}>
        <nav aria-labelledby='categories-nav-heading' class={styles.nav}>
          <TripleHeading title='Categories' />
          <ul class={styles.navList}>
            <li>
              <a href='/categories/all' class={styles.navLink}>All</a>
            </li>
            <li class={styles.sectionEnd}>
              <a
                href='/categories/getting-started'
                class={[styles.navLink, styles.divider].join(' ')}
              >
                Getting Started
              </a>
            </li>
            {categories.map(cat => (
              <li>
                <a href={`/categories/${categoryToSlugs.get(cat)}`} class={styles.navLink}>{cat}</a>
              </li>
            ))}
          </ul>
        </nav>
        <figure class={styles.navFigure} aria-hidden='true'>
          <img
            src={catsUrl}
            width='247'
            height='229'
            alt=''
          />
        </figure>
      </div>
    </div>
  )
}
