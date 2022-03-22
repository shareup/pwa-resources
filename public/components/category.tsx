import type { FunctionalComponent } from 'preact'
import { useLocation } from 'preact-iso'
import { useDB } from '../db-context'
import { useFetched } from '../hooks/use-fetched'
import { categoryToColors, Resource, resources, slugsToCategory } from '../resources'
import darkStyles from './dark.module.css'
import headerStyles from './header.module.css'
import { Layout } from './layout'
import { NotFound } from './not-found'
import { ResourcesList } from './resources-list'

type Props = {
  slug: string
}

type LayoutProps = {
  title: string
  resources: Resource[]
}

const CategoryLayout: FunctionalComponent<LayoutProps> = ({ title, resources }) => {
  const { route } = useLocation()

  const onBackclick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (history.length > 2) {
      history.back()
    } else {
      route('/')
    }
  }

  const backgroundColor = categoryToColors.get(title)
  const darkColor = backgroundColor === 'var(--brand-blue)'
    || backgroundColor === 'var(--brand-red)'

  return (
    <Layout>
      <nav class={headerStyles.categoryHeader}>
        <a href='/' onClick={onBackclick} class={headerStyles.backButton}>↩BACK</a>
        <h1
          class={[headerStyles.categoryTitle, darkColor ? darkStyles.dark : null].join(' ')}
          style={{ backgroundColor: backgroundColor }}
        >
          {title}
        </h1>
      </nav>
      <hr />
      <ResourcesList resources={resources} category={title} />
    </Layout>
  )
}

export const Category: FunctionalComponent<Props> = ({ slug }) => {
  const db = useDB()
  const { state: favs, error: favsError, fetch: fetchFavs } = useFetched(undefined, async () => {
    return db && db.getAllKeys('favs')
  }, [db])

  if (slug === 'favs' && favs) {
    const favResources = resources.filter(res => {
      const url = res.url.toString()
      return favs.includes(url)
    })
    return <CategoryLayout title='Favs' resources={favResources} />
  }

  if (slug === 'all') {
    return <CategoryLayout title='all' resources={resources} />
  }

  const category = slugsToCategory.get(slug)

  if (!category) {
    return <NotFound />
  }

  const filteredResources = resources.filter(res => {
    return res.categories.includes(category)
  })

  return <CategoryLayout title={category} resources={filteredResources} />
}
