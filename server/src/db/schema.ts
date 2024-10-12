import { sql } from 'drizzle-orm'
import { integer, sqliteTable, primaryKey, text } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('users_table', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	email: text().notNull().unique(),
	avatarURI: text(),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
})

export const autofillsTable = sqliteTable(
	'autofills_table',
	{
		id: integer().primaryKey({ autoIncrement: true }),
		userId: integer()
			.notNull()
			.references(() => usersTable.id, { onDelete: 'cascade' }),
		field: text().notNull(),
		value: text().notNull(),
		createdAt: integer({ mode: 'timestamp' })
			.notNull()
			.default(sql`(strftime('%s', 'now'))`)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userId, table.field] })
		}
	}
)

export const notificationsTable = sqliteTable('notifications_table', {
	id: integer().primaryKey({ autoIncrement: true }),
	userId: integer()
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	read: integer({ mode: 'boolean' }).notNull().default(false),
	type: text({ enum: ['newEvent', 'newForm'] }),
	eventId: integer()
		.notNull()
		.references(() => eventsTable.id),
	formId: integer()
		.notNull()
		.references(() => formsTable.id),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
})

export const notificationRulesTable = sqliteTable(
	'notification_rules_table',
	{
		userId: integer()
			.notNull()
			.references(() => usersTable.id, { onDelete: 'cascade' }),
		keyword: text().notNull()
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userId, table.keyword] })
		}
	}
)

export const societiesTable = sqliteTable('societies_table', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	description: text().notNull(),
	avatarURI: text(),
	bannerURI: text(),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
})

export const societyRolesTable = sqliteTable(
	'society_roles_table',
	{
		societyId: integer()
			.notNull()
			.references(() => societiesTable.id, { onDelete: 'cascade' }),
		userId: integer()
			.notNull()
			.references(() => usersTable.id, { onDelete: 'cascade' }),
		role: text({ enum: ['member', 'manager', 'admin'] })
			.notNull()
			.default('member'),
		createdAt: integer({ mode: 'timestamp' })
			.notNull()
			.default(sql`(strftime('%s', 'now'))`)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.societyId, table.userId] })
		}
	}
)

export const eventsTable = sqliteTable('societies_table', {
	id: integer().primaryKey({ autoIncrement: true }),
	societyId: integer()
		.notNull()
		.references(() => societiesTable.id, { onDelete: 'cascade' }),
	title: text().notNull(),
	description: text().notNull(),
	isPublic: integer({ mode: 'boolean' }).notNull().default(true),
	timeStart: integer({ mode: 'timestamp' }),
	timeEnd: integer({ mode: 'timestamp' }),
	location: text(),
	bannerURI: text(),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
})

export const eventTagsTable = sqliteTable('event_tags_table', {
	name: text().notNull(),
	eventId: integer()
		.notNull()
		.references(() => eventsTable.id, { onDelete: 'cascade' }),
	createdAt: integer({ mode: 'timestamp' })
			.notNull()
			.default(sql`(strftime('%s', 'now'))`)
}, (table) => {
	return {
		pk: primaryKey({ columns: [table.name, table.eventId] })
	}
})

export const eventFollowsTable = sqliteTable(
	'event_follows_table',
	{
		eventId: integer()
			.notNull()
			.references(() => eventsTable.id, { onDelete: 'cascade' }),
		userId: integer()
			.notNull()
			.references(() => usersTable.id, { onDelete: 'cascade' }),
		createdAt: integer({ mode: 'timestamp' })
			.notNull()
			.default(sql`(strftime('%s', 'now'))`)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.eventId, table.userId] })
		}
	}
)

export const formsTable = sqliteTable('societies_table', {
	id: integer().primaryKey({ autoIncrement: true }),
	eventId: integer()
		.notNull()
		.references(() => eventsTable.id, { onDelete: 'cascade' }),
	title: text().notNull(),
	description: text().notNull(),
	canEditResponses: integer({ mode: 'boolean' }).notNull().default(false),
	isPublic: integer({ mode: 'boolean' }).notNull().default(true),
	fields: text({ mode: 'json' }).notNull().$type<{ type: string; id: number; header: string; description: string | undefined; options: any }[]>(),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
})

export const formSubmissionsTable = sqliteTable('form_submissions_table', {
	formId: integer()
		.notNull()
		.references(() => formsTable.id, { onDelete: 'cascade' }),
	userId: integer()
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	answers: text().notNull().$type<{ id: number; response: any }[]>(),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
})
