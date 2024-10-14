import { t } from 'elysia'
import { Type, type Static } from '@sinclair/typebox'

export const User = t.Object(
	{
		userId: t.Integer(),
		name: t.String(),
		email: t.String(),
		avatarURI: t.String(),
		createdAt: t.Integer()
	},
	{
		description: 'User details object'
	}
)
type User = Static<typeof User>

export const UserCreateReturn = t.Object({
	statusCode: t.Integer(),
	userId: t.Integer()
})

export const UserRole = t.Object(
	{
		userId: t.Integer(),
		role: t.String()
	},
	{
		description: 'User role within an organisation'
	}
)

export const Organisation = t.Object(
	{
		orgId: t.Integer(),
		name: t.String(),
		description: t.String(),
		avatarURI: t.String(),
		bannerURI: t.String(),
		createdAt: t.Integer()
	},
	{
		description: 'Organization details object'
	}
)
type Organisation = Static<typeof Organisation>

export const OrganisationPreview = t.Object(
	{
		orgId: t.Integer(),
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
		statusCode: t.Integer(),
		orgId: t.Integer()
	},
	{
		description: 'Organisation update return object'
	}
)

export const Event = t.Object(
	{
		eventId: t.Integer(),
		orgId: t.Integer(),
		title: t.String(),
		description: t.String(),
		isPublic: t.Boolean(),
		timeStart: t.Integer(),
		timeEnd: t.Integer(),
		location: t.String(),
		tags: t.Array(t.String()),
		bannerURI: t.String(),
		createdAt: t.Integer()
	},
	{
		description: 'Event details object'
	}
)
type Event = Static<typeof Event>

export const EventCreateReturn = t.Object(
	{
		statusCode: t.Integer(),
		eventId: t.Integer()
	},
	{
		description: 'Event update return object'
	}
)

export const FormDetails = t.Object(
	{
		eventId: t.Integer(),
		orgId: t.Integer(),
		title: t.String(),
		description: t.String()
	},
	{
		description: 'Event details object'
	}
)

export const FormTemplate = t.Object(
	{
		templateId: t.Integer(),
		title: t.String(),
		description: t.String(),
		role: t.String(),
		canEditResponses: t.Boolean(),
		isPublic: t.Boolean(),
		fields: t.String(), // json
		createdAt: t.Integer()
	},
	{
		description: 'Form template details object'
	}
)

export const FormTemplatePreview = t.Object(
	{
		templateId: t.Integer(),
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
		statusCode: t.Integer(),
		templateId: t.Integer()
	},
	{
		description: 'Form template update return object'
	}
)

export const FormTemplateFieldAutofill = t.Object(
	{
		templateId: t.Integer(),
		templateFieldId: t.Integer(),
		value: t.String()
	},
	{
		description: 'Form template autofill object'
	}
)

export const Form = t.Object(
	{
		formId: t.Integer(),
		eventId: t.Integer(),
		templateId: t.Optional(t.Integer()),
		title: t.String(),
		description: t.String(),
		role: t.String(),
		canEditResponses: t.Boolean(),
		isPublic: t.Boolean(),
		fields: t.String(), // json
		createdAt: t.Integer()
	},
	{
		description: 'Form details object'
	}
)

export const FormSubmission = t.Object(
	{
		userId: t.Integer(),
		fields: t.String(), // json
		createdAt: t.Integer()
	},
	{
		description: 'Form submission details object'
	}
)

export const FormSubmissionList = t.Object(
	{
		userId: t.Integer(),
		userName: t.String(),
		createdAt: t.Integer()
	},
	{
		description: 'Form submission details object'
	}
)

export const FormCreateReturn = t.Object(
	{
		statusCode: t.Integer(),
		formId: t.Integer()
	},
	{
		description: 'Form update return object'
	}
)

export const Notification = t.Object(
	{
		notificationId: t.Integer(),
		userId: t.Integer(),
		read: t.Boolean(),
		type: t.String(),
		eventId: t.Optional(t.Integer()),
		formId: t.Optional(t.Integer()),
		message: t.String(),
		createdAt: t.Integer()
	},
	{
		description: 'Notification details object'
	}
)

export const NotificationCreateReturn = t.Object(
	{
		statusCode: t.Integer(),
		notificationId: t.Integer()
	},
	{
		description: 'Notification update return object'
	}
)

export const StatusCodeReturn = t.Object(
	{
		statusCode: t.Integer()
	},
	{
		description: 'Delete return object'
	}
)
