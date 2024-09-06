import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateMovieDto {
	@IsString()
  @IsOptional()
	title?: string

	@IsString()
  @IsOptional()
	poster?: string

	@IsString()
  @IsOptional()
	bigPoster?: string

	@IsString()
  @IsOptional()
	videoUrl?: string

	@IsString()
  @IsOptional()
	country?: string

	@IsNumber()
  @IsOptional()
	year?: number

	@IsArray()
  @IsOptional()
	@IsString({ each: true })
	genres?: string[]

	@IsNumber()
  @IsOptional()
	duration?: number

	@IsArray()
  @IsOptional()
	@IsString({ each: true })
	actors?: string[]
}
