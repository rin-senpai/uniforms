import 'dotenv/config'
import { drizzle } from 'drizzle-orm/connect'

import { Elysia } from 'elysia'

// import { model } from './db/model'
// import { Users } from './db/schema'

// get types from db for route params and responses:
// const { User } = model.insert (or select)
// see https://elysiajs.com/recipe/drizzle on using the model
//
// for updating the db:
// await db.insert(Users).values(['sdijfsoei', 'seoifn']) etc
// see https://orm.drizzle.team/docs/

const db = await drizzle('bun:sqlite', process.env.DB_FILE_NAME!)

const app = new Elysia().get('/', () => 'Hello Elysia').listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
