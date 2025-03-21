const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        console.log('User is not logged in');
        req.flash('error', 'You must be logged in to view this page.');
        return res.redirect('/accounts/login');
    } else {
        res.locals.user = true;
    }
    next();
}

export {requireAuth};