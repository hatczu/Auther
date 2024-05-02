import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token: string = req.headers.authorization.split(" ")[1];
    const secretKey: string = process.env.JWT_SECRET_KEY || "guess";

    try {
        const decodedToken: any = jwt.verify(token, secretKey);
        if (!decodedToken) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // Store the decoded token in app.locals for access in subsequent middleware/routes
        req.app.locals.decodedToken = decodedToken;

        // Proceed to the next middleware/route handler
        next();
    } catch (err) {
        // Handle token verification errors
        return res.status(401).json({ error: "Token verification failed" });
    }
};
