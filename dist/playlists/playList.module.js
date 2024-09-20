"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayListModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const playlists_entitiy_1 = require("./playlists.entitiy");
const songs_entitry_1 = require("../songs/songs.entitry");
const users_entity_1 = require("../users/users.entity");
const playList_service_1 = require("./playList.service");
const playList_controller_1 = require("./playList.controller");
let PlayListModule = class PlayListModule {
};
exports.PlayListModule = PlayListModule;
exports.PlayListModule = PlayListModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([playlists_entitiy_1.Playlist, songs_entitry_1.Song, users_entity_1.User])],
        controllers: [playList_controller_1.PlayListsController],
        providers: [playList_service_1.PlayListsService],
    })
], PlayListModule);
//# sourceMappingURL=playList.module.js.map