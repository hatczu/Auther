import { Request, Response } from "express";
import { AuthenticationService } from "../service/Authentication";
import { UsersRepo } from "../repository/UsersRepo";
import Authentication from "../utils/Authentication";

class AuthenticationController {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await new AuthenticationService().login(email, password);
            if (token === "") {
                return res.status(400).json({
                    status: "Bad Request!",
                    message: "Wrong email or password!",
                });
            }
            const res_token = { type: "Bearer", token: token };

            res.cookie("token", token, {
                httpOnly: true,
                domain: 'localhost',
                path: '/',
                secure: false,
                sameSite: 'strict',
            });
            return res.status(200).json({
                status: "Ok!",
                message: "Successfully login!",
                result: res_token,
            });
        } catch (error: any) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: error.message,
            });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { name, username, email, password } = req.body;

            await new AuthenticationService().register(
                email,
                password,
                name,
                username
            );

            return res.status(200).json({
                status: "Ok!",
                message: "Successfully registered user!",
            });
        } catch (error: any) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: error.message,
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            // Get user info from the token
            const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

            if (!token) {
                return res.status(404).json({
                    status: "Not Found!",
                    message: "Token not found!",
                });
            }

            const decodedToken = Authentication.validateToken(token); 
            // Find user by email extracted from token
            const currentUser = await new UsersRepo().findByEmail(decodedToken?.email as string);

            if (!currentUser) {
                return res.status(404).json({
                    status: "Not Found!",
                    message: "User not found!",
                });
            }

            // Delete the user
            await new UsersRepo().delete(currentUser.id);

            return res.status(200).json({
                status: "Ok!",
                message: "User deleted successfully!",
            });
        } catch (error: any) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: error.message,
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { body } = req;

            if (body.password) {
                body.password = await Authentication.passwordHash(body.password);
            }

            await new UsersRepo().update(id as any, req.body);
    
            return res.status(200).json({
                status: "Ok!",
                message: "User updated successfully!",
            });
        } catch (error: any) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: error.message,
            });
        }
    }


    async getCurrentUser(req: Request, res: Response) {
        try {
            // Get token from request headers or cookies
            const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

            if (!token) {
                return res.status(404).json({
                    status: "Not Found!",
                    message: "Token not found!",
                });
            }

            const decodedToken = Authentication.validateToken(token); 
            // Find user by email extracted from token
            const currentUser = await new UsersRepo().findByEmail(decodedToken?.email as string);

            if (!currentUser) {
                return res.status(404).json({
                    status: "Not Found!",
                    message: "User not found!",
                });
            }

            return res.status(200).json({
                status: "Ok!",
                message: "Current user retrieved successfully!",
                result: currentUser,
            });
        } catch (error: any) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: error.message,
            });
        }
    }
}

export default new AuthenticationController();
