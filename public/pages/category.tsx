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
        <h1>Collection not found</h1>
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
