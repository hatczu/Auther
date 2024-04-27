"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const Users_1 = require("../models/Users");
const UsersRepo_1 = require("../repository/UsersRepo");
const Authentication_1 = __importDefault(require("../utils/Authentication"));
class AuthenticationService {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield new UsersRepo_1.UsersRepo().findByEmail(email);
            if (!users) {
                throw new Error("Bad Request!");
            }
            let compare = yield Authentication_1.default.passwordCompare(password, users.password);
            if (compare) {
                return Authentication_1.default.generateToken(users.id, users.email, users.name, users.username);
            }
            return "";
        });
    }
    register(email, password, name, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield Authentication_1.default.passwordHash(password);
                const new_users = new Users_1.Users();
                new_users.email = email;
                new_users.password = hashedPassword;
                new_users.username = username;
                new_users.name = name;
                yield new UsersRepo_1.UsersRepo().save(new_users);
            }
            catch (error) {
                throw new Error("Error login!");
            }
        });
    }
}
exports.AuthenticationService = AuthenticationService;
