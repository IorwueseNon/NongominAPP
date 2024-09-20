"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const songs_entitry_1 = require("./songs.entitry");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const artists_entity_1 = require("../artists/artists.entity");
let SongsService = class SongsService {
    constructor(songRepository, artistRepository) {
        this.songRepository = songRepository;
        this.artistRepository = artistRepository;
    }
    async create(songDTO) {
        const song = new songs_entitry_1.Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        song.releaseDate = songDTO.releaseDate;
        const artists = await this.artistRepository.findBy(song.artists);
        song.artists = artists;
        return await this.songRepository.save(song);
    }
    async findAll() {
        return this.songRepository.find();
    }
    async findOne(id) {
        return await this.songRepository.findOneBy({ id });
    }
    async remove(id) {
        return await this.songRepository.delete({ id });
    }
    async update(id, recordToUpdate) {
        return await this.songRepository.update(id, recordToUpdate);
    }
    async paginate(option) {
        const queryBuilder = this.songRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.releaseDate', 'DESC');
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, option);
    }
};
exports.SongsService = SongsService;
exports.SongsService = SongsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(songs_entitry_1.Song)),
    __param(1, (0, typeorm_1.InjectRepository)(artists_entity_1.Artist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SongsService);
//# sourceMappingURL=songs.service.js.map