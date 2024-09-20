import { Playlist } from '../playlists/playlists.entitiy';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    twoFaSecret: string;
    enable2Fa: boolean;
    playList: Playlist[];
}
