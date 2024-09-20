import { Artist } from './artists.entity';
import { Repository } from 'typeorm';
export declare class ArtistsModule {
    private artistRepo;
    constructor(artistRepo: Repository<Artist>);
    findArtist(userId: number): Promise<Artist>;
}
