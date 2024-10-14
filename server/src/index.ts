import 'dotenv/config'
import { drizzle } from 'drizzle-orm/connect'

import { Elysia, t } from 'elysia'
import {
	Event,
	EventUpdateReturn,
	EventPreview,
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
	NotificationRuleUpdateReturn
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
	.get('/', () => 'Hello Elysia')

	.get(
		'/events',
		() => {
			return [
				{
					eventId: 1,
					orgId: 1,
					title: 'Event Title',
					timeStart: 1630000000,
					timeEnd: 1630000000,
					location: 'Event Location',
					bannerURI: 'Event Banner URI'
				},
				{
					eventId: 2,
					orgId: 2,
					title: 'Event Title',
					timeStart: 1630000000,
					timeEnd: 1630000000,
					location: 'Event Location',
					bannerURI: 'Event Banner URI'
				}
			]
		},
		{
			response: t.Array(EventPreview),
			detail: {
				description: 'Get all events'
			}
		}
	)

	.get(
		'/events/spotlight',
		() => {
			return [
				{
					eventId: 1,
					orgId: 1,
					title: 'Event Title',
					timeStart: 1630000000,
					timeEnd: 1630000000,
					location: 'Event Location',
					bannerURI: 'Event Banner URI'
				},
				{
					eventId: 2,
					orgId: 2,
					title: 'Event Title',
					timeStart: 1630000000,
					timeEnd: 1630000000,
					location: 'Event Location',
					bannerURI: 'Event Banner URI'
				}
			]
		},
		{
			response: t.Array(EventPreview),
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
			return [
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
		},
		{
			params: t.Object({
				eventId: t.Integer()
			}),
			response: t.Array(FormDetails),
			detail: {
				description: 'Get all forms for an event'
			}
		}
	)

	.get(
		'/orgs',
		() => {
			return [
				{
					orgId: 1,
					name: 'Organization Name',
					description: 'Organization Description',
					avatarURI: 'Organization Banner URI'
				},
				{
					orgId: 2,
					name: 'Organization Name',
					description: 'Organization Description',
					avatarURI: 'Organization Banner URI'
				}
			]
		},
		{
			response: t.Array(OrganisationPreview),
			detail: {
				description: 'Get all organizations'
			}
		}
	)

	.get(
		'/orgs/:orgId',
		() => {
			return {
				orgId: 1,
				name: 'Organization Name',
				description: 'Organization Description',
				avatarURI: 'Organization Banner URI',
				bannerURI: 'Organization Banner URI',
				createdAt: 1630000000
			}
		},
		{
			params: t.Object({
				orgId: t.Integer()
			}),
			response: Organisation,
			detail: {
				description: 'Get full organization details by id'
			}
		}
	)

	.get(
		'/orgs/:orgId/events',
		() => {
			return [
				{
					eventId: 1,
					orgId: 1,
					title: 'Event Title',
					timeStart: 1630000000,
					timeEnd: 1630000000,
					location: 'Event Location',
					bannerURI: 'Event Banner URI'
				},
				{
					eventId: 2,
					orgId: 2,
					title: 'Event Title',
					timeStart: 1630000000,
					timeEnd: 1630000000,
					location: 'Event Location',
					bannerURI: 'Event Banner URI'
				}
			]
		},
		{
			params: t.Object({
				orgId: t.String()
			}),
			response: t.Array(EventPreview),
			detail: {
				description: 'Get all events for an organization'
			}
		}
	)

	.post(
		'/orgs/:orgId/followers',
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
		'/orgs/:orgId/followers',
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
		'/admin/orgs',
		() => {
			return {
				statusCode: 200,
				message: 'Organization created successfully',
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
				description: 'Create an organization'
			}
		}
	)

	.put(
		'/admin/orgs/:orgId',
		() => {
			return {
				statusCode: 200,
				message: 'Organization updated successfully',
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
				description: 'Update an organization'
			}
		}
	)

	.delete(
		'/admin/orgs/:orgId',
		() => {
			return {
				statusCode: 200,
				message: 'Organization deleted successfully'
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
				description: 'Delete an organization'
			}
		}
	)

	.get(
		'/admin/orgs/:orgId/admins',
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
				description: 'Get all administrators of an organization'
			}
		}
	)

	.post(
		'/admin/orgs/:orgId/admins',
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
				description: 'Add a role to a user in an organization'
			}
		}
	)

	.delete(
		'/admin/orgs/:orgId/admins',
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
				description: 'Remove a role from a user in an organization'
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
			return [
				{
					orgId: 1,
					name: 'Organization Name',
					description: 'Organization Description',
					avatarURI: 'Organization Banner URI'
				},
				{
					orgId: 2,
					name: 'Organization Name',
					description: 'Organization Description',
					avatarURI: 'Organization Banner URI'
				}
			]
		},
		{
			params: t.Object({
				userId: t.Integer()
			}),
			response: t.Array(OrganisationPreview),
			detail: {
				description: 'Get all organizations a user is an admin of'
			}
		}
	)

	.get(
		'/user/:userId/notifications',
		() => {
			return [
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
		},
		{
			params: t.Object({
				userId: t.Integer()
			}),
			response: t.Array(Notification),
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
				read: t.Boolean(),
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

	.listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
