import { t } from 'elysia'
import { Type, type Static } from '@sinclair/typebox'

export const User = t.Object(
	{
		userId: t.Number(),
		name: t.String(),
		email: t.String(),
		avatarURI: t.String(),
		createdAt: t.Number()
	},
	{
		description: 'User details object'
	}
)
type User = Static<typeof User>

export const UserCreateReturn = t.Object({
	statusCode: t.Number(),
	userId: t.Number()
})

export const UserRole = t.Object(
	{
		userId: t.Number(),
		role: t.String()
	},
	{
		description: 'User role within an organisation'
	}
)

export const Organisation = t.Object(
	{
		orgId: t.Number(),
		name: t.String(),
		description: t.String(),
		avatarURI: t.String(),
		bannerURI: t.String(),
		createdAt: t.Number()
	},
	{
		description: 'Organization details object'
	}
)
type Organisation = Static<typeof Organisation>

export const OrganisationPreview = t.Object(
	{
		orgId: t.Number(),
		name: t.String(),
		description: t.String(),
		avatarURI: t.String()
	},
	{
		description: 'Basic organization details object'
	}
)

export const OrganisationCreateReturn = t.Object(
	{
		statusCode: t.Number(),
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
type Event = Static<typeof Event>

export const EventCreateReturn = t.Object(
	{
		statusCode: t.Number(),
		eventId: t.Number()
	},
	{
		description: 'Event creation return object'
	}
)

export const FormDetails = t.Object(
	{
		eventId: t.Number(),
		orgId: t.Number(),
		title: t.String(),
		description: t.String()
	},
	{
		description: 'Event details object'
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

export const Notification = t.Object(
	{
		notificationId: t.Number(),
		userId: t.Number(),
		read: t.Boolean(),
		type: t.String(),
		eventId: t.Optional(t.Number()),
		formId: t.Optional(t.Number()),
		message: t.String(),
		createdAt: t.Number()
	},
	{
		description: 'Notification details object'
	}
)

export const NotificationCreateReturn = t.Object(
	{
		statusCode: t.Number(),
		notificationId: t.Number()
	},
	{
		description: 'Notification creation return object'
	}
)

export const StatusCodeReturn = t.Object(
	{
		statusCode: t.Number()
	},
	{
		description: 'Status code return object'
	}
)
