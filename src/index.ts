import express from 'express';
import bodyparser from 'body-parser';
import { userRouter } from './routers/user-router';
import { reimbursementRouter } from './routers/reimbursement-router';
import { getUserByUsernameAndPassword } from './services/user-service';
import { sessionMiddleware } from './middleware/session-middleware';

const app = express();

app.use(bodyparser.json());

app.use(sessionMiddleware);

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400).send('Invalid Credentials');
        return;
    }

    try {
        const user = await getUserByUsernameAndPassword(username, password);
        req.session.user = user;
        res.json(user);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});

app.use('/users', userRouter);

app.use('/reimbursements', reimbursementRouter);

app.listen(4400, () => {
    console.log(`app has started`);
});