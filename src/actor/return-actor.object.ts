import { Prisma } from '@prisma/client'

export const returnActorObject: Prisma.ActorSelect = {
	id: true,
	createdAt: true,
	name: true,
	slug: true,
	photoUrl: true,
	description: true,
	movies: {
		select: {
			id: true
		}
	}
}
