import type { FunctionalComponent } from 'preact'
import styles from './index.module.css'

export const Index: FunctionalComponent = () => {
  return (
    <main class={styles.main}>
      <h1>Hello world</h1>
      <p>
        <button>Learn more</button>
        <br />
        <br />
        <button>Save for later</button>
      </p>
    </main>
  )
}
