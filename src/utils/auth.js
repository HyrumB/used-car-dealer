const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'You must be logged in to view this page.');
        return res.redirect('/accounts/login');
    } else {
        res.locals.user = true;
    }
    next();
}

const requireAuthTrusted = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'You must be logged in to view this page.');
        return res.redirect('/accounts/login');

    } else if (!(req.session.user_role == 2 || req.session.user_role == 3)) {
        req.flash('error', 'You not allowed to view this page.');
        return res.redirect('/accounts/login');

    } else {
        res.locals.user = true;
    }
    next();
}

const requireAuthAdmin = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'You must be logged in to view this page.');
        return res.redirect('/accounts/login');

    } else if (req.session.user_role != 3) {
        req.flash('error', 'You not allowed to view this page.');
        return res.redirect('/accounts/login');
    } else {
        res.locals.user = true;
    }
    next();
}



export {requireAuth, requireAuthTrusted, requireAuthAdmin};