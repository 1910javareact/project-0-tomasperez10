import express from 'express';
import * as rservices from '../services/reimbursement-services';
import { authorization } from '../middleware/auth-middleware';
import { loggingMiddleware } from '../middleware/logging-middleware';

export const reimbursementRouter = express.Router();

reimbursementRouter.get('/status/:statusId', authorization([1], true), loggingMiddleware,
    async (req, res) => {
    const statusId = +req.params.statusId;
    if (isNaN(statusId)) {
        res.status(400).send('Invalid Status Id');
    } else {
        try {
            const reimbursements = await rservices.getReimbursementsByStatusId(statusId);
            res.json(reimbursements);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }
});

reimbursementRouter.get('/author/userId/:userId', authorization([1], true), loggingMiddleware,
    async (req, res) => {
    const userId = +req.params.userId;
    if (isNaN(userId)) {
        res.status(400).send('Invalid User Id');
    } else {
        try {
            const reimbursements = await rservices.getReimbursementsByUserId(userId);
            res.json(reimbursements);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }
});

reimbursementRouter.post('', authorization([1, 2, 3], true), loggingMiddleware,
    async (req, res) => {
    const {body} = req;
    try {
        const post = {
            author: req.session.user.userId,
            amount: body.amount,
            dateSubmitted: 22,
            description: body.description,
            type: body.type
        };
        for (const key in post) {
            if (post[key] === undefined) {
                throw Error;
            }
        }
        try {
            const newPost = await rservices.postReimbursement(post);
            res.status(201).json(newPost);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    } catch {
        res.status(400).send('Please fill out all request fields');
    }
});

reimbursementRouter.patch('', authorization([1], true), loggingMiddleware,
    async (req, res) => {
    const {body} = req;
    try {
        const patch = {
            reimbursementId: body.reimbursementId,
            dateResolved: 23,
            resolver: req.session.user.userId,
            status: body.status
        };
        for (const key in patch) {
            if (patch[key] === undefined) {
                throw Error;
            }
        }
        try {
            const newPost = await rservices.patchReimbursement(patch);
            res.status(201).json(newPost);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    } catch {
        res.status(400).send('Please enter Status Id and Reimbursement Id');
    }
});