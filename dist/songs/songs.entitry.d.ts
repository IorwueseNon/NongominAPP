import { Artist } from '../artists/artists.entity';
import { Playlist } from '../playlists/playlists.entitiy';
export declare class Song {
    id: number;
    title: string;
    releaseDate: Date;
    duration: Date;
    lyrics: string;
    artists: Artist[];
    playList: Playlist;
}
