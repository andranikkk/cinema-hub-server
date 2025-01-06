/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-require-imports */
import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
const users = require('./seedData/users.json')
const movies = require('./seedData/movies.json')
const genres = require('./seedData/genres.json')
const actors = require('./seedData/actors.json')

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

async function addMovies() {
	for (const movie of movies) {
		const existingMovie = await prisma.movie.findUnique({
			where: {
				slug: movie.slug
			}
		})
		if (!existingMovie) {
			await prisma.movie.create({
				data: movie
			})
			console.log(`Movie '${movie.title}' created successfully.`)
		} else {
			console.log(
				`Movie with slug ${movie.slug} already exists. Skipping...`
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

async function cleanup(actors, genres, movies, users) {
	// const actorsCount = await prisma.actor.count()
	// const genresCount = await prisma.genre.count()
	// const moviesCount = await prisma.movie.count()
	// const usersCount = await prisma.user.count()

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
}

async function main() {
	// choose what to remove
	let deleteActors = false
	let deleteGenres = false
	let deleteMovies = false
	let deleteUsers = false

	if (deleteActors || deleteGenres || deleteMovies || deleteUsers) {
		await cleanup(deleteActors, deleteGenres, deleteMovies, deleteUsers)
	} else {
		await addUsers()
		await addMovies()
		await addGenres()
		await addActors()
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
