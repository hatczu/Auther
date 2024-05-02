"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "No token provided" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY || "guess";
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        if (!decodedToken) {
            return res.status(401).json({ error: "Invalid token" });
        }
        // Store the decoded token in app.locals for access in subsequent middleware/routes
        req.app.locals.decodedToken = decodedToken;
        // Proceed to the next middleware/route handler
        next();
    }
    catch (err) {
        // Handle token verification errors
        return res.status(401).json({ error: "Token verification failed" });
    }
};
exports.auth = auth;
