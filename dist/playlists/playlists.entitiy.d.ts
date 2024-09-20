import { Song } from '../songs/songs.entitry';
import { User } from '../users/users.entity';
export declare class Playlist {
    id: number;
    name: string;
    songs: Song[];
    user: User;
}
