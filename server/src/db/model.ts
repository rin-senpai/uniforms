import { t } from 'elysia'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'

import { table } from './schema'
import { spreads } from './utils'

export const model = {
	insert: spreads(
		{
			user: createInsertSchema(table.users, {
				email: t.String({ format: 'email' }),
				avatarURI: t.String({ format: 'uri' })
			}),
			userAutofill: table.userAutofills,
			templateAutofill: table.templateAutofills,
			notification: table.notifications,
			notificationRule: table.notificationRules,
			organisation: createInsertSchema(table.organisations, {
				avatarURI: t.String({ format: 'uri' }),
				bannerURI: t.String({ format: 'uri' })
			}),
			organisationRole: table.organisationRoles,
			event: createInsertSchema(table.events, {
				bannerURI: t.String({ format: 'uri' })
			}),
			eventTag: table.eventTags,
			eventFollow: table.eventFollows,
			form: table.forms,
			template: table.templates,
			formSubmission: table.formSubmissions,
			spotlight: table.spotlights
		},
		'insert'
	),
	select: spreads(
		{
			user: createSelectSchema(table.users, {
				email: t.String({ format: 'email' }),
				avatarURI: t.String({ format: 'uri' })
			}),
			userAutofill: table.userAutofills,
			templateAutofill: table.templateAutofills,
			notification: table.notifications,
			notificationRule: table.notificationRules,
			organisation: createSelectSchema(table.organisations, {
				avatarURI: t.String({ format: 'uri' }),
				bannerURI: t.String({ format: 'uri' })
			}),
			organisationRole: table.organisationRoles,
			event: createSelectSchema(table.events, {
				bannerURI: t.String({ format: 'uri' })
			}),
			eventTag: table.eventTags,
			eventFollow: table.eventFollows,
			form: table.forms,
			template: table.templates,
			formSubmission: table.formSubmissions,
			spotlight: table.spotlights
		},
		'select'
	)
} as const
