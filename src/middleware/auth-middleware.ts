export function authorization(roleIds: number[], userIds: boolean) {
    return (req, res, next) => {
        let isAuth = false;

        if (!req.session.user) {
            res.status(401).send('Please Login');
            return;
        }
        for (const userRole of req.session.user.roles) {
            if (roleIds.includes(userRole.roleId)) {
                isAuth = true;
            }
        }

        if (userIds) {
            const userId = +req.params.userId;
            if (!isNaN(userId)) {
                if (req.session.user.userIds === userId) {
                    isAuth = true;
                }
            }
        }
        if (isAuth) {
            next();
        } else {
            res.status(401).send('Session expired');
        }
    };
}