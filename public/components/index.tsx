import type { FunctionalComponent } from 'preact'
import { Layout } from '../components/layout'
import { categories, categoryToSlugs } from '../resources'
import styles from './index.module.css'
import { Featured } from './featured'
import { GettingStartedAndNav } from './gs-and-nav'
import { Header } from './header'

export const Index: FunctionalComponent = () => {
  return (
    <Layout>
      <Header />
      <hr />
      <main>
        <GettingStartedAndNav />
        <hr />
        <Featured />
      </main>
    </Layout>
  )
}
