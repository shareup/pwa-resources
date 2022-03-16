import type { FunctionalComponent } from 'preact'
import { Layout } from '../components/layout'
import { ResourcesList } from '../components/resources-list'
import { NotFound } from './not-found'
import { Resource, resources, slugsToCategory } from '../resources'
import headerStyles from './index/header.module.css'

type Props = {
  slug: string
}

type LayoutProps = {
  title: string
  resources: Resource[]
}

const CategoryLayout: FunctionalComponent<LayoutProps> = ({ title, resources }) => {
  return (
    <Layout >
      <nav class={headerStyles.categoryHeader}>
        <a href='/' class={headerStyles.backButton}>↩BACK</a>
        <h1 class={headerStyles.categoryTitle}>
          { title }
        </h1>
      </nav>
      <hr />
      <ResourcesList resources={resources} />
    </Layout>
  )
}

export const Category: FunctionalComponent<Props> = ({ slug }) => {

  if (!slug) {
    return <CategoryLayout title='all' resources={resources}/>
  }

  const category = slugsToCategory.get(slug)

  if (!category) {
    return (
      <NotFound/>
    )
  }

  const filteredResources = resources.filter(res => {
    return res.categories.includes(category)
  })

  return <CategoryLayout title={category} resources={filteredResources}/>
}
