import type { FunctionalComponent } from 'preact'
import { Layout } from '../components/layout'
import headerStyles from './header.module.css'
import styles from './not-found.module.css'
import resourceStyles from './resources-list.module.css'

const onBackclick = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  history.back()
}

export const NotFound: FunctionalComponent = () => (
  <Layout>
    <nav class={headerStyles.categoryHeader}>
      <a href='/' onClick={onBackclick} class={headerStyles.backButton}>↩BACK</a>
      <h1 class={[headerStyles.categoryTitle, headerStyles.notFoundBackground].join(' ')}>404</h1>
    </nav>
    <hr />
    <div class={styles.notFoundWrapper}>
      <div class={styles.pageNotFound}>
        <section class={styles.notFoundSection}>
          <h2 class={styles.pageNotFoundHeading}>
            <span class={resourceStyles.headingVisible}>
              Page not found
            </span>
            <figure aria-hidden class={resourceStyles.headingFigure}>
              <span class={resourceStyles.figureFirst}>Page not found</span>
              <span class={resourceStyles.figureSecond}>Page not found</span>
            </figure>
          </h2>
          <a href='/' class={[styles.backToHome, 'button'].join(' ')}>Back to home</a>
        </section>
      </div>
      <div class={styles.notFoundPizza}>
        <p class={[styles.pizzaSpeech, 'speech'].join(' ')}>Cheese the day!</p>
        <figure aria-hidden>
          <img src='/images/svg/coolpizza.svg' width='450' height='450' />
        </figure>
      </div>
    </div>
  </Layout>
)
