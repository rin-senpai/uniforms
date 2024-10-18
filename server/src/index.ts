import 'dotenv/config'
import { drizzle } from 'drizzle-orm/connect'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { eq, lte, gt, and, or } from 'drizzle-orm'

import { Elysia, t, error } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { EmptyReturn, EventCreateReturn, OrganisationCreateReturn, UserCreateReturn, FormCreateReturn, FormTemplatePreview, FormTemplateCreateReturn, FormTemplateFieldAutofill, FormTemplate, Event } from './interface'

import { errorMap } from './errorCodes'

import { model } from './db/model'
import { users, forms, notifications, events, spotlights, eventFollows, organisations, organisationRoles, userAutofills, notificationRules, formSubmissions } from './db/schema'

// get types from db for route params and responses:
// const { User } = model.insert (or select)
// see https://elysiajs.com/recipe/drizzle on using the model
//
// for updating the db:
// await db.insert(Users).values(['sdijfsoei', 'seoifn']) etc
// see https://orm.drizzle.team/docs/

const db = await drizzle('bun:sqlite', process.env.DB_FILE_NAME!)

// Run the following command after any schema changes
// bunx drizzle-kit generate
try {
	migrate(db, { migrationsFolder: './drizzle' })
	console.log('Migrations applied successfully')
} catch (error) {
	console.error('Migration failed:', error)
}

function convertTimesToUnix(objectsArray: any[]): Event[] {
    return objectsArray.map(obj => {
        return {
            ...obj,
            timeStart: Math.floor(new Date(obj.timeStart).getTime() / 1000),
            timeEnd: Math.floor(new Date(obj.timeEnd).getTime() / 1000)
        };
    });
}

const app = new Elysia()
	.use(swagger())
	.get('/', () => 'Hello Elysia')

	.get(
		'/events',
		async () => {
			const currentTime = new Date()

			const upcomingEvents = await db.select().from(events).where(gt(events.timeEnd, currentTime))
			return { events: convertTimesToUnix(upcomingEvents) }
		},
		{
			response: t.Object({
				events: t.Array(t.Object(model.select.event))
			}),
			detail: {
				description: 'Get all events'
			}
		}
	)

	.get(
		'/events/spotlight',
		async () => {
			const currentTime = new Date()

			const activeSpotlights = await db
				.select()
				.from(spotlights)
				.where(and(gt(spotlights.week, currentTime), lte(spotlights.week, new Date(currentTime.getTime() + 7 * 24 * 60 * 60 * 1000))))

			return { events: activeSpotlights }
		},
		{
			response: t.Object({
				events: t.Array(t.Object(model.select.spotlight))
			}),
			detail: {
				description: 'Get all spotlight events'
			}
		}
	)

	.post(
		'/events/spotlight',
		async ({ body }) => {
			const { token, eventId, startDate } = body

			// // Check if user is an admin
			// const user = await db.select().from(users).where(eq(users.token, token)).first()
			// if (!user || user.role !== UserRole.Admin) {
			// 	return { statusCode: 403 }
			// }

			// // Check if event is already spotlighted
			// const existingSpotlight = await db.select().from(spotlights).where(eq(spotlights.eventId, eventId)).first()
			// if (existingSpotlight) {
			// 	return { statusCode: 409 }
			// }

			// Add event to spotlight
			await db.insert(spotlights).values({ eventId, week: startDate })

			return { statusCode: 200 }
		},
		{
			body: t.Object({
				token: t.String(),
				eventId: t.Number(),
				startDate: t.Date()
			}),
			response: EmptyReturn,
			detail: {
				description: 'Add spotlight event'
			}
		}
	)

	.delete(
		'/events/spotlight',
		async ({ body }) => {
			const { token, eventId } = body

			// // Check if user is an admin
			// const user = await db.select().from(users).where(eq(users.token, token)).first()
			// if (!user || user.role !== UserRole.Admin) {
			// 	return { statusCode: 403 }
			// }

			// // Check if event exists
			// const event = await db.select().from(events).where(eq(events.eventId, eventId)).first()
			// if (!event) {
			// 	return { statusCode: 404 }
			// }

			// // Check if event is spotlighted
			// const existingSpotlight = await db.select().from(spotlights).where(eq(spotlights.eventId, eventId)).first()
			// if (!existingSpotlight) {
			// 	return { statusCode: 404 }
			// }

			// Remove event from spotlight
			await db.delete(spotlights).where(eq(spotlights.eventId, eventId))

			return {}
		},
		{
			body: t.Object({
				token: t.String(),
				eventId: t.Number()
			}),
			response: EmptyReturn,
			detail: {
				description: 'Remove spotlight event'
			}
		}
	)

	.get(
		'/events/:eventId',
		async ({ params }) => {
			const { eventId } = params

			const event = await db.select().from(events).where(eq(events.id, eventId))
			// if (!event) {
			// 	return error(404, errorMap.get(404))
			// }

			const convertedEvents = convertTimesToUnix(event)

			return { event: convertedEvents[0] }
		},
		{
			params: t.Object({
				eventId: model.select.event.id
			}),
			response: t.Object({
				event: t.Object(model.select.event)
			}),
			detail: {
				description: 'Get event by id'
			}
		}
	)

	.post(
		'/events/:eventId/followers',
		async ({ params, body }) => {
			const { eventId } = params
			const { token, userId } = body

			// // Check if event exists
			// const event = await db.select().from(events).where(eq(events.eventId, eventId)).first()
			// if (!event) {
			//  return { statusCode: 404 }
			// }

			// Check if user exists
			const user = await db.select().from(users).where(eq(users.id, userId))
			if (user.length === 0) {
				return error(404, errorMap.get(404))
			}

			// // Check if user is already following the event
			// const existingFollower = await db.select().from(followers).where(and(eq(followers.eventId, eventId), eq(followers.userId, userId))).first()
			// if (existingFollower) {
			//  return { statusCode: 409 }
			// }

			await db.insert(eventFollows).values({ eventId, userId })
			return {}
		},
		{
			params: t.Object({
				eventId: model.select.event.id
			}),
			body: t.Object({
				token: t.String(),
				userId: model.select.user.id
			}),
			response: EmptyReturn,
			detail: {
				description: 'Adds a user to followers of an event'
			}
		}
	)

	.delete(
		'/events/:eventId/followers',
		async ({ params, body }) => {
			const { eventId } = params
			const { token, userId } = body

			// // Check if event exists
			// const event = await db.select().from(events).where(eq(events.eventId, eventId)).first()
			// if (!event) {
			//   return { statusCode: 404 }
			// }
			// // Check if user exists
			// const user = await db.select().from(users).where(eq(users.userId, userId)).first()
			// if (!user) {
			//   return { statusCode: 404 }
			// }

			await db.delete(eventFollows).where(and(eq(eventFollows.eventId, eventId), eq(eventFollows.userId, userId)))
		},
		{
			params: t.Object({
				eventId: model.select.event.id
			}),
			body: t.Object({
				token: t.String(),
				userId: model.select.user.id
			}),
			response: EmptyReturn,
			detail: {
				description: 'Removes a user from followers of an event'
			}
		}
	)

	.get(
		'/events/:eventId/forms',
		async ({ params }) => {
			const res = await db.select().from(forms).where(eq(forms.eventId, params.eventId))

			return {
				forms: res
			}
		},
		{
			params: t.Object({
				eventId: model.select.form.eventId
			}),
			response: t.Object({
				forms: t.Array(t.Object(model.select.form))
			}),
			detail: {
				description: 'Get all forms for an event'
			}
		}
	)

	.get(
		'/orgs',
		async () => {
			const organisationList = await db.select().from(organisations)

			return { organisations: organisationList }
		},
		{
			response: t.Object({
				organisations: t.Array(t.Object(model.select.organisation))
			}),
			detail: {
				description: 'Get all organisations'
			}
		}
	)

	.get(
		'/orgs/:orgId',
		async ({ params }) => {
			const { orgId } = params

			const organisation = await db.select().from(organisations).where(eq(organisations.id, orgId))
			// if (!organisation) {
			// 	return error(404, errorMap.get(404))
			// }

			return { organisation: organisation[0] }
		},
		{
			params: t.Object({
				orgId: model.select.organisation.id
			}),
			response: t.Object({
				organisation: t.Object(model.select.organisation)
			}),
			detail: {
				description: 'Get full organisation details by id'
			}
		}
	)

	.get(
		'/orgs/:orgId/events',
		async ({ params }) => {
			const { orgId } = params

			const eventsList = await db.select().from(events).where(eq(events.organisationId, orgId))

			return { events: convertTimesToUnix(eventsList) }
		},
		{
			params: t.Object({
				orgId: model.select.organisation.id
			}),
			response: t.Object({
				events: t.Array(t.Object(model.select.event))
			}),
			detail: {
				description: 'Get all events for an organisation'
			}
		}
	)

	.get(
		'/orgs/:orgId/followers',
		async ({ params }) => {
			const { orgId } = params

			const followerCount = await db.select().from(eventFollows).where(eq(eventFollows.eventId, orgId))

			return { followerCount: followerCount.length }
		},
		{
			params: t.Object({
				orgId: model.select.organisation.id
			}),
			body: t.Object({
				token: t.String()
			}),
			response: t.Object({
				followerCount: t.Number()
			}),
			detail: {
				description: 'Get follower count of an organisation'
			}
		}
	)

	.post(
		'/orgs/:orgId/followers',
		async ({ params, body }) => {
			const { orgId } = params
			const { token, userId } = body

			// Check if organisation exists
			const organisation = await db.select().from(organisations).where(eq(organisations.id, orgId))
			if (organisation.length === 0) {
				return error(404, errorMap.get(404))
			}

			// Check if user exists
			const user = await db.select().from(users).where(eq(users.id, userId))
			if (user.length === 0) {
				return error(404, errorMap.get(404))
			}

			// // Check if user is already following the organisation
			// const existingFollower = await db.select().from(followers).where(and(eq(followers.orgId, orgId), eq(followers.userId, userId))).first()
			// if (existingFollower) {
			// 	return { statusCode: 409 }
			// }

			await db.insert(organisationRoles).values({ organisationId: orgId, userId: userId, role: 'follower' })
			return {}
		},
		{
			params: t.Object({
				orgId: model.select.organisation.id
			}),
			body: t.Object({
				token: t.String(),
				userId: model.select.user.id
			}),
			response: EmptyReturn,
			detail: {
				description: 'Adds a user to followers of an organisation'
			}
		}
	)

	.delete(
		'/orgs/:orgId/followers',
		async ({ params, body }) => {
			const { orgId } = params
			const { token, userId } = body

			// Check if organisation exists
			const organisation = await db.select().from(organisations).where(eq(organisations.id, orgId))
			if (organisation.length === 0) {
				return error(404, errorMap.get(404))
			}

			// Check if user exists
			const user = await db.select().from(users).where(eq(users.id, userId))
			if (user.length === 0) {
				return error(404, errorMap.get(404))
			}

			await db.delete(organisationRoles).where(and(eq(organisationRoles.organisationId, orgId), eq(organisationRoles.userId, userId), eq(organisationRoles.role, 'follower')))
			return {}
		},
		{
			params: t.Object({
				orgId: model.select.organisation.id
			}),
			body: t.Object({
				token: t.String(),
				userId: model.select.user.id
			}),
			response: EmptyReturn,
			detail: {
				description: 'Removes a user from followers of an organisation'
			}
		}
	)

	.post(
		'/admin/events',
		async ({ body }) => {
			const newEventObject = { 
				"token": "1",
				"id": body.id,
				"organisationId": body.organisationId,
				"title": body.title,
				"description": body.description,
				"isPublic": body.isPublic,
				"timeStart": new Date(body.timeStart * 1000),
				"timeEnd": new Date(body.timeEnd * 1000),
				"location": body.location,
				"bannerURI": body.bannerURI
			}
			const newEvent = await db.insert(events).values(newEventObject).returning()
			return {
				eventId: newEvent[0].id
			}
		},
		{
			body: t.Object(model.insert.event),
			response: EventCreateReturn,
			detail: {
				description: 'Create an event'
			}
		}
	)

	.put(
		'/admin/events/:eventId',
		async ({ params, body }) => {
			const { eventId } = params

			const updatedEventObject = { 
				"token": "1",
				"id": body.id,
				"organisationId": body.organisationId,
				"title": body.title,
				"description": body.description,
				"isPublic": body.isPublic,
				"timeStart": new Date(body.timeStart * 1000),
				"timeEnd": new Date(body.timeEnd * 1000),
				"location": body.location,
				"bannerURI": body.bannerURI
			}
			await db.update(events).set(updatedEventObject).where(eq(events.id, eventId))

			return {}
		},
		{
			params: t.Object({
				eventId: model.select.event.id
			}),
			body: t.Object(model.insert.event),
			response: EmptyReturn,
			detail: {
				description: 'Update an event'
			}
		}
	)

	.delete(
		'/admin/events/:eventId',
		async ({ params }) => {
			const { eventId } = params

			await db.delete(events).where(eq(events.id, eventId))

			return {}
		},
		{
			params: t.Object({
				eventId: model.select.event.id
			}),
			body: t.Object({
				token: t.String(),
				userId: model.select.user.id
			}),
			response: EmptyReturn,
			detail: {
				description: 'Delete an event'
			}
		}
	)

	.get(
		'/admin/events/:eventId/followers',
		async ({ params }) => {
			const { eventId } = params

			const followerCount = await db.select().from(eventFollows).where(eq(eventFollows.eventId, eventId))

			return { followerCount: followerCount.length }
		},
		{
			params: t.Object({
				eventId: model.select.event.id
			}),
			body: t.Object({
				token: t.String()
			}),
			response: t.Object({
				followerCount: t.Number()
			}),
			detail: {
				description: 'Get follower count of an event'
			}
		}
	)

	.post(
		'/admin/orgs',
		async ({ body }) => {
			const newOrganisation = await db.insert(organisations).values(body).returning()
			return {
				orgId: newOrganisation[0].id
			}
		},
		{
			body: t.Object(model.insert.organisation),
			response: OrganisationCreateReturn,
			detail: {
				description: 'Create an organisation'
			}
		}
	)

	.put(
		'/admin/orgs/:orgId',
		async ({ params, body }) => {
			const { orgId } = params

			await db.update(organisations).set(body).where(eq(organisations.id, orgId))

			return {}
		},
		{
			params: t.Object({
				orgId: model.select.organisation.id
			}),
			body: t.Object(model.insert.organisation),
			response: EmptyReturn,
			detail: {
				description: 'Update an organisation'
			}
		}
	)

	.delete(
		'/admin/orgs/:orgId',
		async ({ params, body }) => {
			const { orgId } = params

			await db.delete(organisations).where(eq(organisations.id, orgId))

			return {}
		},
		{
			params: t.Object({
				orgId: model.select.organisation.id
			}),
			body: t.Object({
				token: t.String()
			}),
			response: EmptyReturn,
			detail: {
				description: 'Delete an organisation'
			}
		}
	)

	.get(
		'/admin/orgs/:orgId/admins',
		async ({ params }) => {
			const { orgId } = params

			const managers = await db
				.select()
				.from(organisationRoles)
				.where(and(eq(organisationRoles.organisationId, orgId), eq(organisationRoles.role, 'manager')))

			const moderators = await db
				.select()
				.from(organisationRoles)
				.where(and(eq(organisationRoles.organisationId, orgId), eq(organisationRoles.role, 'moderator')))

			return { managers: managers, moderators: moderators }
		},
		{
			params: t.Object({
				orgId: model.select.organisation.id
			}),
			body: t.Object({
				token: t.String()
			}),
			response: t.Object({
				managers: t.Array(t.Object(model.select.organisationRole)),
				moderators: t.Array(t.Object(model.select.organisationRole))
			}),
			detail: {
				description: 'Get all administrators of an organisation'
			}
		}
	)

	.post(
		'/admin/orgs/:orgId/admins',
		async ({ params, body }) => {
			const { orgId } = params
			const { token, userId, role } = body

			// Check if organisation exists
			const organisation = await db.select().from(organisations).where(eq(organisations.id, orgId))
			if (organisation.length === 0) {
				return error(404, errorMap.get(404))
			}

			// Check if user exists
			const user = await db.select().from(users).where(eq(users.id, userId))
			if (user.length === 0) {
				return error(404, errorMap.get(404))
			}

			// Check if role is valid
			if (role !== 'manager' && role !== 'moderator') {
				return error(400, errorMap.get(400))
			}

			// Check if user is already an admin
			// const existingRole = await db.select().from(organisationRoles).where(and(eq(organisationRoles.organisationId, orgId), eq(organisationRoles.userId, userId), eq(organisationRoles.role, role)).first()
			// if (existingRole) {
			// 	return error(409, errorMap.get(409))
			// }

			await db.insert(organisationRoles).values({ organisationId: orgId, userId: userId, role: role })
			return {}
		},
		{
			params: t.Object({
				orgId: model.select.organisation.id
			}),
			body: t.Object({
				token: t.String(),
				userId: model.select.user.id,
				role: model.select.organisationRole.role
			}),
			response: EmptyReturn,
			detail: {
				description: 'Add a role to a user in an organisation'
			}
		}
	)

	.delete(
		'/admin/orgs/:orgId/admins',
		async ({ params, body }) => {
			const { orgId } = params
			const { token, userId, role } = body

			// Check if organisation exists
			const organisation = await db.select().from(organisations).where(eq(organisations.id, orgId))
			if (organisation.length === 0) {
				return error(404, errorMap.get(404))
			}

			// Check if user exists
			const user = await db.select().from(users).where(eq(users.id, userId))
			if (user.length === 0) {
				return error(404, errorMap.get(404))
			}

			// Check if role is valid
			if (role !== 'manager' && role !== 'moderator') {
				return error(400, errorMap.get(400))
			}

			await db.delete(organisationRoles).where(and(eq(organisationRoles.organisationId, orgId), eq(organisationRoles.userId, userId), eq(organisationRoles.role, role)))
			return {}
		},
		{
			params: t.Object({
				orgId: model.select.organisation.id
			}),
			body: t.Object({
				token: t.String(),
				userId: model.select.user.id,
				role: model.select.organisationRole.role
			}),
			response: EmptyReturn,
			detail: {
				description: 'Remove a role from a user in an organisation'
			}
		}
	)

	.post(
		'/admin/forms',
		async ({ body }) => {
			const { token, form } = body

			const newForm = await db.insert(forms).values(form).returning()

			return { formId: newForm[0].id }
		},
		{
			body: t.Object({
				token: t.String(),
				form: t.Object(model.insert.form)
			}),
			response: FormCreateReturn,
			detail: {
				description: 'Create a form'
			}
		}
	)

	.put(
		'/admin/forms/:formId',
		async ({ params, body }) => {
			const { formId } = params
			const { token, form } = body

			await db.update(forms).set(form).where(eq(forms.id, formId))

			return {}
		},
		{
			params: t.Object({
				formId: model.select.form.id
			}),
			body: t.Object({
				token: t.String(),
				form: t.Object(model.insert.form)
			}),
			response: EmptyReturn,
			detail: {
				description: 'Update a form'
			}
		}
	)

	.delete(
		'/admin/forms/:formId',
		async ({ params }) => {
			const { formId } = params

			await db.delete(forms).where(eq(forms.id, formId))

			return {}
		},
		{
			params: t.Object({
				formId: model.select.form.id
			}),
			body: t.Object({
				token: t.String()
			}),
			response: EmptyReturn,
			detail: {
				description: 'Delete a form'
			}
		}
	)

	.get(
		'/admin/forms/:formId',
		async ({ params }) => {
			const { formId } = params

			const form = await db.select().from(forms).where(eq(forms.id, formId))
			// if (!form) {
			// 	return error(404, errorMap.get(404))
			// }

			return { form: form[0] }
		},
		{
			params: t.Object({
				formId: model.select.form.id
			}),
			response: t.Object({
				form: t.Object(model.select.form)
			}),
			detail: {
				description: 'Get a form'
			}
		}
	)

	.get(
		'/admin/forms/:formId/submissions',
		async ({ params }) => {
			const { formId } = params

			const submissions = await db.select().from(formSubmissions).where(eq(forms.id, formId))
			// if (!submissions) {
			// 	return error(404, errorMap.get(404))
			// }

			return { submissions: submissions }
		},
		{
			params: t.Object({
				formId: model.select.form.id
			}),
			response: t.Object({
				submissions: t.Array(t.Object(model.select.formSubmission))
			}),
			detail: {
				description: 'Get list of submissions for a form'
			}
		}
	)

	.get(
		'/admin/forms/:formId/submissions/:userId',
		async ({ params }) => {
			const { formId, userId } = params

			const submission = await db
				.select()
				.from(formSubmissions)
				.where(and(eq(formSubmissions.formId, formId), eq(formSubmissions.userId, userId)))
			// if (!submission) {
			// 	return error(404, errorMap.get(404))
			// }

			return { submission: submission[0] }
		},
		{
			params: t.Object({
				formId: model.select.formSubmission.formId,
				userId: model.select.formSubmission.userId
			}),
			response: t.Object({
				submission: t.Object(model.select.formSubmission)
			}),
			detail: {
				description: 'Get a form submission'
			}
		}
	)

	.delete(
		'/admin/forms/:formId/submissions/:userId',
		async ({ params }) => {
			const { formId, userId } = params

			await db.delete(formSubmissions).where(and(eq(formSubmissions.formId, formId), eq(formSubmissions.userId, userId)))

			return {}
		},
		{
			params: t.Object({
				formId: t.Number(),
				userId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: EmptyReturn,
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
			return {}
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
			response: EmptyReturn,
			detail: {
				description: 'Update a form template'
			}
		}
	)

	.delete(
		'/admin/orgs/:orgId/templates/:templateId',
		() => {
			return {}
		},
		{
			params: t.Object({
				orgId: t.Number(),
				templateId: t.Number()
			}),
			body: t.Object({
				token: t.String()
			}),
			response: EmptyReturn,
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
		async ({ body }) => {
			const newUser = await db.insert(users).values(body).returning()
			return {
				userId: newUser[0].id
			}
		},
		{
			body: t.Object(model.insert.user),
			response: UserCreateReturn,
			detail: {
				description: 'Create a user'
			}
		}
	)

	.get(
		'/users/:userId',
		async ({ params }) => {
			const { userId } = params

			// Check if user exists
			const user = await db.select().from(users).where(eq(users.id, userId))
			// if (user.length === 0) {
			// 	return error(404, errorMap.get(404))
			// }

			return { user: user[0] }
		},
		{
			params: t.Object({
				userId: model.select.user.id
			}),
			response: t.Object({
				user: t.Object(model.select.user)
			}),
			detail: {
				description: 'Get user details'
			}
		}
	)

	.put(
		'/users/:userId',
		async ({ params, body }) => {
			const { userId } = params

			await db.update(users).set(body).where(eq(users.id, userId))

			return {}
		},
		{
			params: t.Object({
				userId: model.select.user.id
			}),
			body: t.Object(model.insert.user),
			response: EmptyReturn,
			detail: {
				description: 'Update user details'
			}
		}
	)

	.delete(
		'/users/:userId',
		async ({ params, body }) => {
			const { userId } = params

			await db.delete(users).where(eq(users.id, userId))

			return {}
		},
		{
			params: t.Object({
				userId: model.select.user.id
			}),
			body: t.Object({
				token: t.String()
			}),
			response: EmptyReturn,
			detail: {
				description: 'Delete user'
			}
		}
	)

	.get(
		'/users/:userId/adminOrgs',
		async ({ params }) => {
			const { userId } = params
			const userOrgs = await db
				.select()
				.from(organisationRoles)
				.where(or(and(eq(organisationRoles.userId, userId), eq(organisationRoles.role, 'manager')), and(eq(organisationRoles.userId, userId), eq(organisationRoles.role, 'moderator'))))

			const userOrgIds = []
			for (const org of userOrgs) {
				userOrgIds.push(org.organisationId)
			}

			return { organisations: userOrgIds }
		},
		{
			params: t.Object({
				userId: t.Number()
			}),
			response: t.Object({
				organisations: t.Array(model.select.organisation.id)
			}),
			detail: {
				description: 'Get all organisation ids a user is an admin of'
			}
		}
	)

	.get(
		'/users/:userId/notifications',
		async ({ params }) => {
			const { userId } = params
			const userNotifications = await db.select().from(notifications).where(eq(notifications.userId, userId))

			return { notifications: userNotifications }
		},
		{
			params: t.Object({
				userId: t.Number()
			}),
			response: t.Object({
				notifications: t.Array(t.Object(model.select.notification))
			}),
			detail: {
				description: 'Get all notifications for a user'
			}
		}
	)

	.post(
		'/users/:userId/notifications',
		async ({ params, body }) => {
			const { token, type, eventId, formId } = body

			const newNotification = await db
				.insert(notifications)
				.values({
					userId: params.userId,
					eventId: eventId,
					formId: formId,
					type: type,
					createdAt: new Date()
				})
				.returning()

			return { notificationId: newNotification[0].id }
		},
		{
			params: t.Object({
				userId: model.select.user.id
			}),
			body: t.Object({
				token: t.String(),
				type: model.select.notification.type,
				eventId: model.select.notification.eventId,
				formId: t.Optional(model.select.notification.formId)
			}),
			response: t.Object({
				notificationId: model.select.notification.id
			}),
			detail: {
				description: 'Create a notification for a user'
			}
		}
	)

	.put(
		'/users/:userId/notifications/read',
		async ({ params, body }) => {
			const { userId } = params
			const { token, notificationIds } = body
			for (const notificationId of notificationIds) {
				await db.update(notifications).set({ read: true }).where(eq(notifications.id, notificationId))
			}
			return {}
		},
		{
			params: t.Object({
				userId: model.select.notification.userId
			}),
			body: t.Object({
				token: t.String(),
				notificationIds: t.Array(model.select.notification.id)
			}),
			response: EmptyReturn,
			detail: {
				description: 'Mark a notification as read'
			}
		}
	)

	.get(
		'/users/:userId/notifications/unread',
		async ({ params }) => {
			const { userId } = params
			const unreadNotifs = await db
				.select()
				.from(notifications)
				.where(and(eq(notifications.userId, userId), eq(notifications.read, false)))

			return { unreadCount: unreadNotifs.length }
		},
		{
			params: t.Object({
				userId: model.select.notification.userId
			}),
			response: t.Object({
				unreadCount: t.Number()
			}),
			detail: {
				description: 'Get unread notification count for a user'
			}
		}
	)

	.get(
		'/users/:userId/autofill/:fieldType',
		async ({ params }) => {
			const { userId, fieldType } = params

			const autofill = await db
				.select()
				.from(userAutofills)
				.where(and(eq(userAutofills.userId, userId), eq(userAutofills.fieldType, fieldType)))

			return { value: autofill[0].value }
		},
		{
			params: t.Object({
				userId: model.select.userAutofill.userId,
				fieldType: model.select.userAutofill.fieldType
			}),
			response: t.Object({
				value: model.select.userAutofill.value
			}),
			detail: {
				description: 'Get autofill data for a user'
			}
		}
	)

	.post(
		'/users/:userId/autofill/:fieldType',
		async ({ params, body }) => {
			const { userId, fieldType } = params
			const { token, value } = body

			await db.insert(userAutofills).values({ userId: userId, fieldType: fieldType, value: value })

			return {}
		},
		{
			params: t.Object({
				userId: model.select.userAutofill.userId,
				fieldType: model.select.userAutofill.fieldType
			}),
			body: t.Object({
				token: t.String(),
				value: model.select.userAutofill.value
			}),
			response: EmptyReturn,
			detail: {
				description: 'Create autofill field for a user'
			}
		}
	)

	.put(
		'/users/:userId/autofill/:fieldType',
		async ({ params, body }) => {
			const { userId, fieldType } = params
			const { token, value } = body

			await db
				.update(userAutofills)
				.set({ value: value })
				.where(and(eq(userAutofills.userId, userId), eq(userAutofills.fieldType, fieldType)))

			return {}
		},
		{
			params: t.Object({
				userId: model.select.userAutofill.userId,
				fieldType: model.select.userAutofill.fieldType
			}),
			body: t.Object({
				token: t.String(),
				value: model.select.userAutofill.value
			}),
			response: EmptyReturn,
			detail: {
				description: 'Update autofill field for a user'
			}
		}
	)

	.delete(
		'/users/:userId/autofill/:fieldType',
		async ({ params }) => {
			const { userId, fieldType } = params

			await db.delete(userAutofills).where(and(eq(userAutofills.userId, userId), eq(userAutofills.fieldType, fieldType)))

			return {}
		},
		{
			params: t.Object({
				userId: model.select.userAutofill.userId,
				fieldType: model.select.userAutofill.fieldType
			}),
			body: t.Object({
				token: t.String()
			}),
			response: EmptyReturn,
			detail: {
				description: 'Delete autofill field for a user'
			}
		}
	)

	.get(
		'/users/:userId/notificationRules',
		async ({ params }) => {
			const { userId } = params

			const notificationRuleArray = await db.select().from(notificationRules).where(eq(notificationRules.userId, userId))
			const keywordArray = []
			for (const rule of notificationRuleArray) {
				keywordArray.push(rule.keyword)
			}

			return { keywords: keywordArray }
		},
		{
			params: t.Object({
				userId: model.select.notificationRule.userId
			}),
			response: t.Object({
				keywords: t.Array(model.select.notificationRule.keyword)
			}),
			detail: {
				description: 'Get all notification rules for a user'
			}
		}
	)

	.post(
		'/users/:userId/notificationRules',
		async ({ params, body }) => {
			const { userId } = params
			const { keyword } = body

			await db.insert(notificationRules).values({ userId: userId, keyword: keyword })

			return {}
		},
		{
			params: t.Object({
				userId: model.select.notificationRule.userId
			}),
			body: t.Object({
				keyword: model.select.notificationRule.keyword
			}),
			response: EmptyReturn,
			detail: {
				description: 'Create notification rule for a user'
			}
		}
	)

	.delete(
		'/users/:userId/notificationRules',
		async ({ params, body }) => {
			const { userId } = params
			const { keyword } = body

			await db.delete(notificationRules).where(and(eq(notificationRules.userId, userId), eq(notificationRules.keyword, keyword)))

			return {}
		},
		{
			params: t.Object({
				userId: model.select.notificationRule.userId
			}),
			body: t.Object({
				keyword: model.select.notificationRule.keyword
			}),
			response: EmptyReturn,
			detail: {
				description: 'Delete notification rule for a user'
			}
		}
	)

	.get(
		'/forms/:formId',
		async ({ params }) => {
			const { formId } = params

			const form = await db.select().from(forms).where(eq(forms.id, formId))
			// if (!form) {
			// 	return error(404, errorMap.get(404))
			// }

			return { form: form[0] }
		},
		{
			params: t.Object({
				formId: model.select.form.id
			}),
			response: t.Object({
				form: t.Object(model.select.form)
			}),
			detail: {
				description: 'Get form details by id'
			}
		}
	)

	.post(
		'/forms/:formId',
		async ({ params, body }) => {
			const { formId } = params
			const { token, userId, answers } = body

			const newSubmission = await db.insert(formSubmissions).values({ formId: formId, userId: userId, answers: answers, createdAt: new Date() }).returning()

			return {}
		},
		{
			params: t.Object({
				formId: model.select.form.id
			}),
			body: t.Object({
				token: t.String(),
				userId: model.select.formSubmission.userId,
				answers: model.select.formSubmission.answers
			}),
			response: EmptyReturn,
			detail: {
				description: 'Create a form submission'
			}
		}
	)

	.get(
		'/forms/:formId/:userId',
		async ({ params }) => {
			const { formId, userId } = params

			const submission = await db
				.select()
				.from(formSubmissions)
				.where(and(eq(formSubmissions.formId, formId), eq(formSubmissions.userId, userId)))
			// if (!submission) {
			// 	return error(404, errorMap.get(404))
			// }

			return { submission: submission[0] }
		},
		{
			params: t.Object({
				formId: model.select.formSubmission.formId,
				userId: model.select.formSubmission.userId
			}),
			response: t.Object({
				submission: t.Object(model.select.formSubmission)
			}),
			detail: {
				description: 'Get form submission details of a user'
			}
		}
	)

	.put(
		'/forms/:formId/:userId',
		async ({ params, body }) => {
			const { formId, userId } = params
			const { token, answers } = body

			await db
				.update(formSubmissions)
				.set({ answers: answers })
				.where(and(eq(formSubmissions.formId, formId), eq(formSubmissions.userId, userId)))
			return {}
		},
		{
			params: t.Object({
				formId: model.select.formSubmission.formId,
				userId: model.select.formSubmission.userId
			}),
			body: t.Object({
				token: t.String(),
				answers: model.select.formSubmission.answers
			}),
			response: EmptyReturn,
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
			return {}
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
			response: EmptyReturn,
			detail: {
				description: 'Create autofill field for a user'
			}
		}
	)

	.put(
		'/users/:userId/templateAutofill/:templateId/:templateFieldId',
		() => {
			return {}
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
			response: EmptyReturn,
			detail: {
				description: 'Update template autofill field for a user'
			}
		}
	)

	.delete(
		'/users/:userId/templateAutofill/:templateId/:templateFieldId',
		() => {
			return {}
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
			response: EmptyReturn,
			detail: {
				description: 'Delete template autofill field for a user'
			}
		}
	)

	.listen(60000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
