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
            try {
                const user = yield new UsersRepo_1.UsersRepo().findByEmail(email);
                if (!user) {
                    throw new Error("User not found.");
                }
                const isPasswordValid = yield Authentication_1.default.passwordCompare(password, user.password);
                if (isPasswordValid) {
                    return Authentication_1.default.generateToken(user.id, user.email, user.name, user.username);
                }
                else {
                    throw new Error("Invalid password.");
                }
            }
            catch (error) {
                throw new Error("Failed to authenticate user."); // or return a custom error message
            }
        });
    }
    register(email, password, name, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield Authentication_1.default.passwordHash(password);
                const newUser = new Users_1.Users();
                newUser.email = email;
                newUser.password = hashedPassword;
                newUser.username = username;
                newUser.name = name;
                yield new UsersRepo_1.UsersRepo().save(newUser);
            }
            catch (error) {
                throw new Error("Error registering user!");
            }
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new UsersRepo_1.UsersRepo().delete(userId);
            }
            catch (error) {
                throw new Error("Error deleting user!");
            }
        });
    }
    update(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new UsersRepo_1.UsersRepo().update(userId, userData);
            }
            catch (error) {
                throw new Error("Error updating user!");
            }
        });
    }
    getCurrentUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || req.cookies.token;
                if (!token) {
                    return null;
                }
                const decodedToken = Authentication_1.default.validateToken(token);
                if (!decodedToken) {
                    return null;
                }
                const userId = decodedToken.userId;
                const user = yield new UsersRepo_1.UsersRepo().getById(userId);
                return user;
            }
            catch (error) {
                throw new Error("Error getting current user!");
            }
        });
    }
}
exports.AuthenticationService = AuthenticationService;
exports.default = AuthenticationService;
