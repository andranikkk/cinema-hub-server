import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { GenreModule } from './genre/genre.module'
import { FileModule } from './file/file.module'
import { ActorModule } from './actor/actor.module'
import { ReviewModule } from './review/review.module'
import { MovieModule } from './movie/movie.module'
import { StatisticsModule } from './statistics/statistics.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		GenreModule,
		FileModule,
		ActorModule,
		ReviewModule,
		MovieModule,
		StatisticsModule
	]
})
export class AppModule {}
