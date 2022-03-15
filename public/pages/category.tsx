import type { FunctionalComponent } from 'preact'
import { Layout } from '../components/layout'
import { ResourcesList } from '../components/resources-list'
import { resources, slugsToCategory } from '../resources'

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

  const title = (
    <>
      <abbr title='Progressive Web App'>PWA</abbr> Resources in the ‘{category}’ category
    </>
  )

  return (
    <Layout title={title}>
      <nav>
        <a href='/'>↩ Show all resources</a>
      </nav>
      <ResourcesList resources={filteredResources} />
    </Layout>
  )
}
