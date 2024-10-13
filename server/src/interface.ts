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

export const DeleteReturn = t.Object(
	{
		statusCode: t.Integer(),
		message: t.String()
	},
	{
		description: 'Delete return object'
	}
)
