import { Injectable } from '@nestjs/common'

import * as dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { PrismaService } from 'src/prisma.service'

dayjs.locale('ru')
@Injectable()
export class StatisticsService {
	constructor(private prisma: PrismaService) {}

	async getMainStatistics() {
		const countUsers = await this.prisma.user.count()
		const countMovies = await this.prisma.movie.count()

		const countViews = await this.prisma.movie.aggregate({
			_sum: {
				views: true
			}
		})

		const averageRating = await this.prisma.review.aggregate({
			_avg: {
				rating: true
			}
		})

		return [
			{
				id: 1,
				name: 'Views',
				value: countViews._sum.views
			},
			{
				id: 2,
				name: 'Movies',
				value: countMovies
			},
			{
				id: 3,
				name: 'Users',
				value: countUsers
			},
			{
				id: 4,
				name: 'Rating',
				value: averageRating._avg.rating || 0
			}
		]
	}

	async getMiddleStatistics() {
		const movies = await this.prisma.movie.findMany({
			select: {
				title: true,
				views: true
			}
		})

		const topMovies = movies.sort((a, b) => b.views - a.views).slice(0, 4)

		const startDate = dayjs().subtract(14, 'days').startOf('day').toDate()
		const endDate = dayjs().endOf('day').toDate()

		const salesRaw = await this.prisma.payment.groupBy({
			by: ['createdAt'],
			_sum: {
				amount: true
			},
			where: {
				createdAt: {
					gte: startDate,
					lte: endDate
				}
			}
		})

		const monthName = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		]

		const formatDate = (date: Date): string => {
			return `${date.getDate()} ${monthName[date.getMonth()]}`
		}

		const salesByDate: { [key: string]: number } = {}

		for (
			let d = new Date(startDate);
			d <= endDate;
			d.setDate(d.getDate() + 1)
		) {
			const formattedDate = formatDate(new Date(d))
			salesByDate[formattedDate] = 0
		}
	}
}
