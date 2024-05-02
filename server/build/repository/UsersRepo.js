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
exports.UsersRepo = void 0;
const Users_1 = require("../models/Users");
class UsersRepo {
    save(users) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Users_1.Users.create({
                    name: users.name,
                    username: users.username,
                    password: users.password,
                    email: users.email,
                });
            }
            catch (error) {
                throw new Error("Failed to create user.");
            }
        });
    }
    // async update(id:number, updates:any): Promise<void> {
    //     try {
    //         const new_users = await Users.findOne({
    //             where: {
    //                 id
    //             },
    //         });
    //         if (!new_users) {
    //             throw new Error("User not found.");
    //         }
    //         new_users.name = updates.name;
    //         (new_users.username = updates.username),
    //             (new_users.password = updates.password),
    //             (new_users.email = updates.email);
    //         await new_users.save();
    //     } catch (error) {
    //         throw new Error("Failed to update user.");
    //     }
    // }
    update(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Users_1.Users.findByPk(userId); // Assuming findByPk is a method to find a user by primary key
                if (!user) {
                    throw new Error("User not found.");
                }
                yield user.update(userData); // Update the user with provided data
            }
            catch (error) {
                throw new Error("Failed to update user.");
            }
        });
    }
    delete(usersId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_users = yield Users_1.Users.findOne({
                    where: {
                        id: usersId,
                    },
                });
                if (!new_users) {
                    throw new Error("Users not found");
                }
                yield new_users.destroy();
            }
            catch (error) {
                throw new Error("Failed to delete user.");
            }
        });
    }
    getById(usersId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_users = yield Users_1.Users.findOne({
                    where: {
                        id: usersId,
                    },
                });
                if (!new_users) {
                    throw new Error("User not found.");
                }
                return new_users;
            }
            catch (error) {
                throw new Error("Failed to delete user.");
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Users_1.Users.findAll();
            }
            catch (error) {
                throw new Error("Failed to fetch all data.");
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_users = yield Users_1.Users.findOne({
                    where: { email: email },
                });
                if (!new_users) {
                    throw new Error("User not found.");
                }
                return new_users;
            }
            catch (error) {
                throw new Error("Failed to fetch data by email.");
            }
        });
    }
    deleteByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Users_1.Users.findOne({
                    where: {
                        email: email,
                    },
                });
                if (!user) {
                    throw new Error("User not found.");
                }
                yield user.destroy();
            }
            catch (error) {
                throw new Error("Failed to delete user by email.");
            }
        });
    }
}
exports.UsersRepo = UsersRepo;
