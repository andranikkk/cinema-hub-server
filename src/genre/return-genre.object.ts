import { Prisma } from '@prisma/client'
import { returnMovieObject } from 'src/movie/return-movie.object'

export const returnGenreObject: Prisma.GenreSelect = {
	id: true,
	createdAt: true,
	name: true,
	slug: true,
	description: true,
	icon: true,
	movies: { select: returnMovieObject }
}
