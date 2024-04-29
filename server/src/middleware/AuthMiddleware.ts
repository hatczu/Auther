import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    if (!req.headers.authorization) {
        return res.status(401).send("No token!");
    }

    let secretKey = process.env.JWT_SECRET_KEY || "guess";
    const token: string = req.headers.authorization.split(" ")[1];

    try {
        const credential: string | object = jwt.verify(token, secretKey);
        if (credential) {
            req.app.locals.credential = credential;

            const cookieOptions: any = {
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
    } catch (err) {
        return res.send(err);
    }
};
