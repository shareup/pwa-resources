import type { FunctionalComponent, VNode } from 'preact'
import { Layout } from '../components/layout'
import { ResourcesList } from '../components/resources-list'
import { resources } from '../resources'

export const Index: FunctionalComponent = () => {
  return (
    <Layout>
      <ResourcesList resources={resources} />
    </Layout>
  )
}
