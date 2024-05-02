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
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = require("../service/Authentication");
const UsersRepo_1 = require("../repository/UsersRepo");
class AuthenticationController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield new Authentication_1.AuthenticationService().login(email, password);
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
            }
            catch (error) {
                return res.status(500).json({
                    status: "Internal server Error!",
                    message: "Internal server Error!",
                });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, username, email, password } = req.body;
                yield new Authentication_1.AuthenticationService().register(email, password, name, username);
                return res.status(200).json({
                    status: "Ok!",
                    message: "Successfully registered user!",
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Internal server Error!",
                    message: "Internal server Error!",
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Get user info from the token
                const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || req.cookies.token;
                if (!token) {
                    return res.status(404).json({
                        status: "Not Found!",
                        message: "Token not found!",
                    });
                }
                // Find user by email extracted from token
                const currentUser = yield new UsersRepo_1.UsersRepo().findByEmail(token);
                if (!currentUser) {
                    return res.status(404).json({
                        status: "Not Found!",
                        message: "User not found!",
                    });
                }
                // Delete the user
                yield new UsersRepo_1.UsersRepo().delete(currentUser.id);
                return res.status(200).json({
                    status: "Ok!",
                    message: "User deleted successfully!",
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Internal server Error!",
                    message: "Internal server Error!",
                });
            }
        });
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
    getCurrentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Get token from request headers or cookies
                const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || req.cookies.token;
                if (!token) {
                    return res.status(404).json({
                        status: "Not Found!",
                        message: "Token not found!",
                    });
                }
                // Find user by email extracted from token
                const currentUser = yield new UsersRepo_1.UsersRepo().findByEmail(token);
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
            }
            catch (error) {
                return res.status(500).json({
                    status: "Internal server Error!",
                    message: "Internal server Error!",
                });
            }
        });
    }
}
exports.default = new AuthenticationController();
