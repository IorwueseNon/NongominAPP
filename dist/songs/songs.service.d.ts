import { Song } from './songs.entitry';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSongsDto } from './dto/create-songs-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Artist } from '../artists/artists.entity';
export declare class SongsService {
    private songRepository;
    private artistRepository;
    constructor(songRepository: Repository<Song>, artistRepository: Repository<Artist>);
    create(songDTO: CreateSongsDto): Promise<Song>;
    findAll(): Promise<Song[]>;
    findOne(id: number): Promise<Song>;
    remove(id: number): Promise<DeleteResult>;
    update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult>;
    paginate(option: IPaginationOptions): Promise<Pagination<Song>>;
}
