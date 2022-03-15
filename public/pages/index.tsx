import type { FunctionalComponent, VNode } from 'preact'
import { useCallback } from 'preact/hooks'
import catsUrl from 'url:../images/cats.png'
import componentsUrl from 'url:../images/components.png'
import computerUrl from 'url:../images/computer.png'
import convoUrl from 'url:../images/convo.png'
import iaUrl from 'url:../images/ia.png'
import sourceWormUrl from 'url:../images/source-worm.png'
import thumbsUrl from 'url:../images/thumbs.png'
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
            <figure>
              <img src={thumbsUrl} width='462' height='360' />
            </figure>
            <a href='/favs' class='button' onClick={click}>
              View your <abbr title='favorites'>♥‘s</abbr>
            </a>
          </p>
        </aside>
      </header>
      <main>
        <div>
          <div>
            <section>
              <h2>Getting Started</h2>
              <p>
                Guides for how to get up & running
                <a
                  class='button'
                  href='/categories/getting-started'
                  title='View all resources in the ‘Getting Started’ category'
                >
                  View Category
                </a>
              </p>
            </section>
            <figure>
              <p>You don’t work offline?</p>
              <p>You do‽</p>
              <img src={convoUrl} width='331' height='190' alt='' />
            </figure>
          </div>
          <div>
            <nav aria-labelledby='categories-nav-heading'>
              <h2 id='categories-nav-heading'>Categories</h2>
              <ul>
                <li>
                  <a href='#'>All</a>
                </li>
                {categories.map(cat => (
                  <li>
                    <a href={`/categories/${categoryToSlugs.get(cat)}`}>{cat}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <figure>
              <img src={catsUrl} width='247' height='229' alt='' />
            </figure>
          </div>
        </div>
        <div>
          <section>
            <h2>Web Components</h2>
            <p>
              Learn to implement interactive Web Components in the client and even prerender on the
              server
              <a
                class='button'
                href='/categories/web-components'
                title='View all resources in the ‘Web Components’ category'
              >
                View Category
              </a>
            </p>
            <figure>
              <img src={componentsUrl} width='304' height='272' alt='' />
            </figure>
          </section>
          <section>
            <div>
              <h2>How this site is built</h2>
              <p>
                A PWA itself, see the source
                <a
                  class='button'
                  href='https://github.com/shareup/pwa-resources'
                >
                  View on GitHub
                </a>
              </p>
              <figure>
                <img src={sourceWormUrl} width='183' height='154' alt='' />
              </figure>
            </div>
            <figure>
              <img src={computerUrl} width='292' height='400' alt='' />
              <pre>
                <code>
                  {`
01010000
01010111
01000001
                  `}
                </code>
              </pre>
            </figure>
          </section>
          <section>
            <h2>Service Worker</h2>
            <p>
              Get going with registration, installation, activation, and caching
              <a
                class='button'
                href='/categories/service-workers'
                title='View all resources in the ‘Service Workers’ category'
              >
                View Category
              </a>
            </p>
            <figure>
              <img src={iaUrl} width='284' height='260' alt='' />
            </figure>
          </section>
        </div>
      </main>
    </Layout>
  )
}
