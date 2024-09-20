import { Repository } from 'typeorm';
import { Playlist } from './playlists.entitiy';
import { Song } from '../songs/songs.entitry';
import { User } from '../users/users.entity';
import { CreatePlayListDto } from './dto/create-playlist.dto';
export declare class PlayListsService {
    private playListRepo;
    private songsRepo;
    private userRepo;
    constructor(playListRepo: Repository<Playlist>, songsRepo: Repository<Song>, userRepo: Repository<User>);
    create(playListDTO: CreatePlayListDto): Promise<Playlist>;
}
