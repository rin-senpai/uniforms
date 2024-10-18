import { sql, relations } from 'drizzle-orm'
import { check, integer, sqliteTable, primaryKey, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	email: text().notNull().unique(),
	avatarURI: text(),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
})

export const usersRelations = relations(users, ({ many }) => ({
	userAutofills: many(userAutofills),
	templateAutofills: many(templateAutofills),
	notificationRules: many(notificationRules),
	organisationRoles: many(organisationRoles),
	eventFollows: many(eventFollows)
}))

export const userAutofills = sqliteTable(
	'user_autofills',
	{
		userId: integer()
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		fieldType: text().notNull(),
		value: text().notNull(),
		createdAt: integer({ mode: 'timestamp' })
			.notNull()
			.default(sql`(strftime('%s', 'now'))`)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userId, table.fieldType] })
		}
	}
)

export const userAutofillsRelations = relations(userAutofills, ({ one }) => ({
	users: one(users, {
		fields: [userAutofills.userId],
		references: [users.id]
	})
}))

export const templateAutofills = sqliteTable(
	'template_autofills',
	{
		userId: integer()
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		templateId: integer()
			.notNull()
			.references(() => templates.id, { onDelete: 'cascade' }),
		templateFieldId: integer().notNull(),
		value: text().notNull(),
		createdAt: integer({ mode: 'timestamp' })
			.notNull()
			.default(sql`(strftime('%s', 'now'))`)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userId, table.templateId, table.templateFieldId] })
		}
	}
)

export const templateAutofillsRelations = relations(templateAutofills, ({ one }) => ({
	users: one(users, {
		fields: [templateAutofills.userId],
		references: [users.id]
	})
}))

export const notifications = sqliteTable(
	'notifications',
	{
		id: integer().primaryKey({ autoIncrement: true }),
		userId: integer()
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		read: integer({ mode: 'boolean' }).notNull().default(false),
		type: text({ enum: ['newEvent', 'newForm'] }),
		eventId: integer().references(() => events.id),
		formId: integer().references(() => forms.id),
		createdAt: integer({ mode: 'timestamp' })
			.notNull()
			.default(sql`(strftime('%s', 'now'))`)
	},
	(table) => ({
		checkConstraint: check('id_null_check', sql`${table.eventId} IS NOT NULL OR ${table.formId} IS NOT NULL`)
	})
)

export const notificationsRelations = relations(notifications, ({ one }) => ({
	users: one(users, {
		fields: [notifications.userId],
		references: [users.id]
	}),
	events: one(events, {
		fields: [notifications.eventId],
		references: [events.id]
	}),
	forms: one(forms, {
		fields: [notifications.formId],
		references: [forms.id]
	})
}))

export const notificationRules = sqliteTable(
	'notification_rules',
	{
		userId: integer()
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		keyword: text().notNull(),
		createdAt: integer({ mode: 'timestamp' })
			.notNull()
			.default(sql`(strftime('%s', 'now'))`)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userId, table.keyword] })
		}
	}
)

export const notificationsRulesRelations = relations(notificationRules, ({ one }) => ({
	users: one(users, {
		fields: [notificationRules.userId],
		references: [users.id]
	})
}))

export const organisations = sqliteTable('organisations', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	description: text().notNull(),
	avatarURI: text(),
	bannerURI: text(),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
})

export const organisationsRelations = relations(organisations, ({ many }) => ({
	organisationRoles: many(organisationRoles),
	events: many(events)
}))

export const organisationRoles = sqliteTable(
	'organisation_roles',
	{
		organisationId: integer()
			.notNull()
			.references(() => organisations.id, { onDelete: 'cascade' }),
		userId: integer()
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		role: text({ enum: ['follower', 'moderator', 'manager'] })
			.notNull()
			.default('follower'),
		createdAt: integer({ mode: 'timestamp' })
			.notNull()
			.default(sql`(strftime('%s', 'now'))`)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.organisationId, table.userId] })
		}
	}
)

export const organisationRolesRelations = relations(organisationRoles, ({ one }) => ({
	organisations: one(organisations, {
		fields: [organisationRoles.organisationId],
		references: [organisations.id]
	}),
	users: one(users, {
		fields: [organisationRoles.userId],
		references: [users.id]
	})
}))

export const events = sqliteTable('events', {
	id: integer().primaryKey({ autoIncrement: true }),
	organisationId: integer()
		.notNull()
		.references(() => organisations.id, { onDelete: 'cascade' }),
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

export const eventsRelations = relations(events, ({ one, many }) => ({
	notifications: many(notifications),
	organisations: one(organisations, {
		fields: [events.organisationId],
		references: [organisations.id]
	}),
	eventTags: many(eventTags),
	eventFollows: many(eventFollows),
	forms: many(forms),
	templates: many(templates)
}))

export const eventTags = sqliteTable(
	'event_tags',
	{
		name: text().notNull(),
		eventId: integer()
			.notNull()
			.references(() => events.id, { onDelete: 'cascade' }),
		createdAt: integer({ mode: 'timestamp' })
			.notNull()
			.default(sql`(strftime('%s', 'now'))`)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.name, table.eventId] })
		}
	}
)

export const eventTagsRelations = relations(eventTags, ({ one }) => ({
	events: one(events, {
		fields: [eventTags.eventId],
		references: [events.id]
	})
}))

export const eventFollows = sqliteTable(
	'event_follows',
	{
		eventId: integer()
			.notNull()
			.references(() => events.id, { onDelete: 'cascade' }),
		userId: integer()
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
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

export const eventFollowsRelations = relations(eventFollows, ({ one }) => ({
	events: one(events, {
		fields: [eventFollows.eventId],
		references: [events.id]
	}),
	users: one(users, {
		fields: [eventFollows.userId],
		references: [users.id]
	})
}))

export const forms = sqliteTable('forms', {
	id: integer().primaryKey({ autoIncrement: true }),
	eventId: integer()
		.notNull()
		.references(() => events.id, { onDelete: 'cascade' }),
	templateId: integer().references(() => templates.id),
	title: text().notNull(),
	description: text().notNull(),
	role: text(),
	canEditResponses: integer({ mode: 'boolean' }).notNull().default(false),
	isPublic: integer({ mode: 'boolean' }).notNull().default(true),
	fields: text({ mode: 'json' }).notNull().$type<{
		blocks: {
			type: 'short' | 'long' | 'radio' | 'checkbox' | 'dropdown' | 'slider' | 'radioGrid' | 'checkboxGrid'
			id: number
			templateFieldId: number | undefined
			header: string
			description: string | undefined
			options: any
		}[]
	}>(),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
})

export const formsRelations = relations(forms, ({ one, many }) => ({
	events: one(events, {
		fields: [forms.eventId],
		references: [events.id]
	}),
	templates: one(templates, {
		fields: [forms.templateId],
		references: [templates.id]
	}),
	formSubmissions: many(formSubmissions),
	notifications: many(notifications)
}))

export const templates = sqliteTable('templates', {
	id: integer().primaryKey({ autoIncrement: true }),
	organisationId: integer()
		.notNull()
		.references(() => organisations.id, { onDelete: 'cascade' }),
	title: text().notNull(),
	description: text().notNull(),
	role: text(),
	canEditResponses: integer({ mode: 'boolean' }).notNull().default(false),
	isPublic: integer({ mode: 'boolean' }).notNull().default(true),
	fields: text({ mode: 'json' }).notNull().$type<{ type: string; id: number; templateFieldId: number | undefined; header: string; description: string | undefined; options: any }[]>(),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
})

export const templatesRelations = relations(templates, ({ one, many }) => ({
	organisations: one(organisations, {
		fields: [templates.organisationId],
		references: [organisations.id]
	}),
	templateAutofills: many(templateAutofills),
	forms: many(forms)
}))

export const formSubmissions = sqliteTable(
	'form_submissions',
	{
		formId: integer()
			.notNull()
			.references(() => forms.id, { onDelete: 'cascade' }),
		userId: integer()
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		answers: text().notNull().$type<{ id: number; response: any }[]>(),
		createdAt: integer({ mode: 'timestamp' })
			.notNull()
			.default(sql`(strftime('%s', 'now'))`)
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.formId, table.userId] })
		}
	}
)

export const formSubmissionsRelations = relations(formSubmissions, ({ one }) => ({
	forms: one(forms, {
		fields: [formSubmissions.formId],
		references: [forms.id]
	}),
	users: one(users, {
		fields: [formSubmissions.userId],
		references: [users.id]
	})
}))

export const spotlights = sqliteTable('spotlights', {
	week: integer({ mode: 'timestamp' }).notNull(),
	eventId: integer()
		.notNull()
		.references(() => events.id, { onDelete: 'cascade' }),
	createdAt: integer({ mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`)
})

export const spotlightsRelations = relations(spotlights, ({ one }) => ({
	events: one(events, {
		fields: [spotlights.eventId],
		references: [events.id]
	})
}))

export const table = {
	users,
	userAutofills,
	templateAutofills,
	notifications,
	notificationRules,
	organisations,
	organisationRoles,
	events,
	eventTags,
	eventFollows,
	forms,
	templates,
	formSubmissions,
	spotlights
} as const

export type Table = typeof table
