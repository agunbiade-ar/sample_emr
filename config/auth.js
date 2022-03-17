module.exports = {
    ensureLoginAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg', 'Please Log in first to view that page')
        res.redirect('/auth/login')
    }, 
    ensureExceptLogOut: function(req, res, next){
        if(req.isAuthenticated()){
            return res.redirect('/welcome')
        }
        next()
    }    
}