import { User } from '../users/users.entity';
import { Song } from '../songs/songs.entitry';
export declare class Artist {
    id: number;
    user: User;
    songs: Song[];
}
