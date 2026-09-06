import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { env } from '../src/shared/lib/env'
import * as schema from './schema/index'

const client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
})

export const db: LibSQLDatabase<typeof schema> = drizzle(client, { schema })
