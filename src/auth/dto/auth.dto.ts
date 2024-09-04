import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsOptional()
	@IsString()
	name: string

	@IsString()
	@IsEmail()
	email: string

	@MinLength(3, { message: 'Password must be at least 3 characters!' })
	@IsString()
	password: string
}
