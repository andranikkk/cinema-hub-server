import { UserRole } from '@prisma/client'
import { IsString } from 'class-validator'

export class CreateGenreDto {
	@IsString()
	name: string

	@IsString()
	description: string

	@IsString()
	slug: string

	@IsString()
	icon: UserRole

	@IsString()
	link: string
}
