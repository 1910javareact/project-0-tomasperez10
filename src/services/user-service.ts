import { User } from '../models/user';
import { daoGetUserByUsernameAndPassword, daoGetUsers, daoGetUserById, daoUpdateUser } from '../repositories/user-dao';

export async function getUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    try {
        return await daoGetUserByUsernameAndPassword(username, password);
    } catch (e) {
        throw e;
    }
}

export async function getUsers(): Promise<User[]> {
    try {
        return await daoGetUsers();
    } catch (e) {
        throw e;
    }
}

export function getUserById(userId: number): Promise<User> {
    console.log('Service: you are searching for user' + userId);

    try {
        return daoGetUserById(userId);
    } catch (e) {
        throw e;
    }
}

export async function updateUser(req: User) {
    try {
        const user = await daoGetUserById(req.userId);
        for (const key in req) {
            if (req[key] !== undefined && user.hasOwnProperty(key)) {
                user[key] = req[key];
            }
        }
        daoUpdateUser(user);
        return user;
    } catch (e) {
        throw e;
    }
}