import type { FunctionalComponent } from 'preact'
import componentsUrl from 'url:../images/components.png'
import computerUrl from 'url:../images/computer.png'
import iaUrl from 'url:../images/ia.png'
import sourceWormUrl from 'url:../images/source-worm.png'
import thumbsUrl from 'url:../images/thumbs.png'
import { Layout } from '../components/layout'
import { categories, categoryToSlugs } from '../resources'
import styles from './index.module.css'
import { GettingStartedAndNav } from './index/gs-and-nav'
import { Header } from './index/header'

export const Index: FunctionalComponent = () => {
  return (
    <Layout>
      <Header />
      <hr />
      <main>
        <GettingStartedAndNav />
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
