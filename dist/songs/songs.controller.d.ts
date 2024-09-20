import { SongsService } from './songs.service';
import { CreateSongsDto } from './dto/create-songs-dto';
import { Song } from './songs.entitry';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    create(createSongsDto: CreateSongsDto, req: any): Promise<Song>;
    findAll(page?: number, limit?: number): Promise<Pagination<Song>>;
    together(): Promise<Song[]>;
    findOne(id: number): Promise<Song>;
    update(id: number, updateSongDto: UpdateSongDto): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
}
