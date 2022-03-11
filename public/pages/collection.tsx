import type { FunctionalComponent } from 'preact'
import { Layout } from '../components/layout'
import { ResourcesList } from '../components/resources-list'
import { resources, slugsToCollection } from '../resources'
import styles from './collection.module.css'

type Props = {
  slug: string
}

export const Collection: FunctionalComponent<Props> = ({ slug }) => {
  const collection = slugsToCollection.get(slug)

  if (!collection) {
    return (
      <Layout>
        <h1>Collection not found</h1>
      </Layout>
    )
  }

  const filteredResources = resources.filter(res => {
    return res.collections.includes(collection)
  })

  const title = (
    <>
      <abbr title='Progressive Web App'>PWA</abbr> Resources in the ‘{collection}’ collection
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
