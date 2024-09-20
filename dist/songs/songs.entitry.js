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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const typeorm_1 = require("typeorm");
const artists_entity_1 = require("../artists/artists.entity");
const playlists_entitiy_1 = require("../playlists/playlists.entitiy");
let Song = class Song {
};
exports.Song = Song;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Song.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(''),
    __metadata("design:type", String)
], Song.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], Song.prototype, "releaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)('time'),
    __metadata("design:type", Date)
], Song.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Song.prototype, "lyrics", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => artists_entity_1.Artist, (artist) => artist.songs),
    (0, typeorm_1.JoinTable)({ name: 'songs_artists' }),
    __metadata("design:type", Array)
], Song.prototype, "artists", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => playlists_entitiy_1.Playlist, (playList) => playList.songs),
    __metadata("design:type", playlists_entitiy_1.Playlist)
], Song.prototype, "playList", void 0);
exports.Song = Song = __decorate([
    (0, typeorm_1.Entity)('songs')
], Song);
//# sourceMappingURL=songs.entitry.js.map