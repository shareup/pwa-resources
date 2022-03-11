import type { FunctionalComponent, VNode } from 'preact'
import type { Resource } from '../resources'
import { collectionToSlugs } from '../resources'
import styles from './resources-list.module.css'

type Props = {
  resources: Resource[]
}

export const ResourcesList: FunctionalComponent<Props> = ({ resources }) => {
  return (
    <ul class={styles.list}>
      {resources.map(res => <Item item={res} />)}
    </ul>
  )
}

type ItemProps = {
  item: Resource
}

const colors = [
  'var(--brand-gold)',
  'var(--brand-blue)',
  'var(--brand-red)'
]

const Item: FunctionalComponent<ItemProps> = ({ item }) => {
  let isOld = false

  const colorCode = item.title.slice(-1).codePointAt(0) % 3
  const color = colors[colorCode]
  const collectionItems: VNode[] = []

  for (const col of item.collections) {
    if (col === ':old') { isOld = true }
    if (col.startsWith(':')) { continue }

    const slug = collectionToSlugs.get(col)!

    collectionItems.push(
      <li class={styles.collectionItem}>
        <a href={`/collections/${slug}`}>{col}</a>
      </li>
    )
  }

  return (
    <li class={styles.item}>
      <a
        class={styles.title}
        style={{ '--link-color': color }}
        href={item.url.toString()}
      >
        {item.title}
      </a>
      <span class={styles.desc}>{item.desc}</span>
      {isOld
        ? (
          <span class={styles.old}>
            <abbr title='Caution'>⚠️</abbr>
            <span>This resource might be a little out of date.</span>
          </span>
        )
        : null}
      <ul class={styles.collections}>
        {collectionItems}
      </ul>
      <button
        class={styles.saveButton}
        style={{ '--button-color': color }}
      >
        <abbr title='Favorite'>♥</abbr>
      </button>
    </li>
  )
}
