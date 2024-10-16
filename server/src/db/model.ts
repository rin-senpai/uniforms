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
			form: createInsertSchema(table.forms, {
				fields: t.Object({
						blocks: t.Array(t.Object({
							type: t.Union([t.Literal('short'), t.Literal('long'), t.Literal('radio'), t.Literal('checkbox'), t.Literal('dropdown'), t.Literal('slider'), t.Literal('radioGrid'), t.Literal('checkboxGrid')]),
							id: t.Number(),
							templateFieldId: t.Union([t.Number(), t.Undefined()]),
							header: t.String(),
							description: t.Union([t.String(), t.Undefined()]),
							options: t.Any()
					}))
				})
			}),
			template: table.templates,
			formSubmission: createInsertSchema(table.formSubmissions, {
				answers: t.Array(t.Object({
					id: t.Number(),
					response: t.Any()
				}))
			}),
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
			form: createSelectSchema(table.forms, {
				fields: t.Object({
					blocks: t.Array(t.Object({
						type: t.Union([t.Literal('short'), t.Literal('long'), t.Literal('radio'), t.Literal('checkbox'), t.Literal('dropdown'), t.Literal('slider'), t.Literal('radioGrid'), t.Literal('checkboxGrid')]),
						id: t.Number(),
						templateFieldId: t.Union([t.Number(), t.Undefined()]),
						header: t.String(),
						description: t.Union([t.String(), t.Undefined()]),
						options: t.Any()
					}))
				})
			}),
			template: table.templates,
			formSubmission: createSelectSchema(table.formSubmissions, {
				answers: t.Array(t.Object({
					id: t.Number(),
					response: t.Any()
				}))
			}),
			spotlight: table.spotlights
		},
		'select'
	)
} as const
