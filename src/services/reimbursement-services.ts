import * as rdao from '../repositories/reimbursement-dao';

export function getReimbursementsByStatusId(statusId: number) {
    try {
    return rdao.daoGetReimbursementsByStatusId(statusId);
    } catch (e) {
        throw e;
    }
}

export function getReimbursementsByUserId(userId: number) {
    try {
        return rdao.daoGetReimbursementsByUserId(userId);
    } catch (e) {
        throw e;
    }
}

export function postReimbursement(post) {
    try {
        return rdao.daoPostReimbursement(post);
    } catch (e) {
        throw e;
    }
}

export async function patchReimbursement(patch) {
    try {
    const post = await rdao.daoGetReimbursementsByReimbursementId(patch.reimbursementId);
    for (const key in post) {
        if (patch.hasOwnProperty(key)) {
            post[key] = patch[key];
        }
    }
    return await rdao.daoPatchReimbursement(post);
} catch (e) {
    throw e;
}
}