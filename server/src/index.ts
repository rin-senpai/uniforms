import 'dotenv/config'
import { drizzle } from 'drizzle-orm/connect'

import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import {
	Event,
	EventUpdateReturn,
	FormDetails,
	Organisation,
	OrganisationPreview,
	OrganisationUpdateReturn,
	UserRole,
	UserRoleUpdateReturn,
	UserUpdateReturn,
	User,
	DeleteReturn,
	EventFollowReturn,
	Notification,
	NotificationUpdateReturn,
	UserAutofillUpdateReturn,
	NotificationRuleUpdateReturn,
	Form,
	FormSubmissionReturn,
	FormSubmission,
	FormUpdateReturn,
	FormSubmissionList,
	FormTemplatePreview,
	FormTemplateUpdateReturn,
	FormTemplateFieldAutofill,
	FormTemplateFieldAutofillUpdateReturn,
	FormTemplate
} from './interface'

// import { model } from './db/model'
// import { Users } from './db/schema'

// get types from db for route params and responses:
// const { User } = model.insert (or select)
// see https://elysiajs.com/recipe/drizzle on using the model
//
// for updating the db:
// await db.insert(Users).values(['sdijfsoei', 'seoifn']) etc
// see https://orm.drizzle.team/docs/

const db = await drizzle('bun:sqlite', process.env.DB_FILE_NAME!)

const app = new Elysia()
	.use(swagger())
	.get('/', () => 'Hello Elysia')

	.get(
		'/events',
		() => {
			return {
				events: [
					{
						eventId: 1,
						orgId: 1,
						title: 'Event Title',
						description: 'Event Description',
						isPublic: true,
						timeStart: 1630000000,
						timeEnd: 1630000000,
						location: 'Event Location',
						tags: ['tag1', 'tag2'],
						bannerURI: 'Event Banner URI',
						createdAt: 1630000000
					},
					{
						eventId: 2,
						orgId: 2,
						title: 'Event Title',
						description: 'Event Description very long yes asdklasjdaksdjkasjd;ljlkjdfkljasdklfjklsdajfklsdjafklja lkfjsdlkf j;klsajf lkajsf kljdslk',
						isPublic: true,
						timeStart: 1630000000,
						timeEnd: 1630000000,
						location: 'Event Location',
						tags: ['tag1', 'tag2'],
						bannerURI: 'Event Banner URI',
						createdAt: 1630000000
					}
				]
			}
		},
		{
			response: t.Object({
				events: t.Array(Event)
			}),
			detail: {
				description: 'Get all events'
			}
		}
	)

	.get(
		'/events/spotlight',
		() => {
			return {
				events: [
					{
						eventId: 1,
						orgId: 1,
						title: 'Event Title',
						description: 'Event Description',
						isPublic: true,
						timeStart: 1630000000,
						timeEnd: 1630000000,
						location: 'Event Location',
						tags: ['tag1', 'tag2'],
						bannerURI: 'Event Banner URI',
						createdAt: 1630000000
					},
					{
						eventId: 2,
						orgId: 2,
						title: 'Event Title',
						description: 'Event Description very long yes asdklasjdaksdjkasjd;ljlkjdfkljasdklfjklsdajfklsdjafklja lkfjsdlkf j;klsajf lkajsf kljdslk',
						isPublic: true,
						timeStart: 1630000000,
						timeEnd: 1630000000,
						location: 'Event Location',
						tags: ['tag1', 'tag2'],
						bannerURI: 'Event Banner URI',
						createdAt: 1630000000
					}
				]
			}
		},
		{
			response: t.Object({
				events: t.Array(Event)
			}),
			detail: {
				description: 'Get all spotlight events'
			}
		}
	)

	.post(
		'/events/spotlight',
		() => {
			return {
				statusCode: 200,
				message: 'Spotlight events added successfully',
				eventId: 1
			}
		},
		{
			body: t.Object({
				token: t.String(),
				eventId: t.Integer()
			}),
			response: EventUpdateReturn,
			detail: {
				description: 'Add spotlight event'
			}
		}
	)

	.delete(
		'/events/spotlight',
		() => {
			return {
				statusCode: 200,
				message: 'Spotlight event removed successfully'
			}
		},
		{
			body: t.Object({
				token: t.String(),
				eventId: t.Integer()
			}),
			response: DeleteReturn,
			detail: {
				description: 'Remove spotlight event'
			}
		}
	)

	.get(
		'/events/:eventId',
		() => {
			return {
				eventId: 1,
				orgId: 1,
				title: 'Event Title',
				description: 'Event Description',
				isPublic: true,
				timeStart: 1630000000,
				timeEnd: 1630000000,
				location: 'Event Location',
				tags: ['tag1', 'tag2'],
				bannerURI: 'Event Banner URI',
				createdAt: 1630000000
			}
		},
		{
			params: t.Object({
				eventId: t.Integer()
			}),
			response: Event,
			detail: {
				description: 'Get event by id'
			}
		}
	)

	.post(
		'/events/:eventId/followers',
		() => {
			return {
				statusCode: 200,
				message: 'User now following event',
				eventId: 1
			}
		},
		{
			params: t.Object({
				eventId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Integer()
			}),
			response: EventFollowReturn,
			detail: {
				description: 'Adds a user to followers of an event'
			}
		}
	)

	.delete(
		'/events/:eventId/followers',
		() => {
			return {
				statusCode: 200,
				message: 'User no longer following organisation'
			}
		},
		{
			params: t.Object({
				eventId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Integer()
			}),
			response: DeleteReturn,
			detail: {
				description: 'Removes a user from followers of an event'
			}
		}
	)

	.get(
		'/events/:eventId/forms',
		() => {
			return {
				forms: [
					{
						eventId: 1,
						orgId: 1,
						title: 'Form Title',
						description: 'Form Description'
					},
					{
						eventId: 2,
						orgId: 2,
						title: 'Form Title',
						description: 'Form Description'
					}
				]
			}
		},
		{
			params: t.Object({
				eventId: t.Integer()
			}),
			response: t.Object({
				forms: t.Array(FormDetails)
			}),
			detail: {
				description: 'Get all forms for an event'
			}
		}
	)

	.get(
		'/org',
		() => {
			return {
				organisations: [
					{
						orgId: 1,
						name: 'organisation Name',
						description: 'organisation Description',
						avatarURI: 'organisation Banner URI'
					},
					{
						orgId: 2,
						name: 'organisation Name',
						description: 'organisation Description',
						avatarURI: 'organisation Banner URI'
					}
				]
			}
		},
		{
			response: t.Object({
				organisations: t.Array(OrganisationPreview)
			}),
			detail: {
				description: 'Get all organisations'
			}
		}
	)

	.get(
		'/org/:orgId',
		() => {
			return {
				orgId: 1,
				name: 'organisation Name',
				description: 'organisation Description',
				avatarURI: 'organisation Banner URI',
				bannerURI: 'organisation Banner URI',
				createdAt: 1630000000
			}
		},
		{
			params: t.Object({
				orgId: t.Integer()
			}),
			response: Organisation,
			detail: {
				description: 'Get full organisation details by id'
			}
		}
	)

	.get(
		'/org/:orgId/events',
		() => {
			return {
				events: [
					{
						eventId: 1,
						orgId: 1,
						title: 'Event Title',
						description: 'Event Description',
						isPublic: true,
						timeStart: 1630000000,
						timeEnd: 1630000000,
						location: 'Event Location',
						tags: ['tag1', 'tag2'],
						bannerURI: 'Event Banner URI',
						createdAt: 1630000000
					},
					{
						eventId: 2,
						orgId: 2,
						title: 'Event Title',
						description: 'Event Description very long yes asdklasjdaksdjkasjd;ljlkjdfkljasdklfjklsdajfklsdjafklja lkfjsdlkf j;klsajf lkajsf kljdslk',
						isPublic: true,
						timeStart: 1630000000,
						timeEnd: 1630000000,
						location: 'Event Location',
						tags: ['tag1', 'tag2'],
						bannerURI: 'Event Banner URI',
						createdAt: 1630000000
					}
				]
			}
		},
		{
			params: t.Object({
				orgId: t.String()
			}),
			response: t.Object({
				events: t.Array(Event)
			}),
			detail: {
				description: 'Get all events for an organisation'
			}
		}
	)

	.get(
		'/org/:orgId/followers',
		() => {
			return {
				statusCode: 200,
				followerCount: 1000
			}
		},
		{
			params: t.Object({
				eventId: t.Integer()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: t.Object({
				statusCode: t.Integer(),
				followerCount: t.Integer()
			}),
			detail: {
				description: 'Get follower count of an organisation'
			}
		}
	)

	.post(
		'/org/:orgId/followers',
		() => {
			return {
				statusCode: 200,
				message: 'User now following organisation'
			}
		},
		{
			params: t.Object({
				orgId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Integer()
			}),
			response: UserRoleUpdateReturn,
			detail: {
				description: 'Adds a user to followers of an organisation'
			}
		}
	)

	.delete(
		'/org/:orgId/followers',
		() => {
			return {
				statusCode: 200,
				message: 'User no longer following organisation'
			}
		},
		{
			params: t.Object({
				orgId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Integer(),
				role: t.String()
			}),
			response: DeleteReturn,
			detail: {
				description: 'Removes a user from followers of an organisation'
			}
		}
	)

	.post(
		'/admin/events',
		() => {
			return {
				statusCode: 200,
				message: 'Event created successfully',
				eventId: 1
			}
		},
		{
			body: t.Object({
				token: t.String(),
				eventId: t.Integer(),
				title: t.String(),
				description: t.String(),
				isPublic: t.Boolean(),
				timeStart: t.Integer(),
				timeEnd: t.Integer(),
				location: t.String(),
				bannerURI: t.String()
			}),
			response: EventUpdateReturn,
			detail: {
				description: 'Create an event'
			}
		}
	)

	.put(
		'/admin/events/:eventId',
		() => {
			return {
				statusCode: 200,
				message: 'Event updated successfully',
				eventId: 1
			}
		},
		{
			params: t.Object({
				eventId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				title: t.String(),
				description: t.String(),
				isPublic: t.Boolean(),
				timeStart: t.Integer(),
				timeEnd: t.Integer(),
				location: t.String(),
				bannerURI: t.String()
			}),
			response: EventUpdateReturn,
			detail: {
				description: 'Update an event'
			}
		}
	)

	.delete(
		'/admin/events/:eventId',
		() => {
			return {
				statusCode: 200,
				message: 'Event deleted successfully'
			}
		},
		{
			params: t.Object({
				eventId: t.Integer()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: DeleteReturn,
			detail: {
				description: 'Delete an event'
			}
		}
	)

	.get(
		'/admin/events/:eventId/followers',
		() => {
			return {
				statusCode: 200,
				followerCount: 1000
			}
		},
		{
			params: t.Object({
				eventId: t.Integer()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: t.Object({
				statusCode: t.Integer(),
				followerCount: t.Integer()
			}),
			detail: {
				description: 'Get follower count of an event'
			}
		}
	)

	.post(
		'/admin/org',
		() => {
			return {
				statusCode: 200,
				message: 'organisation created successfully',
				orgId: 1
			}
		},
		{
			body: t.Object({
				token: t.String(),
				name: t.String(),
				description: t.String(),
				avatarURI: t.String()
			}),
			response: OrganisationUpdateReturn,
			detail: {
				description: 'Create an organisation'
			}
		}
	)

	.put(
		'/admin/org/:orgId',
		() => {
			return {
				statusCode: 200,
				message: 'organisation updated successfully',
				orgId: 1
			}
		},
		{
			params: t.Object({
				orgId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				name: t.String(),
				description: t.String(),
				avatarURI: t.String()
			}),
			response: OrganisationUpdateReturn,
			detail: {
				description: 'Update an organisation'
			}
		}
	)

	.delete(
		'/admin/org/:orgId',
		() => {
			return {
				statusCode: 200,
				message: 'organisation deleted successfully'
			}
		},
		{
			params: t.Object({
				orgId: t.Integer()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: DeleteReturn,
			detail: {
				description: 'Delete an organisation'
			}
		}
	)

	.get(
		'/admin/org/:orgId/admins',
		() => {
			return {
				managers: [
					{
						userId: 1,
						role: 'manager'
					},
					{
						userId: 2,
						role: 'manager'
					}
				],
				moderators: [
					{
						userId: 3,
						role: 'moderator'
					},
					{
						userId: 4,
						role: 'moderator'
					}
				]
			}
		},
		{
			params: t.Object({
				orgId: t.Integer()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: t.Object({
				managers: t.Array(UserRole),
				moderators: t.Array(UserRole)
			}),
			detail: {
				description: 'Get all administrators of an organisation'
			}
		}
	)

	.post(
		'/admin/org/:orgId/admins',
		() => {
			return {
				statusCode: 200,
				message: 'User role added successfully'
			}
		},
		{
			params: t.Object({
				orgId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Integer(),
				role: t.String()
			}),
			response: UserRoleUpdateReturn,
			detail: {
				description: 'Add a role to a user in an organisation'
			}
		}
	)

	.delete(
		'/admin/org/:orgId/admins',
		() => {
			return {
				statusCode: 200,
				message: 'User role removed successfully'
			}
		},
		{
			params: t.Object({
				orgId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Integer(),
				role: t.String()
			}),
			response: DeleteReturn,
			detail: {
				description: 'Remove a role from a user in an organisation'
			}
		}
	)

	.post(
		'/admin/form',
		() => {
			return {
				statusCode: 200,
				message: 'Form created successfully',
				formId: 1
			}
		},
		{
			body: t.Object({
				token: t.String(),
				eventId: t.Integer(),
				title: t.String(),
				description: t.String(),
				role: t.String(),
				canEditResponses: t.Boolean(),
				isPublic: t.Boolean(),
				fields: t.String()
			}),
			response: FormUpdateReturn,
			detail: {
				description: 'Create a form'
			}
		}
	)

	.put(
		'/admin/form/:formId',
		() => {
			return {
				statusCode: 200,
				message: 'Form updated successfully',
				formId: 1
			}
		},
		{
			params: t.Object({
				formId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				eventId: t.Integer(),
				title: t.String(),
				description: t.String(),
				role: t.String(),
				canEditResponses: t.Boolean(),
				isPublic: t.Boolean(),
				fields: t.String()
			}),
			response: FormUpdateReturn,
			detail: {
				description: 'Update a form'
			}
		}
	)

	.delete(
		'/admin/form/:formId',
		() => {
			return {
				statusCode: 200,
				message: 'Form deleted successfully'
			}
		},
		{
			params: t.Object({
				formId: t.Integer()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: DeleteReturn,
			detail: {
				description: 'Delete a form'
			}
		}
	)

	.get(
		'/admin/form/:formId',
		() => {
			return {
				formId: 1,
				eventId: 1,
				templateId: 1,
				title: 'Form Title',
				description: 'Form Description',
				role: 'attendance',
				canEditResponses: true,
				isPublic: true,
				fields: '{}',
				createdAt: 1630000000
			}
		},
		{
			params: t.Object({
				formId: t.Integer()
			}),
			response: Form,
			detail: {
				description: 'Get a form'
			}
		}
	)

	.get(
		'/admin/form/:formId/submissions',
		() => {
			return {
				submissions: [
					{
						userId: 1,
						userName: 'User Name',
						createdAt: 1630000000
					},
					{
						userId: 2,
						userName: 'User Name',
						createdAt: 163000000
					}
				]
			}
		},
		{
			params: t.Object({
				formId: t.Integer()
			}),
			response: t.Object({
				submissions: t.Array(FormSubmissionList)
			}),
			detail: {
				description: 'Get list of submissions for a form'
			}
		}
	)

	.get(
		'/admin/form/:formId/submissions/:userId',
		() => {
			return {
				userId: 1,
				fields: '{}',
				createdAt: 1630000000
			}
		},
		{
			params: t.Object({
				formId: t.Integer(),
				userId: t.Integer()
			}),
			response: FormSubmission,
			detail: {
				description: 'Get a form submission'
			}
		}
	)

	.delete(
		'/admin/form/:formId/submissions/:userId',
		() => {
			return {
				statusCode: 200,
				message: 'Form submission deleted'
			}
		},
		{
			params: t.Object({
				formId: t.Integer(),
				userId: t.Integer()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: DeleteReturn,
			detail: {
				description: 'Delete a form submission'
			}
		}
	)

	.get(
		'/admin/org/:orgId/templates',
		() => {
			return {
				templates: [
					{
						templateId: 1,
						title: 'Template Title',
						description: 'Template Description',
						role: 'attendance'
					},
					{
						templateId: 2,
						title: 'Template Title',
						description: 'Template Description',
						role: 'attendance'
					}
				]
			}
		},
		{
			params: t.Object({
				orgId: t.Integer()
			}),
			response: t.Object({
				templates: t.Array(FormTemplatePreview)
			}),
			detail: {
				description: 'Get all form templates for an organisation'
			}
		}
	)

	.post(
		'/admin/org/:orgId/templates',
		() => {
			return {
				statusCode: 200,
				message: 'Template created successfully',
				templateId: 1
			}
		},
		{
			params: t.Object({
				orgId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				title: t.String(),
				description: t.String(),
				role: t.String(),
				canEditResponses: t.Boolean(),
				isPublic: t.Boolean(),
				fields: t.String()
			}),
			response: FormTemplateUpdateReturn,
			detail: {
				description: 'Create a form template'
			}
		}
	)

	.put(
		'/admin/org/:orgId/templates/:templateId',
		() => {
			return {
				statusCode: 200,
				message: 'Template updated successfully',
				templateId: 1
			}
		},
		{
			params: t.Object({
				orgId: t.Integer(),
				templateId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				title: t.String(),
				description: t.String(),
				role: t.String(),
				canEditResponses: t.Boolean(),
				isPublic: t.Boolean(),
				fields: t.String()
			}),
			response: FormTemplateUpdateReturn,
			detail: {
				description: 'Update a form template'
			}
		}
	)

	.delete(
		'/admin/org/:orgId/templates/:templateId',
		() => {
			return {
				statusCode: 200,
				message: 'Template deleted successfully'
			}
		},
		{
			params: t.Object({
				orgId: t.Integer(),
				templateId: t.Integer()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: DeleteReturn,
			detail: {
				description: 'Delete a form template'
			}
		}
	)

	.get(
		'/admin/org/:orgId/templates/:templateId',
		() => {
			return {
				templateId: 1,
				title: 'Template Title',
				description: 'Template Description',
				role: 'attendance',
				canEditResponses: true,
				isPublic: true,
				fields: '{}',
				createdAt: 1630000000
			}
		},
		{
			params: t.Object({
				orgId: t.Integer(),
				templateId: t.Integer()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: FormTemplate,
			detail: {
				description: 'Get a form template'
			}
		}
	)

	.post(
		'/admin/org/:orgId/templates/:templateId/createForm',
		() => {
			return {
				statusCode: 200,
				message: 'Form created successfully',
				formId: 1
			}
		},
		{
			params: t.Object({
				orgId: t.Integer(),
				templateId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				eventId: t.Integer()
			}),
			response: FormUpdateReturn,
			detail: {
				description: 'Create a form from a template'
			}
		}
	)

	.post(
		'/user',
		() => {
			return {
				statusCode: 200,
				message: 'User created successfully',
				userId: 1
			}
		},
		{
			body: t.Object({
				name: t.String(),
				email: t.String()
			}),
			response: UserUpdateReturn,
			detail: {
				description: 'Create a user'
			}
		}
	)

	.get(
		'/user/:userId',
		() => {
			return {
				userId: 1,
				name: 'User Name',
				email: 'User Email',
				avatarURI: 'User Avatar URI',
				createdAt: 1630000000
			}
		},
		{
			params: t.Object({
				userId: t.Integer()
			}),
			response: User,
			detail: {
				description: 'Get user details'
			}
		}
	)

	.put(
		'/user/:userId',
		() => {
			return {
				statusCode: 200,
				message: 'User updated',
				userId: 1
			}
		},
		{
			params: t.Object({
				userId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				name: t.String(),
				email: t.String(),
				avatarURI: t.String()
			}),
			response: UserUpdateReturn,
			detail: {
				description: 'Update user details'
			}
		}
	)

	.delete(
		'/user/:userId',
		() => {
			return {
				statusCode: 200,
				message: 'User deleted'
			}
		},
		{
			params: t.Object({
				userId: t.Integer()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: DeleteReturn,
			detail: {
				description: 'Delete user'
			}
		}
	)

	.get(
		'/user/:userId/adminOrgs',
		() => {
			return {
				organisations: [
					{
						orgId: 1,
						name: 'organisation Name',
						description: 'organisation Description',
						avatarURI: 'organisation Banner URI'
					},
					{
						orgId: 2,
						name: 'organisation Name',
						description: 'organisation Description',
						avatarURI: 'organisation Banner URI'
					}
				]
			}
		},
		{
			params: t.Object({
				userId: t.Integer()
			}),
			response: t.Object({
				organisations: t.Array(OrganisationPreview)
			}),
			detail: {
				description: 'Get all organisations a user is an admin of'
			}
		}
	)

	.get(
		'/user/:userId/notifications',
		() => {
			return {
				notifications: [
					{
						notificationId: 1,
						userId: 1,
						read: false,
						type: 'newEvent',
						eventId: 1,
						message: 'New event!!!!!!!!!!',
						createdAt: 1630000000
					},
					{
						notificationId: 2,
						userId: 2,
						read: false,
						type: 'newForm',
						formId: 1,
						message: 'New form!!!!!!!!!!',
						createdAt: 1630000000
					}
				]
			}
		},
		{
			params: t.Object({
				userId: t.Integer()
			}),
			response: t.Object({
				notifications: t.Array(Notification)
			}),
			detail: {
				description: 'Get all notifications for a user'
			}
		}
	)

	.post(
		'/user/:userId/notifications',
		() => {
			return {
				statusCode: 200,
				message: 'Notification created successfully',
				notificationId: 1
			}
		},
		{
			params: t.Object({
				userId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Integer(),
				type: t.String(),
				eventId: t.Optional(t.Integer()),
				formId: t.Optional(t.Integer()),
				message: t.String()
			}),
			response: NotificationUpdateReturn,
			detail: {
				description: 'Create a notification for a user'
			}
		}
	)

	.put(
		'/user/:userId/notifications/:notificationId/read',
		() => {
			return {
				statusCode: 200,
				message: 'Notification set to read',
				notificationId: 1
			}
		},
		{
			params: t.Object({
				userId: t.Integer(),
				notificationId: t.Integer()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: NotificationUpdateReturn,
			detail: {
				description: 'Mark a notification as read'
			}
		}
	)

	.get(
		'/user/:userId/notifications/unread',
		() => {
			return {
				unreadCount: 100
			}
		},
		{
			params: t.Object({
				userId: t.Integer()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: t.Object({
				unreadCount: t.Integer()
			}),
			detail: {
				description: 'Get unread notification count for a user'
			}
		}
	)

	.get(
		'/user/:userId/autofill/:fieldType',
		() => {
			return {
				value: 'z1234567'
			}
		},
		{
			params: t.Object({
				userId: t.Integer(),
				fieldType: t.String()
			}),
			response: t.Object({
				value: t.String()
			}),
			detail: {
				description: 'Get autofill data for a user'
			}
		}
	)

	.post(
		'/user/:userId/autofill/:fieldType',
		() => {
			return {
				statusCode: 200,
				message: 'Autofill field created',
				fieldType: 'studentId'
			}
		},
		{
			params: t.Object({
				userId: t.Integer(),
				fieldType: t.String()
			}),
			body: t.Object({
				token: t.String(),
				value: t.String()
			}),
			response: UserAutofillUpdateReturn,
			detail: {
				description: 'Create autofill field for a user'
			}
		}
	)

	.put(
		'/user/:userId/autofill/:fieldType',
		() => {
			return {
				statusCode: 200,
				message: 'Autofill field updated',
				fieldType: 'studentId'
			}
		},
		{
			params: t.Object({
				userId: t.Integer(),
				fieldType: t.String()
			}),
			body: t.Object({
				token: t.String(),
				value: t.String()
			}),
			response: UserAutofillUpdateReturn,
			detail: {
				description: 'Update autofill field for a user'
			}
		}
	)

	.delete(
		'/user/:userId/autofill/:fieldType',
		() => {
			return {
				statusCode: 200,
				message: 'Autofill field deleted',
				fieldType: 'studentId'
			}
		},
		{
			params: t.Object({
				userId: t.Integer(),
				fieldType: t.String()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: DeleteReturn,
			detail: {
				description: 'Delete autofill field for a user'
			}
		}
	)

	.get(
		'/user/:userId/notificationRules',
		() => {
			return {
				keywords: ['anime', 'gooning', 'fortnite']
			}
		},
		{
			params: t.Object({
				userId: t.Integer()
			}),
			response: t.Object({
				keywords: t.Array(t.String())
			}),
			detail: {
				description: 'Get all notification rules for a user'
			}
		}
	)

	.post(
		'/user/:userId/notificationRules',
		() => {
			return {
				statusCode: 200,
				message: 'Notification rule created',
				keyword: 'anime'
			}
		},
		{
			params: t.Object({
				userId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				keyword: t.String()
			}),
			response: NotificationRuleUpdateReturn,
			detail: {
				description: 'Create notification rule for a user'
			}
		}
	)

	.delete(
		'/user/:userId/notificationRules',
		() => {
			return {
				statusCode: 200,
				message: 'Notification rule deleted'
			}
		},
		{
			params: t.Object({
				userId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				keyword: t.String()
			}),
			response: DeleteReturn,
			detail: {
				description: 'Delete notification rule for a user'
			}
		}
	)

	.get(
		'/form/:formId',
		() => {
			return {
				formId: 1,
				eventId: 1,
				title: 'Form Title',
				description: 'Form Description',
				role: 'role',
				canEditResponses: true,
				isPublic: true,
				fields: '{}',
				createdAt: 1630000000
			}
		},
		{
			params: t.Object({
				formId: t.Integer()
			}),
			response: Form,
			detail: {
				description: 'Get form details by id'
			}
		}
	)

	.post(
		'/form/:formId',
		() => {
			return {
				statusCode: 200,
				message: 'Form submitted successfully',
				userId: 1
			}
		},
		{
			params: t.Object({
				formId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Integer(),
				fields: t.String()
			}),
			response: FormSubmissionReturn,
			detail: {
				description: 'Create a form submission'
			}
		}
	)

	.get(
		'/form/:formId/:userId',
		() => {
			return {
				userId: 1,
				fields: '{}',
				createdAt: 1630000000
			}
		},
		{
			params: t.Object({
				formId: t.Integer(),
				userId: t.Integer()
			}),
			response: FormSubmission,
			detail: {
				description: 'Get form submission details of a user'
			}
		}
	)

	.put(
		'/form/:formId/:userId',
		() => {
			return {
				statusCode: 200,
				message: 'Form updated successfully',
				userId: 1
			}
		},
		{
			params: t.Object({
				formId: t.Integer(),
				userId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				fields: t.String()
			}),
			response: FormSubmissionReturn,
			detail: {
				description: 'Update a form submission'
			}
		}
	)

	.get(
		'/user/:userId/templateAutofill/:templateId',
		() => {
			return {
				fields: [
					{
						templateId: 1,
						templateFieldId: 1,
						value: 'aaaa'
					},
					{
						templateId: 1,
						templateFieldId: 2,
						value: 'abc'
					}
				]
			}
		},
		{
			params: t.Object({
				userId: t.Integer(),
				templateId: t.Integer()
			}),
			response: t.Object({
				fields: t.Array(FormTemplateFieldAutofill)
			}),
			detail: {
				description: 'Get autofill data for a user'
			}
		}
	)

	.post(
		'/user/:userId/templateAutofill/:templateId',
		() => {
			return {
				statusCode: 200,
				message: 'Template autofill field created',
				templateFieldId: 1
			}
		},
		{
			params: t.Object({
				userId: t.Integer(),
				templateId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				templateFieldId: t.Integer(),
				value: t.String()
			}),
			response: FormTemplateFieldAutofillUpdateReturn,
			detail: {
				description: 'Create autofill field for a user'
			}
		}
	)

	.put(
		'/user/:userId/templateAutofill/:templateId/:templateFieldId',
		() => {
			return {
				statusCode: 200,
				message: 'Template autofill field updated',
				templateFieldId: 1
			}
		},
		{
			params: t.Object({
				userId: t.Integer(),
				templateId: t.Integer(),
				templateFieldId: t.Integer()
			}),
			body: t.Object({
				token: t.String(),
				value: t.String()
			}),
			response: FormTemplateFieldAutofillUpdateReturn,
			detail: {
				description: 'Update template autofill field for a user'
			}
		}
	)

	.delete(
		'/user/:userId/templateAutofill/:templateId/:templateFieldId',
		() => {
			return {
				statusCode: 200,
				message: 'Template autofill field deleted'
			}
		},
		{
			params: t.Object({
				userId: t.Integer(),
				templateId: t.Integer(),
				templateFieldId: t.Integer()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: DeleteReturn,
			detail: {
				description: 'Delete template autofill field for a user'
			}
		}
	)

	.listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
