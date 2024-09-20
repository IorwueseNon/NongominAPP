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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const artists_service_1 = require("../artists/artists.service");
const speakeasy = require("speakeasy");
let AuthService = class AuthService {
    constructor(userService, jwtService, artistService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.artistService = artistService;
    }
    async login(loginDTO) {
        const user = await this.userService.findOne(loginDTO);
        const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);
        if (passwordMatched) {
            delete user.password;
            const payload = { email: user.email, userId: user.id };
            const artist = await this.artistService.findArtist(user.id);
            if (artist) {
                payload.artistId = artist.id;
            }
            return {
                accesstoken: this.jwtService.sign(payload)
            };
        }
        else {
            throw new common_1.UnauthorizedException("Password does not match");
        }
    }
    async enable2Fa(userId) {
        const user = await this.userService.findOneById(userId);
        if (user.enable2Fa) {
            return { secret: user.twoFaSecret };
        }
        const secret = speakeasy.generateSecret();
        user.twoFaSecret = secret.base32;
        user.enable2Fa = true;
        console.log(secret);
        this.userService.updateSecretKey(user.id, user.twoFaSecret);
        return { secret: user.twoFaSecret };
    }
    async validate2FaToken(userId, token) {
        const user = await this.userService.findOneById(userId);
        const verified = speakeasy.totp.verify({
            secret: user.twoFaSecret,
            token: token,
            encoding: 'base32'
        });
        if (verified) {
            return { verified: true };
        }
        else {
            return { verified: false };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService, artists_service_1.ArtistsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map