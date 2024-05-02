import { Users } from "../models/Users";

interface IUsersRepo {
    save(users: Users): Promise<void>;
    update(userId: number, userData: Partial<Users>): Promise<void>;
    delete(usersId: number): Promise<void>;
    getById(usersId: number): Promise<Users>;
    getAll(): Promise<Users[]>;
    findByEmail(email: string): Promise<Users>;
}

export class UsersRepo implements IUsersRepo {
    async save(users: Users): Promise<void> {
        try {
            await Users.create({
                name: users.name,
                username: users.username,
                password: users.password,
                email: users.email,
            });
        } catch (error) {
            throw new Error("Failed to create user.");
        }
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
    

    async update(userId: number, userData: Partial<Users>): Promise<void> { // Method signature modified
        try {
            const user = await Users.findByPk(userId); // Assuming findByPk is a method to find a user by primary key
            if (!user) {
                throw new Error("User not found.");
            }

            await user.update(userData); // Update the user with provided data
        } catch (error) {
            throw new Error("Failed to update user.");
        }
    }

    async delete(usersId: number): Promise<void> {
        try {
            const new_users = await Users.findOne({
                where: {
                    id: usersId,
                },
            });

            if (!new_users) {
                throw new Error("Users not found");
            }
            await new_users.destroy();
        } catch (error) {
            throw new Error("Failed to delete user.");
        }
    }

    async getById(usersId: number): Promise<Users> {
        try {
            const new_users = await Users.findOne({
                where: {
                    id: usersId,
                },
            });

            if (!new_users) {
                throw new Error("User not found.");
            }

            return new_users;
        } catch (error) {
            throw new Error("Failed to delete user.");
        }
    }

    async getAll(): Promise<Users[]> {
        try {
            return await Users.findAll();
        } catch (error) {
            throw new Error("Failed to fetch all data.");
        }
    }

    async findByEmail(email: string): Promise<Users> {
        try {
            const new_users = await Users.findOne({
                where: { email: email },
            });
            if (!new_users) {
                throw new Error("User not found.");
            }
            return new_users;
        } catch (error) {
            throw new Error("Failed to fetch data by email.");
        }
    }
    
    async deleteByEmail(email: string): Promise<void> {
        try {
            const user = await Users.findOne({
                where: {
                    email: email,
                },
            });

            if (!user) {
                throw new Error("User not found.");
            }

            await user.destroy();
        } catch (error) {
            throw new Error("Failed to delete user by email.");
        }
    }
}