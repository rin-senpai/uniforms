import { t } from 'elysia'

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

export const Event = t.Object(
	{
		eventId: t.Number(),
		orgId: t.Number(),
		title: t.String(),
		description: t.String(),
		isPublic: t.Boolean(),
		timeStart: t.Number(),
		timeEnd: t.Number(),
		location: t.String(),
		tags: t.Array(t.String()),
		bannerURI: t.String(),
		createdAt: t.Number()
	},
	{
		description: 'Event details object'
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

export const Form = t.Object(
	{
		formId: t.Number(),
		eventId: t.Number(),
		templateId: t.Optional(t.Number()),
		title: t.String(),
		description: t.String(),
		role: t.String(),
		canEditResponses: t.Boolean(),
		isPublic: t.Boolean(),
		fields: t.String(), // json
		createdAt: t.Number()
	},
	{
		description: 'Form details object'
	}
)

export const FormSubmission = t.Object(
	{
		userId: t.Number(),
		fields: t.String(), // json
		createdAt: t.Number()
	},
	{
		description: 'Form submission details object'
	}
)

export const FormSubmissionList = t.Object(
	{
		userId: t.Number(),
		userName: t.String(),
		createdAt: t.Number()
	},
	{
		description: 'Form submission details object'
	}
)

export const FormCreateReturn = t.Object(
	{
		statusCode: t.Number(),
		formId: t.Number()
	},
	{
		description: 'Form creation return object'
	}
)

export const EmptyReturn = t.Object({}, { description: 'Empty return object' })

export const StatusCodeReturn = t.Object(
	{
		statusCode: t.Number()
	},
	{
		description: 'Status code return object'
	}
)
