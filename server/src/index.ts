import 'dotenv/config'
import { drizzle } from 'drizzle-orm/connect'

import { Elysia } from 'elysia'

const db = await drizzle('bun:sqlite', process.env.DB_FILE_NAME!)

const app = new Elysia().get('/', () => 'Hello Elysia').listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
