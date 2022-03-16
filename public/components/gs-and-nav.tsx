import type { FunctionalComponent } from 'preact'
import bananaUrl from 'url:../images/svg/banana.svg'
import catsUrl from 'url:../images/svg/cats.svg'
import convoUrl from 'url:../images/svg/convo.svg'
import { categories, categoryToSlugs } from '../resources'
import styles from './gs-and-nav.module.css'

export const GettingStartedAndNav: FunctionalComponent = () => {
  return (
    <div class={styles.columns}>
      <div class={styles.gsWrapper}>
        <section class={styles.gs}>
          <h2 class={styles.gsHeading}>Getting Started</h2>
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
          <figure class={styles.gsFigure}>
            <img src={bananaUrl} width='345' height='220' alt='' />
          </figure>
        </section>
        <figure class={styles.offlineFigure}>
          <div class={styles.offlineConvo}>
            <p class={[styles.offlineConvoQuestion, 'speech'].join(' ')}>You don’t work offline?</p>
            <p class={[styles.offlineConvoAnswer, 'speech'].join(' ')}>You do‽</p>
          </div>
          <img src={convoUrl} width='331' height='190' alt='' />
        </figure>
      </div>
      <div class={styles.navWrapper}>
        <nav aria-labelledby='categories-nav-heading' class={styles.nav}>
          <h2 id='categories-nav-heading' class={styles.navHeading}>Categories</h2>
          <ul class={styles.navList}>
            <li>
              <a href='/categories/all' class={styles.navLink}>All</a>
            </li>
            {categories.map(cat => (
              <li>
                <a href={`/categories/${categoryToSlugs.get(cat)}`} class={styles.navLink}>{cat}</a>
              </li>
            ))}
          </ul>
        </nav>
        <figure class={styles.navFigure}>
          <img src={catsUrl} width='247' height='229' alt='' />
        </figure>
      </div>
    </div>
  )
}
