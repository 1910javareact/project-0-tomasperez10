import { Reimbursement } from '../models/reimbursement';
import { reimbursementDTOtoReimbursement, multiReimbursementDTOConverter } from '../util/reimbursementdto-to-reimbursement';
import { connectionPool } from '.';
import { PoolClient } from 'pg';


export async function daoGetReimbursementsByStatusId(statusId: number) {

    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.reimbursement NATURAL JOIN project0.user_reimbursement_status NATURAL JOIN project0.user_reimbursement_type WHERE status_id = $1 ORDER BY amount DESC',
            [statusId]);
        if (result.rowCount === 0) {
            throw 'No reimbursements found';
        } else {
            return multiReimbursementDTOConverter(result.rows);
        }
    } catch (e) {
        if (e === 'No reimbursements found') {
            throw {
                status: 404,
                message: 'No reimbursements found'
            };
        } else {
            throw{
                status: 500,
                message: 'Internal server error'
            };
        }
    } finally {
        client.release();
    }
}

export async function daoGetReimbursementsByUserId(userId: number) {
    let client: PoolClient;

    try {

        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.reimbursement NATURAL JOIN project0.user_reimbursement_status NATURAL JOIN project0.user_reimbursement_type WHERE author = $1 ORDER BY amount DESC',
            [userId]);
        if (result.rowCount === 0) {
            throw 'No reimbursements found';
        } else {
            return multiReimbursementDTOConverter(result.rows);
        }
    } catch (e) {
        if (e === 'No reimbursements found') {

            throw {

                status: 404,

                message: 'No reimbursements found'

            };
        } else {
            throw{
                status: 500,
                message: 'Internal server error'
            };
        }
    } finally {
        client.release();
    }
}

export async function daoPostReimbursement(post) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        client.query('BEGIN');

        await client.query('INSERT INTO project0.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status_id, type_id) values ($1,$2,$3,$4,$5,$6,$7,$8)',
            [post.author, post.amount, post.dateSubmitted, post.dateResolved, post.description, post.status, post.type]);
        const result = await client.query('SELECT * FROM project0.reimbursement WHERE author = $1 ORDER BY reimbursement_id DESC LIMIT 25 OFFSET 1',
            [post.author]);
        client.query('COMMIT');

        return reimbursementDTOtoReimbursement(result.rows);
    } catch (e) {
        client.query('ROLLBACK');
        throw{
            status: 500,
            message: 'Internal server error'
        };
    } finally {
        client.release();
    }
}

export async function daoGetReimbursementsByReimbursementId(reimbursementId: number) {
    let client: PoolClient;

    try {

        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0.reimbursement WHERE reimbursement_id = $1',
            [reimbursementId]);
        if (result.rowCount === 0) {
            throw 'No reimbursements found';
        } else {
            return reimbursementDTOtoReimbursement(result.rows);
        }
    } catch (e) {
        if (e === 'No reimbursements found') {
            throw{
                status: 404,
                message: 'No reimbursements found'
            };
        } else {
            throw{
                status: 500,
                message: 'Internal server error'
            };
        }
    } finally {
        client.release();
    }
}

export async function daoPatchReimbursement(reimbursementUpdate: Reimbursement) {
    let client: PoolClient;

    try {

        client = await connectionPool.connect();

        await client.query('UPDATE project0.reimbursement SET date_resolved = $1, resolver = $2, status_id = $3 WHERE reimbursement_id = $4',
            [reimbursementUpdate.resolver, reimbursementUpdate.status, reimbursementUpdate.reimbursementId]);
        return await daoGetReimbursementsByReimbursementId(reimbursementUpdate.reimbursementId);
    } catch (e) {
        if (e === 'No reimbursements found') {
            throw{
                status: 404,
                message: 'No reimbursements found'
            };
        } else {
            throw{
                status: 500,
                message: 'Internal server error'
            };
        }
    } finally {
        client.release();
    }
}
