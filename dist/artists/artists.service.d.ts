import { Repository } from 'typeorm';
import { Artist } from './artists.entity';
export declare class ArtistsService {
    private artistRepo;
    constructor(artistRepo: Repository<Artist>);
    findArtist(userId: number): Promise<Artist>;
}
