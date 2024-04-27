import { Users } from "../models/Users";

interface IUsersRepo {
    save(users: Users): Promise<void>;
    update(users: Users): Promise<void>;
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

    async update(users: Users): Promise<void> {
        try {
            const new_users = await Users.findOne({
                where: {
                    id: users.id,
                },
            });

            if (!new_users) {
                throw new Error("User not found.");
            }

            new_users.name = users.name;
            (new_users.username = users.username),
                (new_users.password = users.password),
                (new_users.email = users.email);

            await new_users.save();
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
}