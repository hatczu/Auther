"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationController_1 = __importDefault(require("../controller/AuthenticationController"));
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
class AuthenticationRouter extends BaseRouter_1.default {
    routes() {
        this.router.post("/login", AuthenticationController_1.default.login);
        this.router.post("/register", AuthenticationController_1.default.register);
        this.router.get("/user", AuthMiddleware_1.auth, AuthenticationController_1.default.getCurrentUser);
        this.router.delete("/user", AuthMiddleware_1.auth, AuthenticationController_1.default.delete);
        // this.router.put("/user", auth, AuthenticationController.update);
    }
}
exports.default = new AuthenticationRouter().router;
