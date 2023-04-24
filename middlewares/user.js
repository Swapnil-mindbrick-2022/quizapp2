const User = require('../models/user')

function canditate(req,res,next) {
    if(req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/')
}
module.exports = canditate
