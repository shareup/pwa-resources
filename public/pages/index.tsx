import type { FunctionalComponent, VNode } from 'preact'
import styles from './index.module.css'

import { resources } from '../resources'
import type { Resource } from '../resources'

export const Index: FunctionalComponent = () => {
  return (
    <main class={styles.main}>
      <h1>All PWA Resources</h1>
      <ul>
        {resources.map(res => <Item item={res} />)}
      </ul>
    </main>
  )
}

type ItemProps = {
  item: Resource
}

const Item: FunctionalComponent<ItemProps> = ({ item }) => {
  let isOld = false

  const collectionItems: VNode[] = []

  for (const col of item.collections) {
    if (col === ':old') { isOld = true }
    if (col.startsWith(':')) { continue }
    collectionItems.push(<li class={styles.collectionItem}>{col}</li>)
  }

  return (
    <li class={styles.item}>
      <a href={item.url.toString()}>{item.title}</a>
      <span class={styles.desc}>{item.desc}</span>
      <ul class={styles.collections}>
        {collectionItems}
      </ul>
      {isOld
        ? (
          <span class={styles.old}>
            This resource might be a little out of date, but still has useful content.
          </span>
        )
        : null}
    </li>
  )
}
