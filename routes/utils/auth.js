module.exports = {

    checkAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },
    
    checkNotAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return res.redirect('/')
        }
        next();
    },

    changeAuth: function(req, res, next) {
        req.app.locals.userAuthenticated = req.app.locals.userAuthenticated ? false : true;
        next();
    }

};