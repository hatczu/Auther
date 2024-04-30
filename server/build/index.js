"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import the cors middleware
const database_1 = __importDefault(require("./config/database"));
const AuthenticationRouter_1 = __importDefault(require("./router/AuthenticationRouter"));
const NoteRouter_1 = __importDefault(require("./router/NoteRouter"));
class App {
    // init
    constructor() {
        this.app = (0, express_1.default)();
        this.databaseSync();
        this.plugins();
        this.routes();
    }
    // routes
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("welcome home");
        });
        this.app.use("/note", NoteRouter_1.default);
        this.app.use("/auth", AuthenticationRouter_1.default);
    }
    // database sync
    databaseSync() {
        var _a;
        const db = new database_1.default();
        (_a = db.sequelize) === null || _a === void 0 ? void 0 : _a.sync();
    }
    // plugin
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Enable CORS for all origins
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:3001',
            credentials: true // if needed
        }));
    }
}
const port = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log("✅ Server started successfully!");
});
