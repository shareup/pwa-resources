import type { FunctionalComponent } from 'preact'
import bananaUrl from 'url:../../images/banana.png'
import catsUrl from 'url:../../images/cats.png'
import convoUrl from 'url:../../images/convo.png'
import { categories, categoryToSlugs } from '../../resources'
import styles from './gs-and-nav.module.css'

export const GettingStartedAndNav: FunctionalComponent = () => {
  return (
    <div class={styles.columns}>
      <div>
        <section>
          <h2>Getting Started</h2>
          <p>Guides for how to get up & running</p>
          <p>
            <a
              class='button'
              href='/categories/getting-started'
              title='View all resources in the ‘Getting Started’ category'
            >
              View Category
            </a>
          </p>
          <figure>
            <img src={bananaUrl} width='310' height='159' alt='' />
          </figure>
        </section>
        <figure>
          <p>You don’t work offline?</p>
          <p>You do‽</p>
          <img src={convoUrl} width='331' height='190' alt='' />
        </figure>
      </div>
      <div class={styles.navWrapper}>
        <nav aria-labelledby='categories-nav-heading'>
          <h2 id='categories-nav-heading'>Categories</h2>
          <ul>
            <li>
              <a href='#'>All</a>
            </li>
            {categories.map(cat => (
              <li>
                <a href={`/categories/${categoryToSlugs.get(cat)}`}>{cat}</a>
              </li>
            ))}
          </ul>
        </nav>
        <figure>
          <img src={catsUrl} width='247' height='229' alt='' />
        </figure>
      </div>
    </div>
  )
}
