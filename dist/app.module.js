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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const songs_module_1 = require("./songs/songs.module");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const songs_entitry_1 = require("./songs/songs.entitry");
const artists_entity_1 = require("./artists/artists.entity");
const users_entity_1 = require("./users/users.entity");
const playlists_entitiy_1 = require("./playlists/playlists.entitiy");
const playList_module_1 = require("./playlists/playList.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const artists_module_1 = require("./artists/artists.module");
let AppModule = class AppModule {
    constructor(datasource) {
        this.datasource = datasource;
        console.log(`the database name :${this.datasource.driver.database}`);
    }
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('songs');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            songs_module_1.SongsModule,
            playList_module_1.PlayListModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                database: 'sportify-clone',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'h5a4r3r2y1',
                entities: [songs_entitry_1.Song, artists_entity_1.Artist, users_entity_1.User, playlists_entitiy_1.Playlist],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            artists_module_1.ArtistsModule,
        ],
        providers: [artists_entity_1.Artist]
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
//# sourceMappingURL=app.module.js.map