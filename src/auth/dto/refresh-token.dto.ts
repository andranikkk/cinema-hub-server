import { IsString } from 'class-validator'

export class RefreshTokenDto {
	@IsString({
		message: '$property must be a string'
	})
	refreshToken: string
}
