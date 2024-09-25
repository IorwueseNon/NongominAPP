import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/songs.entitry';
import { Artist } from './artists/artists.entity';
import { User } from './users/users.entity';
import { Playlist } from './playlists/playlists.entitiy';
import { PlayListModule } from './playlists/playList.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [
    SongsModule,
    PlayListModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'sportify-clone2',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'h5a4r3r2y1',
      entities: [Song, Artist, User, Playlist],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ArtistsModule,
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
