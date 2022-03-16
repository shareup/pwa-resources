import type { FunctionalComponent } from 'preact'
import { Layout } from '../components/layout'
import { ResourcesList } from '../components/resources-list'
import { resources, slugsToCategory } from '../resources'
import styles from '../components/resources-list.module.css'

type Props = {
  slug: string
}

export const Category: FunctionalComponent<Props> = ({ slug }) => {
  const category = slugsToCategory.get(slug)

  if (!category) {
    return (
      <Layout>
        <nav class={styles.categoryHeader}>
          <a href='/' class={styles.backButton}>↩BACK</a>
          <h1 class={[styles.categoryTitle, styles.notFoundBackground].join(' ')} >404</h1>
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
  }

  const filteredResources = resources.filter(res => {
    return res.categories.includes(category)
  })

  return (
    <Layout >
      <nav class={styles.categoryHeader}>
        <a href='/' class={styles.backButton}>↩BACK</a>
        <h1 class={styles.categoryTitle}>
          {category}
        </h1>
      </nav>
      <hr />
      <ResourcesList resources={filteredResources} />
    </Layout>
  )
}
