import type { FunctionalComponent, VNode } from 'preact'
import { useCallback, useEffect, useRef } from 'preact/hooks'
import { useDB } from '../db-context'
import { useFetched } from '../hooks/use-fetched'
import type { Resource } from '../resources'
import { collectionToSlugs } from '../resources'
import styles from './resources-list.module.css'

type Props = {
  resources: Resource[]
}

type ItemProps = {
  favs?: string[]
  item: Resource
}

type FavButtonProps = ItemProps & {
  color: string
}

const colors = [
  'var(--brand-gold)',
  'var(--brand-blue)',
  'var(--brand-red)'
]

export const ResourcesList: FunctionalComponent<Props> = ({ resources }) => {
  const listRef = useRef<HTMLUListElement>(null)
  const db = useDB()

  const { state: favs, error: favsError, fetch: fetchFavs } = useFetched(undefined, async () => {
    return db && db.getAllKeys('favs')
  }, [db])

  const clickedFav = useCallback(async (button: HTMLButtonElement) => {
    const url = button.getAttribute('data-item-url')
    const isFav = button.hasAttribute('data-favorited')

    if (!url) { return }

    // TODO: should we have a state for 'saving...'? It's so quick I
    // can't imagine we would need it 🤷

    if (isFav) {
      await db.delete('favs', url)
    } else {
      await db.add('favs', { url })
    }

    fetchFavs()
  }, [db])

  const clicked = useCallback((e: MouseEvent) => {
    if (!db) { return }

    if (e.target instanceof HTMLElement) {
      const button = e.target.closest('button')

      if (button) {
        e.preventDefault()
        clickedFav(button).catch(e => {
          console.error('error processing fav click', e)
        })
      }
    }
  }, [db])

  useEffect(() => {
    listRef.current.addEventListener('click', clicked)

    return () => {
      listRef.current?.removeEventListener('click', clicked)
    }
  }, [])

  return (
    <ul class={styles.list} ref={listRef}>
      {resources.map(res => <Item item={res} favs={favs} />)}
    </ul>
  )
}

const Item: FunctionalComponent<ItemProps> = ({ item, favs }) => {
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
      <FavButton item={item} favs={favs} color={color} />
    </li>
  )
}

const FavButton: FunctionalComponent<FavButtonProps> = ({ item, favs, color }) => {
  const itemUrl = item.url.toString()
  const disabled = !favs

  if (disabled) {
    color = 'var(--brand-silver)'
  }

  favs || (favs = [])
  const isFav = favs.includes(itemUrl)

  const classes = isFav
    ? [styles.saveButton, styles.faved].join(' ')
    : styles.saveButton

  const contents = disabled
    ? '…'
    : (isFav
      ? <abbr title='Favorited'>♥</abbr>
      : <abbr title='Favorite'>♥</abbr>)

  return (
    <button
      key='button'
      disabled={disabled}
      class={classes}
      style={{ '--button-color': color }}
      data-item-url={itemUrl}
      data-favorited={isFav}
    >
      {contents}
    </button>
  )
}
