import type { FunctionalComponent, VNode } from 'preact'
import { useCallback, useEffect, useRef } from 'preact/hooks'
import arrowURL from 'url:../images/svg/arrow.svg'
import { useDB } from '../db-context'
import { useFetched } from '../hooks/use-fetched'
import { isPrerenderContext } from '../prerender-context'
import type { Resource } from '../resources'
import { categoryToSlugs } from '../resources'
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
  }, [db])

  return (
    <ul class={styles.list} ref={listRef}>
      {resources.map(res => <Item item={res} favs={favs} />)}
    </ul>
  )
}

const Item: FunctionalComponent<ItemProps> = ({ item, favs }) => {
  const isPrerender = isPrerenderContext()
  let isOld = false
  const colorCode = item.title.slice(-1).codePointAt(0) % 3
  const color = colors[colorCode]

  const categoryItems: VNode[] = []

  for (const col of item.categories) {
    if (col === ':old') { isOld = true }
    if (col.startsWith(':')) { continue }

    const slug = categoryToSlugs.get(col)!

    categoryItems.push(
      <li class={styles.categoryItem}>
        <a href={`/categories/${slug}`}>{col}</a>
      </li>
    )
  }

  return (
    <li class={styles.item}>
      <h2 class={styles.heading}>
        <a
          class={styles.link}
          href={item.url.toString()}
        >
          <span class={styles.headingVisible}>
            {item.title}
            <img src={arrowURL} width='22' height='22' alt='' />
          </span>
          <figure aria-hidden class={styles.headingFigure}>
            <span class={styles.figureFirst}>{item.title}</span>
            <span class={styles.figureSecond}>{item.title}</span>
          </figure>
        </a>
      </h2>
      <span class={styles.desc}>{item.desc}</span>
      {isOld
        ? (
          <span class={styles.old}>
            <abbr title='Caution'>⚠️</abbr>
            <span>This resource might be a little out of date.</span>
          </span>
        )
        : null}
      {categoryItems.length > 0
        ? (
          <ul class={styles.categories}>
            {categoryItems}
          </ul>
        )
        : null}
      {isPrerender
        ? null
        : <FavButton item={item} favs={favs} color={color} />}
    </li>
  )
}

const FavButton: FunctionalComponent<FavButtonProps> = ({ item, favs, color }) => {
  const itemUrl = item.url.toString()
  const disabled = !favs

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
