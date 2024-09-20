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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("../users/dtos/create-user.dto");
const users_service_1 = require("../users/users.service");
const login_dto_1 = require("./dto/login.dto");
const auth_service_1 = require("./auth.service");
const jwt_guard_1 = require("./jwt.guard");
const validate_token_dto_1 = require("./dto/validate-token.dto");
let AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    signUp(userDTO) {
        return this.userService.create(userDTO);
    }
    login(loginDTO) {
        return this.authService.login(loginDTO);
    }
    async enable2Fa(req) {
        console.log(req.user);
        return await this.authService.enable2Fa(req.user.userId);
    }
    validate2Fa(req, validateTokenDto) {
        return this.authService.validate2FaToken(req.user.userId, validateTokenDto.token);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signUp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('enable-2fa'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "enable2Fa", null);
__decorate([
    (0, common_1.Post)("validate-2fa"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, validate_token_dto_1.ValidateTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validate2Fa", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService, auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map