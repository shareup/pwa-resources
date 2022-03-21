import type { FunctionalComponent, VNode } from 'preact'
import { useCallback, useEffect, useRef } from 'preact/hooks'
import whiteArrowURL from 'url:../images/svg/arrow-white.svg'
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
  divider?: boolean
  backgroundColor?: string
}

type FavButtonProps = ItemProps & {
  color: string
}

const illustrationPairs = {
  'var(--brand-gold)': 'ia',
  'var(--brand-yellow)': 'space',
  'var(--brand-blue)': 'cup',
  'var(--brand-light-blue)': 'tri',
  'var(--brand-pink)': 'components',
  'var(--brand-red)': 'penta'
}

const colorPairs = {
  'var(--brand-blue)': ['var(--brand-gold)', 'var(--brand-light-blue)', 'var(--brand-pink)'],
  'var(--brand-red)': ['var(--brand-gold)', 'var(--brand-light-blue)', 'var(--brand-pink)'],
  'var(--brand-pink)': [
    'var(--brand-yellow)',
    'var(--brand-light-blue)',
    'var(--brand-blue)',
    'var(--brand-red)'
  ],
  'var(--brand-light-blue)': [
    'var(--brand-yellow)',
    'var(--brand-blue)',
    'var(--brand-red)',
    'var(--brand-pink)'
  ],
  'var(--brand-yellow)': [
    'var(--brand-blue)',
    'var(--brand-light-blue)',
    'var(--brand-gold)',
    'var(--brand-red)',
    'var(--brand-pink)'
  ]
}

export const backgroundColors = [
  'var(--brand-light-blue)',
  'var(--brand-pink)',
  'var(--brand-blue)',
  'var(--brand-red)',
  'var(--brand-yellow)'
]

const colors = Object.keys(colorPairs)

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

  let colorIndex = 0
  let item

  return (
    <ul class={styles.list} ref={listRef}>
      {resources.map((res, index) => {
        item = (
          <Item
            item={res}
            favs={favs}
            backgroundColor={backgroundColors[colorIndex]}
            divider={(index + 1) % 3 === 0}
          />
        )

        colorIndex++

        if (colorIndex >= backgroundColors.length) {
          colorIndex = 0
        }

        return item
      })}
    </ul>
  )
}

const Item: FunctionalComponent<ItemProps> = ({ item, favs, divider, backgroundColor }) => {
  const isPrerender = isPrerenderContext()
  let isOld = false
  const matchingButtonColors = colorPairs[backgroundColor]
  const color = matchingButtonColors[
    item.title.slice(-1).codePointAt(0)
    % matchingButtonColors.length
  ]

  const darkColor = backgroundColor === 'var(--brand-blue)'
    || backgroundColor === 'var(--brand-red)'

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
    <li
      class={[styles.item, divider ? styles.divider : null, darkColor ? styles.darkColor : null]
        .join(
          ' '
        )}
      style={{ 'background-color': backgroundColor }}
    >
      <h2 class={styles.heading}>
        <a
          class={styles.link}
          href={item.url.toString()}
        >
          <span
            class={styles.headingVisible}
            style={{ 'background-color': backgroundColor }}
          >
            {item.title}
            <img src={darkColor ? whiteArrowURL : arrowURL} width='22' height='22' alt='' />
          </span>
          <figure aria-hidden class={styles.headingFigure}>
            <span
              class={styles.figureFirst}
              style={{
                'background-color': backgroundColor,
                'color': backgroundColor
              }}
            >
              {item.title}
            </span>
            <span
              class={styles.figureSecond}
              style={{
                'background-color': backgroundColor,
                'color': backgroundColor
              }}
            >
              {item.title}
            </span>
          </figure>
        </a>
      </h2>
      <span class={styles.hostname}>({item.url.hostname.replace(/^www\./, '')})</span>
      <span class={styles.desc}>{item.desc}</span>
      {isOld
        ? (
          <span class={styles.old}>
            <abbr title='Caution'>
              <img src='/images/svg/warn.svg' height='30' />
            </abbr>
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

      {divider
        ? (
          <img
            src={`/images/svg/${illustrationPairs[backgroundColor]}.svg`}
            class={styles.featureImage}
            height='275'
          />
        )
        : null}
    </li>
  )
}

const FavButton: FunctionalComponent<FavButtonProps> = ({ item, favs, color }) => {
  const itemUrl = item.url.toString()
  const disabled = !favs

  favs || (favs = [])
  const isFav = favs.includes(itemUrl)
  const heartColor = color === 'var(--brand-blue)' || color === 'var(--brand-red)'
    ? isFav ? color : '#fff'
    : isFav
    ? color
    : '#000'

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
      style={{ '--button-color': color, color: heartColor }}
      data-item-url={itemUrl}
      data-favorited={isFav}
    >
      {contents}
    </button>
  )
}
