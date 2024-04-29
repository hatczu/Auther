"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("No token!");
    }
    let secretKey = process.env.JWT_SECRET_KEY || "guess";
    const token = req.headers.authorization.split(" ")[1];
    try {
        const credential = jsonwebtoken_1.default.verify(token, secretKey);
        if (credential) {
            req.app.locals.credential = credential;
            const cookieOptions = {
                httpOnly: true,
                domain: 'localhost',
                path: '/',
                secure: false,
                sameSite: 'strict',
            };
            res.cookie("session_id", token, cookieOptions);
            return next();
        }
        return res.send("Token invalid!");
    }
    catch (err) {
        return res.send(err);
    }
};
exports.auth = auth;
