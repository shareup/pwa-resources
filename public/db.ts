import { openDB } from 'idb'
import type { DBSchema, IDBPDatabase } from 'idb'
import { Resource } from './resources'

type Fav = {
  url: string
}

interface Schema extends DBSchema {
  favs: {
    key: string
    value: Fav
  }
}

export type DB = IDBPDatabase<Schema>

export async function open() {
  return openDB<Schema>('pwaResources', 1, {
    upgrade(db, old, cur, tx) {
      db.createObjectStore('favs', { keyPath: 'url' })
    }
  })
}
