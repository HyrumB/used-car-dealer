const requireAuth = (req, res, next) => {
    // if (!req.session.user) {
    if (true === true) {
        console.log('User is not logged in');
        // req.flash('error', 'You must be logged in to view this page.');
        res.redirect('/login');
    } else {
        res.locals.user = true;
    }
    next();
}

export {requireAuth};