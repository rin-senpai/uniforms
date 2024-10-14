import 'dotenv/config'
import { drizzle } from 'drizzle-orm/connect'

import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import {
	Event,
	EventCreateReturn,
	FormDetails,
	Organisation,
	OrganisationPreview,
	OrganisationCreateReturn,
	UserRole,
	UserCreateReturn,
	User,
	StatusCodeReturn,
	Notification,
	NotificationCreateReturn,
	Form,
	FormSubmission,
	FormCreateReturn,
	FormSubmissionList,
	FormTemplatePreview,
	FormTemplateCreateReturn,
	FormTemplateFieldAutofill,
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
				statusCode: 200,
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
				statusCode: t.Number(),
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
				statusCode: 200,
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
				statusCode: t.Number(),
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
				statusCode: 200
			}
		},
		{
			body: t.Object({
				token: t.String(),
				eventId: t.Number()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Add spotlight event'
			}
		}
	)

	.delete(
		'/events/spotlight',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			body: t.Object({
				token: t.String(),
				eventId: t.Number()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Remove spotlight event'
			}
		}
	)

	.get(
		'/events/:eventId',
		() => {
			return {
				statusCode: 200,
				event: {
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
			}
		},
		{
			params: t.Object({
				eventId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				event: Event
			}),
			detail: {
				description: 'Get event by id'
			}
		}
	)

	.post(
		'/events/:eventId/followers',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				eventId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Number()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Adds a user to followers of an event'
			}
		}
	)

	.delete(
		'/events/:eventId/followers',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				eventId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Number()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Removes a user from followers of an event'
			}
		}
	)

	.get(
		'/events/:eventId/forms',
		() => {
			return {
				statusCode: 200,
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
				eventId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				forms: t.Array(FormDetails)
			}),
			detail: {
				description: 'Get all forms for an event'
			}
		}
	)

	.get(
		'/orgs',
		() => {
			return {
				statusCode: 200,
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
				statusCode: t.Number(),
				organisations: t.Array(OrganisationPreview)
			}),
			detail: {
				description: 'Get all organisations'
			}
		}
	)

	.get(
		'/orgs/:orgId',
		() => {
			return {
				statusCode: 200,
				organisation: {
					orgId: 1,
					name: 'organisation Name',
					description: 'organisation Description',
					avatarURI: 'organisation Banner URI',
					bannerURI: 'organisation Banner URI',
					createdAt: 1630000000
				}
			}
		},
		{
			params: t.Object({
				orgId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				organisation: Organisation
			}),
			detail: {
				description: 'Get full organisation details by id'
			}
		}
	)

	.get(
		'/orgs/:orgId/events',
		() => {
			return {
				statusCode: 200,
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
				statusCode: t.Number(),
				events: t.Array(Event)
			}),
			detail: {
				description: 'Get all events for an organisation'
			}
		}
	)

	.get(
		'/orgs/:orgId/followers',
		() => {
			return {
				statusCode: 200,
				followerCount: 1000
			}
		},
		{
			params: t.Object({
				eventId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: t.Object({
				statusCode: t.Number(),
				followerCount: t.Number()
			}),
			detail: {
				description: 'Get follower count of an organisation'
			}
		}
	)

	.post(
		'/orgs/:orgId/followers',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				orgId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Number()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Adds a user to followers of an organisation'
			}
		}
	)

	.delete(
		'/orgs/:orgId/followers',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				orgId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Number(),
				role: t.String()
			}),
			response: StatusCodeReturn,
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
				eventId: 1
			}
		},
		{
			body: t.Object({
				token: t.String(),
				organisationId: t.Number(),
				title: t.String(),
				description: t.String(),
				isPublic: t.Boolean(),
				timeStart: t.Number(),
				timeEnd: t.Number(),
				location: t.String(),
				bannerURI: t.String()
			}),
			response: EventCreateReturn,
			detail: {
				description: 'Create an event'
			}
		}
	)

	.put(
		'/admin/events/:eventId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				eventId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				title: t.String(),
				description: t.String(),
				isPublic: t.Boolean(),
				timeStart: t.Number(),
				timeEnd: t.Number(),
				location: t.String(),
				bannerURI: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Update an event'
			}
		}
	)

	.delete(
		'/admin/events/:eventId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				eventId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: StatusCodeReturn,
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
				eventId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: t.Object({
				statusCode: t.Number(),
				followerCount: t.Number()
			}),
			detail: {
				description: 'Get follower count of an event'
			}
		}
	)

	.post(
		'/admin/orgs',
		() => {
			return {
				statusCode: 200,
				orgId: 1
			}
		},
		{
			body: t.Object({
				token: t.String(),
				name: t.String(),
				description: t.String(),
				avatarURI: t.String(),
				bannerURI: t.String()
			}),
			response: OrganisationCreateReturn,
			detail: {
				description: 'Create an organisation'
			}
		}
	)

	.put(
		'/admin/orgs/:orgId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				orgId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				name: t.String(),
				description: t.String(),
				avatarURI: t.String(),
				bannerURI: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Update an organisation'
			}
		}
	)

	.delete(
		'/admin/orgs/:orgId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				orgId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Delete an organisation'
			}
		}
	)

	.get(
		'/admin/orgs/:orgId/admins',
		() => {
			return {
				statusCode: 200,
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
				orgId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: t.Object({
				statusCode: t.Number(),
				managers: t.Array(UserRole),
				moderators: t.Array(UserRole)
			}),
			detail: {
				description: 'Get all administrators of an organisation'
			}
		}
	)

	.post(
		'/admin/orgs/:orgId/admins',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				orgId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Number(),
				role: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Add a role to a user in an organisation'
			}
		}
	)

	.delete(
		'/admin/orgs/:orgId/admins',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				orgId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Number(),
				role: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Remove a role from a user in an organisation'
			}
		}
	)

	.post(
		'/admin/forms',
		() => {
			return {
				statusCode: 200,
				formId: 1
			}
		},
		{
			body: t.Object({
				token: t.String(),
				eventId: t.Number(),
				title: t.String(),
				description: t.String(),
				role: t.String(),
				canEditResponses: t.Boolean(),
				isPublic: t.Boolean(),
				fields: t.String()
			}),
			response: FormCreateReturn,
			detail: {
				description: 'Create a form'
			}
		}
	)

	.put(
		'/admin/forms/:formId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				formId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				eventId: t.Number(),
				title: t.String(),
				description: t.String(),
				role: t.String(),
				canEditResponses: t.Boolean(),
				isPublic: t.Boolean(),
				fields: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Update a form'
			}
		}
	)

	.delete(
		'/admin/forms/:formId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				formId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Delete a form'
			}
		}
	)

	.get(
		'/admin/forms/:formId',
		() => {
			return {
				statusCode: 200,
				form: {
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
			}
		},
		{
			params: t.Object({
				formId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				form: Form
			}),
			detail: {
				description: 'Get a form'
			}
		}
	)

	.get(
		'/admin/forms/:formId/submissions',
		() => {
			return {
				statusCode: 200,
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
				formId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				submissions: t.Array(FormSubmissionList)
			}),
			detail: {
				description: 'Get list of submissions for a form'
			}
		}
	)

	.get(
		'/admin/forms/:formId/submissions/:userId',
		() => {
			return {
				statusCode: 200,
				submission: {
					userId: 1,
					fields: '{}',
					createdAt: 1630000000
				}
			}
		},
		{
			params: t.Object({
				formId: t.Number(),
				userId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				submission: FormSubmission
			}),
			detail: {
				description: 'Get a form submission'
			}
		}
	)

	.delete(
		'/admin/forms/:formId/submissions/:userId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				formId: t.Number(),
				userId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Delete a form submission'
			}
		}
	)

	.get(
		'/admin/orgs/:orgId/templates',
		() => {
			return {
				statusCode: 200,
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
				orgId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				templates: t.Array(FormTemplatePreview)
			}),
			detail: {
				description: 'Get all form templates for an organisation'
			}
		}
	)

	.post(
		'/admin/orgs/:orgId/templates',
		() => {
			return {
				statusCode: 200,
				templateId: 1
			}
		},
		{
			params: t.Object({
				orgId: t.Number()
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
			response: FormTemplateCreateReturn,
			detail: {
				description: 'Create a form template'
			}
		}
	)

	.put(
		'/admin/orgs/:orgId/templates/:templateId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				orgId: t.Number(),
				templateId: t.Number()
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
			response: StatusCodeReturn,
			detail: {
				description: 'Update a form template'
			}
		}
	)

	.delete(
		'/admin/orgs/:orgId/templates/:templateId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				orgId: t.Number(),
				templateId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Delete a form template'
			}
		}
	)

	.get(
		'/admin/orgs/:orgId/templates/:templateId',
		() => {
			return {
				statusCode: 200,
				template: {
					templateId: 1,
					title: 'Template Title',
					description: 'Template Description',
					role: 'attendance',
					canEditResponses: true,
					isPublic: true,
					fields: '{}',
					createdAt: 1630000000
				}
			}
		},
		{
			params: t.Object({
				orgId: t.Number(),
				templateId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: t.Object({
				statusCode: t.Number(),
				template: FormTemplate
			}),
			detail: {
				description: 'Get a form template'
			}
		}
	)

	.post(
		'/admin/orgs/:orgId/templates/:templateId/createForm',
		() => {
			return {
				statusCode: 200,
				formId: 1
			}
		},
		{
			params: t.Object({
				orgId: t.Number(),
				templateId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				eventId: t.Number()
			}),
			response: FormCreateReturn,
			detail: {
				description: 'Create a form from a template'
			}
		}
	)

	.post(
		'/users',
		() => {
			return {
				statusCode: 200,
				userId: 1
			}
		},
		{
			body: t.Object({
				name: t.String(),
				email: t.String()
			}),
			response: UserCreateReturn,
			detail: {
				description: 'Create a user'
			}
		}
	)

	.get(
		'/users/:userId',
		() => {
			return {
				statusCode: 200,
				user: {
					userId: 1,
					name: 'User Name',
					email: 'User Email',
					avatarURI: 'User Avatar URI',
					createdAt: 1630000000
				}
			}
		},
		{
			params: t.Object({
				userId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				user: User
			}),
			detail: {
				description: 'Get user details'
			}
		}
	)

	.put(
		'/users/:userId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				userId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				name: t.String(),
				email: t.String(),
				avatarURI: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Update user details'
			}
		}
	)

	.delete(
		'/users/:userId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				userId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Delete user'
			}
		}
	)

	.get(
		'/users/:userId/adminOrgs',
		() => {
			return {
				statusCode: 200,
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
				userId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				organisations: t.Array(OrganisationPreview)
			}),
			detail: {
				description: 'Get all organisations a user is an admin of'
			}
		}
	)

	.get(
		'/users/:userId/notifications',
		() => {
			return {
				statusCode: 200,
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
				userId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				notifications: t.Array(Notification)
			}),
			detail: {
				description: 'Get all notifications for a user'
			}
		}
	)

	.post(
		'/users/:userId/notifications',
		() => {
			return {
				statusCode: 200,
				notificationId: 1
			}
		},
		{
			params: t.Object({
				userId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Number(),
				type: t.String(),
				eventId: t.Optional(t.Number()),
				formId: t.Optional(t.Number()),
				message: t.String()
			}),
			response: NotificationCreateReturn,
			detail: {
				description: 'Create a notification for a user'
			}
		}
	)

	.put(
		'/users/:userId/notifications/:notificationId/read',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				userId: t.Number(),
				notificationId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Mark a notification as read'
			}
		}
	)

	.get(
		'/users/:userId/notifications/unread',
		() => {
			return {
				statusCode: 200,
				unreadCount: 100
			}
		},
		{
			params: t.Object({
				userId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: t.Object({
				statusCode: t.Number(),
				unreadCount: t.Number()
			}),
			detail: {
				description: 'Get unread notification count for a user'
			}
		}
	)

	.get(
		'/users/:userId/autofill/:fieldType',
		() => {
			return {
				statusCode: 200,
				value: 'z1234567'
			}
		},
		{
			params: t.Object({
				userId: t.Number(),
				fieldType: t.String()
			}),
			response: t.Object({
				statusCode: t.Number(),
				value: t.String()
			}),
			detail: {
				description: 'Get autofill data for a user'
			}
		}
	)

	.post(
		'/users/:userId/autofill/:fieldType',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				userId: t.Number(),
				fieldType: t.String()
			}),
			body: t.Object({
				token: t.String(),
				value: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Create autofill field for a user'
			}
		}
	)

	.put(
		'/users/:userId/autofill/:fieldType',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				userId: t.Number(),
				fieldType: t.String()
			}),
			body: t.Object({
				token: t.String(),
				value: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Update autofill field for a user'
			}
		}
	)

	.delete(
		'/users/:userId/autofill/:fieldType',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				userId: t.Number(),
				fieldType: t.String()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Delete autofill field for a user'
			}
		}
	)

	.get(
		'/users/:userId/notificationRules',
		() => {
			return {
				statusCode: 200,
				keywords: ['anime', 'gooning', 'fortnite']
			}
		},
		{
			params: t.Object({
				userId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				keywords: t.Array(t.String())
			}),
			detail: {
				description: 'Get all notification rules for a user'
			}
		}
	)

	.post(
		'/users/:userId/notificationRules',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				userId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				keyword: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Create notification rule for a user'
			}
		}
	)

	.delete(
		'/users/:userId/notificationRules',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				userId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				keyword: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Delete notification rule for a user'
			}
		}
	)

	.get(
		'/forms/:formId',
		() => {
			return {
				statusCode: 200,
				form: {
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
			}
		},
		{
			params: t.Object({
				formId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				form: Form
			}),
			detail: {
				description: 'Get form details by id'
			}
		}
	)

	.post(
		'/forms/:formId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				formId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				userId: t.Number(),
				fields: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Create a form submission'
			}
		}
	)

	.get(
		'/forms/:formId/:userId',
		() => {
			return {
				statusCode: 200,
				submission: {
					userId: 1,
					fields: '{}',
					createdAt: 1630000000
				}
			}
		},
		{
			params: t.Object({
				formId: t.Number(),
				userId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				submission: FormSubmission
			}),
			detail: {
				description: 'Get form submission details of a user'
			}
		}
	)

	.put(
		'/forms/:formId/:userId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				formId: t.Number(),
				userId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				fields: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Update a form submission'
			}
		}
	)

	.get(
		'/users/:userId/templateAutofill/:templateId',
		() => {
			return {
				statusCode: 200,
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
				userId: t.Number(),
				templateId: t.Number()
			}),
			response: t.Object({
				statusCode: t.Number(),
				fields: t.Array(FormTemplateFieldAutofill)
			}),
			detail: {
				description: 'Get autofill data for a user'
			}
		}
	)

	.post(
		'/users/:userId/templateAutofill/:templateId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				userId: t.Number(),
				templateId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				templateFieldId: t.Number(),
				value: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Create autofill field for a user'
			}
		}
	)

	.put(
		'/users/:userId/templateAutofill/:templateId/:templateFieldId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				userId: t.Number(),
				templateId: t.Number(),
				templateFieldId: t.Number()
			}),
			body: t.Object({
				token: t.String(),
				value: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Update template autofill field for a user'
			}
		}
	)

	.delete(
		'/users/:userId/templateAutofill/:templateId/:templateFieldId',
		() => {
			return {
				statusCode: 200
			}
		},
		{
			params: t.Object({
				userId: t.Number(),
				templateId: t.Number(),
				templateFieldId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: StatusCodeReturn,
			detail: {
				description: 'Delete template autofill field for a user'
			}
		}
	)

	.listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
