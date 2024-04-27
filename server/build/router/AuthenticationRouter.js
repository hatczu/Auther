"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationController_1 = __importDefault(require("../controller/AuthenticationController"));
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
class AuthenticationRouter extends BaseRouter_1.default {
    routes() {
        this.router.post("/login", AuthenticationController_1.default.login);
        this.router.post("/register", AuthenticationController_1.default.register);
    }
}
exports.default = new AuthenticationRouter().router;
