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

export const UserUpdateReturn = t.Object({
	statusCode: t.Integer(),
	message: t.String(),
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

export const UserRoleUpdateReturn = t.Object(
	{
		statusCode: t.Integer(),
		message: t.String()
	},
	{
		description: 'User roles update return object'
	}
)

export const UserAutofillUpdateReturn = t.Object(
	{
		statusCode: t.Integer(),
		message: t.String(),
		fieldType: t.String()
	},
	{
		description: 'User autofill update return object'
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

export const OrganisationUpdateReturn = t.Object(
	{
		statusCode: t.Integer(),
		message: t.String(),
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

export const EventPreview = t.Object(
	{
		eventId: t.Integer(),
		orgId: t.Integer(),
		title: t.String(),
		timeStart: t.Integer(),
		timeEnd: t.Integer(),
		location: t.String(),
		tags: t.Array(t.String()),
		bannerURI: t.String()
	},
	{
		description: 'Basic event details object'
	}
)

export const EventFollowReturn = t.Object(
	{
		statusCode: t.Integer(),
		message: t.String(),
		eventId: t.Integer()
	},
	{
		description: 'Event follow return object'
	}
)

export const EventUpdateReturn = t.Object(
	{
		statusCode: t.Integer(),
		message: t.String(),
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

export const FormTemplateUpdateReturn = t.Object(
	{
		statusCode: t.Integer(),
		message: t.String(),
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

export const FormTemplateFieldAutofillUpdateReturn = t.Object(
	{
		statusCode: t.Integer(),
		message: t.String(),
		templateFieldId: t.Integer()
	},
	{
		description: 'Form template autofill update return object'
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

export const FormUpdateReturn = t.Object(
	{
		statusCode: t.Integer(),
		message: t.String(),
		formId: t.Integer()
	},
	{
		description: 'Form update return object'
	}
)

export const FormSubmissionReturn = t.Object(
	{
		statusCode: t.Integer(),
		message: t.String(),
		userId: t.Integer()
	},
	{
		description: 'Form submission return object'
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

export const NotificationUpdateReturn = t.Object(
	{
		statusCode: t.Integer(),
		message: t.String(),
		notificationId: t.Integer()
	},
	{
		description: 'Notification update return object'
	}
)

export const NotificationRuleUpdateReturn = t.Object(
	{
		statusCode: t.Integer(),
		message: t.String(),
		keyword: t.String()
	},
	{
		description: 'Notification rule update return object'
	}
)

export const DeleteReturn = t.Object(
	{
		statusCode: t.Integer(),
		message: t.String()
	},
	{
		description: 'Delete return object'
	}
)
