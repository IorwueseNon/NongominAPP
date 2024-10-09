import { Post, Body, Controller } from '@nestjs/common';
import { CreatePlayListDto } from './dto/create-playlist.dto';
import { PlayListsService } from './playList.service';
import { Playlist } from './playlists.entity';

@Controller("playList")
export class PlayListsController {
  constructor(private playListService: PlayListsService) {}
  @Post()
  create(
    @Body()
    playlistDTO: CreatePlayListDto,
  ): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }
}
