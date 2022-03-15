import type { FunctionalComponent, VNode } from 'preact'
import { useCallback } from 'preact/hooks'
import imgUrl from 'url:../images/thumbs.png'
import { Layout } from '../components/layout'
import { categories, categoryToSlugs } from '../resources'

export const Index: FunctionalComponent = () => {
  const click = useCallback((e: MouseEvent) => {
    e.preventDefault()
    // NOTE: we stop prop so the router doesn't grab it and pushState
    e.stopPropagation()
    console.debug('clicked fav button')
  }, [])

  return (
    <Layout>
      <header>
        <div>
          <h1>
            <abbr title='Progressive Web App'>PWA</abbr> Resources
          </h1>
          <p>A curated collection</p>
        </div>
        <aside>
          <p>
            <a href='/favs' class='button' onClick={click}>
              View your <abbr title='favorites'>♥‘s</abbr>
            </a>
            <img src={imgUrl} width='462' height='360' />
          </p>
        </aside>
      </header>
      <main>
        <div>
          <section>
            <h2>Getting Started</h2>
            <p>Guides for how to get up & running</p>
            <p>
              <a
                class='button'
                href='/categories/getting-started'
                title='View all resrouces in the ‘Getting Started’ category'
              >
                View Category
              </a>
            </p>
          </section>
          <nav aria-labelledby='categories-nav-heading'>
            <h2 id='categories-nav-heading'>Categories</h2>
            <ul>
              <li>
                <a href='#'>All</a>
              </li>
              {categories.map(cat => (
                <li>
                  <a href={`/categories/${categoryToSlugs[cat]}`}>{cat}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
    </Layout>
  )
}
