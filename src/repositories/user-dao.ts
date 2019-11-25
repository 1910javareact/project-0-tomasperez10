import { User } from '../models/user';
import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { userDTOtoUser, multiUserDTOConverter } from '../util/Userdto-to-user';

export async function daoGetUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.userstring NATURAL JOIN project0.user_roles NATURAL JOIN project0.roles WHERE username = $1 and "password" = $2',
            [username, password]);
        if (result.rowCount === 0) {
            throw 'Invalid Credentials';
        } else {
            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        console.log(e);

        if (e === 'Invalid credentials') {
            throw{
                status: 401,
                message: 'Invalid Credentials'
            };
        } else {
            throw{
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}

export async function daoGetUsers() {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.userstring NATURAL JOIN project0.user_roles NATURAL JOIN project0.roles ORDER BY user_id');
        if (result.rowCount === 0) {
            throw 'Sorry, there are no users available';
        } else {
            return multiUserDTOConverter(result.rows);
        }
    } catch (e) {
        if (e === 'Sorry, there are no users available') {
            throw{
                status: 400,
                message: 'Sorry, there are no users available'
            };
        } else {
            throw{
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}

export async function daoGetUserById(id: number) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.userstring NATURAL JOIN project0.user_roles NATURAL JOIN project0.roles where user_id = $1',
            [id]);
        if (result.rowCount === 0) {
            throw 'No such user';
        } else {
            return userDTOtoUser(result.rows);
        }
    } catch (e) {
        if (e === 'No such user') {
            throw{
                status: 404,
                message: 'No such user'
            };
        } else {
            throw{
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client && client.release();
    }
}

export async function daoUpdateUser(newUser: User) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        client.query('BEGIN');
        await client.query('UPDATE project0.userstring SET username = $1, "password" = $2, firstname = $3, lastname = $4, email = $5 WHERE user_id = $6',
            [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.userId]);
        for (const role of newUser.roles) {
        await client.query('INSERT INTO project0.user_roles values ($3,$4)',
            [role.roleId]);
        }
        client.query('COMMIT');
    } catch (e) {
        client.query('ROLLBACK');
        throw{
            status: 500,
            message: 'Internal server error'
        };
    } finally {
        client && client.release();
    }
}
