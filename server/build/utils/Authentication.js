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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
    static passwordHash(password) {
        return bcrypt_1.default.hash(password, 10);
    }
    static passwordCompare(text, encryptedText) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(text, encryptedText);
        });
    }
    static generateToken(id, email, name, username) {
        const secretKey = process.env.JWT_SECRET_KEY || "guess";
        const payload = {
            userId: id,
            email: email,
            name: name,
            username: username,
        };
        const option = { expiresIn: process.env.JWT_EXPIRES_IN };
        return jsonwebtoken_1.default.sign(payload, secretKey, option);
    }
    static validateToken(token) {
        try {
            const secretKey = process.env.JWT_SECRET_KEY || "guess";
            return jsonwebtoken_1.default.verify(token, secretKey);
        }
        catch (err) {
            return null;
        }
    }
}
exports.default = Authentication;
