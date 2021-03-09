const db = require('./db/models');

const logInUser = (req, res, user) => {
    req.session.auth = { userId: user.id};
}

const logOutUser = (req, res) => {
    delete req.session.auth;
}

const restoreUser = async (req, res, next) => {
    if (req.session.auth) {
        const { userId } = req.session.auth;
        try {
            const user = await db.User.findByPk(userId);
            if (user) {
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }
        } catch (errors) {
            res.locals.authenticated = false;
            next(errors)
        }
    } else {
        res.locals.authenticated = false;
        next();
    }
}

const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.redirect("/users/login");
    }
    return next();
}

module.exports = { logInUser, logOutUser, restoreUser, requireAuth }
