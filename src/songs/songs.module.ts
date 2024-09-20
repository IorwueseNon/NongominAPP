import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs.entitry';
import { Artist } from '../artists/artists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [{ provide: 'food', useClass: SongsService }],
})
export class SongsModule {

  
}
