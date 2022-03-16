import type { FunctionalComponent } from 'preact'
import { Layout } from '../components/layout'
import headerStyles from './header.module.css'
import styles from './not-found.module.css'

export const NotFound: FunctionalComponent = () => (
  <Layout>
    <nav class={headerStyles.categoryHeader}>
      <a href='/' class={headerStyles.backButton}>↩BACK</a>
      <h1 class={[headerStyles.categoryTitle, headerStyles.notFoundBackground].join(' ')} >404</h1>
    </nav>
    <hr />
    <div class={styles.notFoundWrapper}>
      <div class={styles.pageNotFound}>
        <section class={styles.notFoundSection}>
          <h2>Page not found</h2>
          <a href='/' class={[styles.backToHome, 'button'].join(' ')}>Back to home</a>
        </section>
      </div>
      <div class={styles.notFoundPizza}>
        <p class={[styles.pizzaSpeech, 'speech'].join(' ')}>Cheese the day!</p>
        <img src='/images/svg/coolpizza.svg' width='450' height='450'/>
      </div>
    </div>
  </Layout>
)
