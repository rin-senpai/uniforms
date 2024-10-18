import { t } from 'elysia'
import { Type, type Static } from '@sinclair/typebox'
import { model } from './db/model'

const EventSchemaType = t.Object(model.select.event)
export type Event = Static<typeof EventSchemaType>

const OrganisationSchemaType = t.Object(model.select.organisation)
export type Organisation = Static<typeof OrganisationSchemaType>

export const UserCreateReturn = t.Object(
	{
		userId: t.Number()
	},
	{
		description: 'User creation return object'
	}
)

export const OrganisationCreateReturn = t.Object(
	{
		orgId: t.Number()
	},
	{
		description: 'Organisation creation return object'
	}
)

export const EventCreateReturn = t.Object(
	{
		eventId: t.Number()
	},
	{
		description: 'Event creation return object'
	}
)

export const FormCreateReturn = t.Object(
	{
		formId: t.Number()
	},
	{
		description: 'Form creation return object'
	}
)

export const FormTemplate = t.Object(
	{
		templateId: t.Number(),
		title: t.String(),
		description: t.String(),
		role: t.String(),
		canEditResponses: t.Boolean(),
		isPublic: t.Boolean(),
		fields: t.String(), // json
		createdAt: t.Number()
	},
	{
		description: 'Form template details object'
	}
)

export const FormTemplatePreview = t.Object(
	{
		templateId: t.Number(),
		title: t.String(),
		description: t.String(),
		role: t.String()
	},
	{
		description: 'Basic form template details object'
	}
)

export const FormTemplateCreateReturn = t.Object(
	{
		statusCode: t.Number(),
		templateId: t.Number()
	},
	{
		description: 'Form template creation return object'
	}
)

export const FormTemplateFieldAutofill = t.Object(
	{
		templateId: t.Number(),
		templateFieldId: t.Number(),
		value: t.String()
	},
	{
		description: 'Form template autofill object'
	}
)

export const EmptyReturn = t.Object({}, { description: 'Empty return object' })
