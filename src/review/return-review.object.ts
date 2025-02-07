import { Prisma } from '@prisma/client'
import { returnMovieObject } from 'src/movie/return-movie.object'
import { returnUserObject } from 'src/user/return-user.object'

export const returnReviewObject: Prisma.ReviewSelect = {
	id: true,
	createdAt: true,
	text: true,
	rating: true,
	user: {
		select: returnUserObject
	},
	movie: {
		select: returnMovieObject
	}
}
