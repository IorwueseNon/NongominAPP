import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlists.entity';
import { Song } from '../songs/songs.entity';
import { User } from '../users/users.entity';
import { PlayListsService } from './playList.service';
import { PlayListsController } from './playList.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  controllers: [PlayListsController],
  providers: [PlayListsService],
})
export class PlayListModule {}
