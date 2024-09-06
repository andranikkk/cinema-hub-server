import { IsOptional, IsString } from 'class-validator'

export class CreateActorDto {
	@IsString()
	name: string

	@IsString()
	slug: string

	@IsString()
	photoUrl: string

	@IsString()
	@IsOptional()
	description: string
}
