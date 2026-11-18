// One Postgres pool per process, opened on first use.
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { config } from '../config/env.ts'
import * as schema from './schema/index.ts'

export type Db = PostgresJsDatabase<typeof schema>

let db: Db | undefined
let sqlClient: postgres.Sql | undefined

export function useDb(): Db {
  if (db) return db
  if (!config.databaseUrl) throw new Error('DATABASE_URL is not set')
  sqlClient = postgres(config.databaseUrl, { max: 10, idle_timeout: 30, prepare: true })
  db = drizzle(sqlClient, { schema })
  return db
}

export async function closeDb() {
  await sqlClient?.end({ timeout: 5 })
  db = undefined
  sqlClient = undefined
}
