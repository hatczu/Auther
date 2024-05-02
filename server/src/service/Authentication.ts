import { Request } from "express";
import { Users } from "../models/Users";
import { UsersRepo } from "../repository/UsersRepo";
import Authentication from "../utils/Authentication";

interface IAuthenticationService {
    login(email: string, password: string): Promise<string>;
    register(email: string, password: string, name: string, username: string): Promise<void>;
    delete(userId: number): Promise<void>;
    // update(userId: number, userData: Partial<Users>): Promise<void>;
    getCurrentUser(req: Request): Promise<Users | null>;
}

export class AuthenticationService implements IAuthenticationService {
    async login(email: string, password: string): Promise<string> {
        try {
            const user = await new UsersRepo().findByEmail(email);
    
            if (!user) {
                throw new Error("User not found.");
            }
            
            const isPasswordValid = await Authentication.passwordCompare(password, user.password);
    
            if (isPasswordValid) {
                return Authentication.generateToken(user.id, user.email, user.name, user.username);
            } else {
                throw new Error("Invalid password.");
            }
        } catch (error) {
            throw new Error("Failed to authenticate user."); // or return a custom error message
        }
    }    
    
    async register(email: string, password: string, name: string, username: string): Promise<void> {
        try {
            const hashedPassword: string = await Authentication.passwordHash(password);
            const newUser = new Users();
            newUser.email = email;
            newUser.password = hashedPassword;
            newUser.username = username;
            newUser.name = name;

            await new UsersRepo().save(newUser);
        } catch (error) {
            throw new Error("Error registering user!");
        }
    }

    async delete(userId: number): Promise<void> {
        try {
            await new UsersRepo().delete(userId);
        } catch (error) {
            throw new Error("Error deleting user!");
        }
    }

    // async update(userId: number, userData: Partial<Users>): Promise<void> {
    //     try {
    //         await new UsersRepo().update(userId, userData);
    //     } catch (error) {
    //         throw new Error("Error updating user!");
    //     }
    // }

    async getCurrentUser(req: Request): Promise<Users | null> {
        try {
            const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

            if (!token) {
                return null;
            }

            const decodedToken = Authentication.validateToken(token);
            if (!decodedToken) {
                return null;
            }

            const userId = decodedToken.userId;
            const user = await new UsersRepo().getById(userId);
            return user;
        } catch (error) {
            throw new Error("Error getting current user!");
        }
    }
}

export default AuthenticationService;
