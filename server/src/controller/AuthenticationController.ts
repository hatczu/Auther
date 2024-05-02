import { Request, Response } from "express";
import { AuthenticationService } from "../service/Authentication";
import { UsersRepo } from "../repository/UsersRepo";

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
        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
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
        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
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

            // Find user by email extracted from token
            const currentUser = await new UsersRepo().findByEmail(token);

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
        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }
    }

    // async update(req: Request, res: Response) {
    //     try {
    //         const { id, name, username, email, password } = req.body;
    
    //         // Create an object with the data to update
    //         const userData = { name, username, email, password };
    
    //         // Update user using UsersRepo by providing userId and userData
    //         await new UsersRepo().update(id, userData);
    
    //         return res.status(200).json({
    //             status: "Ok!",
    //             message: "User updated successfully!",
    //         });
    //     } catch (error) {
    //         return res.status(500).json({
    //             status: "Internal server Error!",
    //             message: "Internal server Error!",
    //         });
    //     }
    // }


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

            // Find user by email extracted from token
            const currentUser = await new UsersRepo().findByEmail(token);

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
        } catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }
    }
}

export default new AuthenticationController();
