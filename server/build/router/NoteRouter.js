"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NoteController_1 = __importDefault(require("../controller/NoteController"));
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
class NoteRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("/", AuthMiddleware_1.auth, NoteController_1.default.create);
        this.router.get("/", AuthMiddleware_1.auth, NoteController_1.default.getAll);
    }
}
exports.default = new NoteRoutes().router;
