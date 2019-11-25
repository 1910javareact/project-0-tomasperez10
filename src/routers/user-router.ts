import express from 'express';
import * as uservices from '../services/user-service';
import { authorization } from '../middleware/auth-middleware';
import { loggingMiddleware } from '../middleware/logging-middleware';

export const userRouter = express.Router();

userRouter.get('', authorization([1], true), loggingMiddleware,
    async (req, res) => {
    try {
        const users = await uservices.getUsers();
        res.json(users);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});


userRouter.get('/:userid', authorization([1], true), loggingMiddleware,
    async (req, res) => {
    const userId = +req.params.userId;
    if (isNaN(userId)) {
        res.status(400).send('Invalid Id');
    } else {
        try {
            const user = await uservices.getUserById(userId);
            res.json(user);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }
});

userRouter.patch('', authorization([2], true), loggingMiddleware,
    async (req, res) => {
    try {
        const {body} = req;
        const user = await uservices.updateUser(body);
        res.status(200).json(user);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});