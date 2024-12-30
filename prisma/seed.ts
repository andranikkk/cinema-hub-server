import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.user.createMany({
		data: [
			{
				name: 'admin',
				email: 'admin@mail.ru',
				role: 'ADMIN',
				password: '123'
			},
			{
				name: 'panda',
				email: 'example@mail.ru',
				role: 'USER',
				password: '123'
			}
		]
	})

	await prisma.movie.createMany({
		data: [
			{
				title: 'The Shawshank Redemption',
				slug: 'pobeg iz shoushenka',
				poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
				bigPoster:
					'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
				videoUrl: 'https://www.youtube.com/embed/6hB3S9bIaco',
				actors: { connect: [{ id: 1 }, { id: 2 }] },
				genres: { connect: [{ id: 1 }, { id: 2 }] },
				country: 'USA',
				year: 1994,
				duration: 142
			}
		]
	})
}
