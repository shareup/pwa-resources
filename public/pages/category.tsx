import type { FunctionalComponent } from 'preact'
import { Layout } from '../components/layout'
import { ResourcesList } from '../components/resources-list'
import { NotFound } from './not-found'
import { resources, slugsToCategory } from '../resources'
import headerStyles from './index/header.module.css'

type Props = {
  slug: string
}

export const Category: FunctionalComponent<Props> = ({ slug }) => {
  const category = slugsToCategory.get(slug)

  if (!category) {
    return (
      <NotFound/>
    )
  }

  const filteredResources = resources.filter(res => {
    return res.categories.includes(category)
  })

  return (
    <Layout >
      <nav class={headerStyles.categoryHeader}>
        <a href='/' class={headerStyles.backButton}>↩BACK</a>
        <h1 class={headerStyles.categoryTitle}>
          {category}
        </h1>
      </nav>
      <hr />
      <ResourcesList resources={filteredResources} />
    </Layout>
  )
}
