/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-require-imports */
import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
const users = require('./seedData/users.json')
const movies = require('./seedData/movies.json')
const genres = require('./seedData/genres.json')
const actors = require('./seedData/actors.json')
const reviews = require('./seedData/reviews.json')
const payments = require('./seedData/payments.json')

const prisma = new PrismaClient()

async function addUsers() {
	for (const user of users) {
		const existingUser = await prisma.user.findUnique({
			where: {
				email: user.email
			}
		})
		if (!existingUser) {
			const hashedPassword = await hash(user.password)
			await prisma.user.create({
				data: {
					...user,
					password: hashedPassword
				}
			})
			console.log(`User '${user.name}' created successfully.`)
		} else {
			console.log(
				`User with email ${user.email} already exists. Skipping...`
			)
		}
	}
}

async function addGenres() {
	for (const genre of genres) {
		const existingGenre = await prisma.genre.findUnique({
			where: {
				slug: genre.slug
			}
		})
		if (!existingGenre) {
			await prisma.genre.create({
				data: genre
			})
			console.log(`Genre '${genre.name}' created successfully.`)
		} else {
			console.log(
				`Genre with slug ${genre.slug} already exists. Skipping...`
			)
		}
	}
}

async function addMovies() {
	for (const movie of movies) {
		const existingMovie = await prisma.movie.findUnique({
			where: { slug: movie.slug }
		})

		if (!existingMovie) {
			await prisma.movie.create({
				data: {
					title: movie.title,
					slug: movie.slug,
					poster: movie.poster,
					bigPoster: movie.bigPoster,
					year: movie.year,
					duration: movie.duration,
					country: movie.country,
					views: movie.views,
					videoUrl: movie.videoUrl,
					userId: movie.userId,
					genres: {
						connect: movie.genres.map(genre => ({
							id: genre.id
						}))
					}
				}
			})
			console.log(`Movie '${movie.title}' created successfully.`)
		} else {
			console.log(
				`Movie with slug ${movie.slug} already exists. Skipping...`
			)
		}
	}
}

async function addActors() {
	for (const actor of actors) {
		const existingActor = await prisma.actor.findUnique({
			where: {
				slug: actor.slug
			}
		})
		if (!existingActor) {
			await prisma.actor.create({
				data: actor
			})
			console.log(`Actor '${actor.name}' created successfully.`)
		} else {
			console.log(
				`Actor with slug ${actor.slug} already exists. Skipping...`
			)
		}
	}
}

async function addReviews() {
	for (const review of reviews) {
		await prisma.review.create({
			data: review
		})
		console.log(`Review '${review.text}' created successfully.`)
	}
}

async function addPayments() {
	for (const payment of payments) {
		await prisma.payment.create({
			data: payment
		})
		console.log(`Review '${payment.amount}' created successfully.`)
	}
}

async function cleanup(actors, genres, movies, users, reviews, payments) {
	// const actorsCount = await prisma.actor.count()
	// const genresCount = await prisma.genre.count()
	// const moviesCount = await prisma.movie.count()
	// const usersCount = await prisma.user.count()
	// const reviewsCount = await prisma.review.count()
	// const paymentsCount = await prisma.payment.count()

	if (actors) {
		const actor = await prisma.actor.deleteMany()
		console.log(`Deleted ${actor.count} actors`)
	}

	if (genres) {
		const genre = await prisma.genre.deleteMany()
		console.log(`Deleted ${genre.count} genres`)
	}

	if (movies) {
		const movie = await prisma.movie.deleteMany()
		console.log(`Deleted ${movie.count} movies`)
	}

	if (users) {
		const user = await prisma.user.deleteMany()
		console.log(`Deleted ${user.count} users`)
	}

	if (reviews) {
		const review = await prisma.review.deleteMany()
		console.log(`Deleted ${review.count} reviews`)
	}

	if (payments) {
		const payment = await prisma.payment.deleteMany()
		console.log(`Deleted ${payment.count} payments`)
	}
}

async function main() {
	// choose what to remove
	let deleteActors = false
	let deleteGenres = false
	let deleteMovies = false
	let deleteUsers = false
	let deleteReviews = false
	let deletePayments = false

	if (
		deleteActors ||
		deleteGenres ||
		deleteMovies ||
		deleteUsers ||
		deleteReviews ||
		deletePayments
	) {
		await cleanup(
			deleteActors,
			deleteGenres,
			deleteMovies,
			deleteUsers,
			deleteReviews,
			deletePayments
		)
	} else {
		await addUsers()
		await addGenres()
		await addMovies()
		await addActors()
		await addReviews()
		await addPayments()
	}
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
