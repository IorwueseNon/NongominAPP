import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/songs.entity';
import { Artist } from './artists/artists.entity';
import { PlayListModule } from './playlists/playList.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { typeOrmAsyncConfig } from 'db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration/configuration';


@Module({
  imports: [
    SongsModule,
    PlayListModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({
      envFilePath:['.env.development','.env.production'],
      isGlobal:true,
      load:[configuration]
    }),
    AuthModule,
    UsersModule,
    ArtistsModule,
    SeedModule,
  ],
  providers: [Artist]
})
export class AppModule implements NestModule {
  constructor(private datasource: DataSource) {
    console.log(`the database name :${this.datasource.driver.database}`);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs');
  }
}
