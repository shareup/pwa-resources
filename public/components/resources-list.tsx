import type { FunctionalComponent, VNode } from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { useDB } from '../db-context'
import { useFetched } from '../hooks/use-fetched'
import componentsUrl from '../images/svg/components.svg'
import cupUrl from '../images/svg/cup.svg'
import iaUrl from '../images/svg/ia.svg'
import pentaUrl from '../images/svg/penta.svg'
import spaceUrl from '../images/svg/space.svg'
import triUrl from '../images/svg/tri.svg'
import warnUrl from '../images/svg/warn.svg'
import { isPrerenderContext } from '../prerender-context'
import type { Resource } from '../resources'
import { categoryToColors, categoryToSlugs } from '../resources'
import darkStyles from './dark.module.css'
import styles from './resources-list.module.css'
import { TripleHeading } from './triple-heading'

type Props = {
  resources: Resource[]
  category: string
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
  'var(--brand-gold)': iaUrl,
  'var(--brand-yellow)': spaceUrl,
  'var(--brand-blue)': cupUrl,
  'var(--brand-light-blue)': triUrl,
  'var(--brand-pink)': componentsUrl,
  'var(--brand-red)': pentaUrl
}

const colorPairs = {
  'var(--brand-blue)': [
    'var(--brand-gold)',
    'var(--brand-light-blue)',
    'var(--brand-pink)'
  ],
  'var(--brand-red)': [
    'var(--brand-gold)',
    'var(--brand-light-blue)',
    'var(--brand-pink)'
  ],
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
    'var(--brand-light-blue)',
    'var(--brand-gold)',
    'var(--brand-red)',
    'var(--brand-blue)',
    'var(--brand-pink)'
  ]
}

const backgroundColors = [
  'var(--brand-light-blue)',
  'var(--brand-pink)',
  'var(--brand-blue)',
  'var(--brand-red)',
  'var(--brand-yellow)'
]

const colorCount = backgroundColors.length

export const ResourcesList: FunctionalComponent<Props> = ({ resources, category }) => {
  const listRef = useRef<HTMLUListElement>(null)
  const db = useDB()
  const startingBackgroundColor = categoryToColors.get(category)
  const [screenWidth, updateWidth] = useState(window.innerWidth)

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

  const getColumnForScreenSize = (screenSize: number): number => {
    if (screenSize >= 1500) {
      return 4
    } else if (screenSize <= 900) {
      return 3
    } else {
      return 3
    }
  }

  let columnCount = getColumnForScreenSize(window.innerWidth)

  const handleResize = useCallback(() => {
    columnCount = getColumnForScreenSize(window.innerWidth)
    updateWidth(window.innerWidth)
  }, [window.innerWidth])

  useEffect(() => {
    listRef.current.addEventListener('click', clicked)
    window.addEventListener('resize', handleResize)
    return () => {
      listRef.current?.removeEventListener('click', clicked)
    }
  }, [db])

  console.log(columnCount, screenWidth)
  // grabs the next color
  let colorIndex = backgroundColors.indexOf(startingBackgroundColor) + 1
  // next color might be out of bounds, so reset
  colorIndex = colorIndex === colorCount ? 0 : colorIndex

  let item

  return (
    <ul class={styles.list} ref={listRef}>
      {resources.map((res, index) => {
        item = (
          <Item
            item={res}
            favs={favs}
            backgroundColor={backgroundColors[colorIndex]}
            divider={(index + 1) % columnCount === 0}
          />
        )

        colorIndex++

        if (colorIndex >= colorCount) {
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
    item.title.slice(item.title.length / 2, item.title.length / 2 + 1).codePointAt(0)
    % matchingButtonColors.length
  ]

  const isDarkColor = backgroundColor === 'var(--brand-blue)'
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
      class={[
        styles.item,
        divider ? styles.divider : null,
        isDarkColor ? darkStyles.dark : null
      ].join(' ')}
      style={{ '--background-color': backgroundColor }}
    >
      <TripleHeading title={item.title} url={item.url} />
      <span class={styles.hostname}>({item.url.hostname.replace(/^www\./, '')})</span>
      <span class={styles.desc}>{item.desc}</span>
      {isOld
        ? (
          <span class={[styles.old, darkStyles.darkBackground].join(' ')}>
            <abbr title='Caution'>
              <img src={warnUrl} height='30' alt='' />
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
            src={illustrationPairs[backgroundColor]}
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
  const isDark = color === 'var(--brand-blue)' || color === 'var(--brand-red)'
  const heartColor = isFav ? color : (isDark ? 'var(--brand-white)' : 'var(--brand-black)')

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
