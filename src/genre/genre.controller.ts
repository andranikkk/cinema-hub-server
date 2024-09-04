import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { GenreService } from './genre.service';

@Controller('users')
export class GenreController {
	constructor(private readonly GenreService: GenreService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: string) {
		return this.GenreService.getById(id)
	}

	@Post('profile/favorites')
	@HttpCode(200)
	@Auth()
	async toggleFavorite(
		@Body('movieId') movieId: string,
		@CurrentUser('id') userId: string
	) {
		return this.GenreService.toggleFavorite(movieId, userId)
	}

	/* For Admin */

	@Get()
	@Auth('admin')
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.GenreService.getAll(searchTerm)
	}

	@Get('by-id/:id')
	@Auth('admin')
	async getById(@Param('id') id: string) {
		return this.GenreService.getById(id)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth()
	async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		const updatedUser = await this.GenreService.update(id, dto)

		if (!updatedUser) throw new NotFoundException('User not found')

		return updatedUser
	}

	@Delete(':id')
	@Auth('admin')
	async delete(@Param('id') id: string) {
		return this.GenreService.delete(id)
	}
}
