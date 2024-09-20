import { CreatePlayListDto } from './dto/create-playlist.dto';
import { PlayListsService } from './playList.service';
import { Playlist } from './playlists.entitiy';
export declare class PlayListsController {
    private playListService;
    constructor(playListService: PlayListsService);
    create(playlistDTO: CreatePlayListDto): Promise<Playlist>;
}
