// require passport
const passport = require('passport');
//authentication
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    async function(email, password, done){
        // find a user and establish the identity
        let user = await User.findOne({email : email});
        if(!user || user.password != password){
            console.log('Invalid username/password');
            return done(null, false);
        }
        return done(null, user);
    }
));

// serializing the user
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user
passport.deserializeUser(async function(id, done){
    let userId = await User.findById(id);
    done(null, userId);
});

// Checking authentication
passport.checkAuthentication = function (req, res, next){
    // if user is signed in , then pass the request
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

// Setting authentication
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
    // sending current signed in user to the locals for views
        res.locals.user = req.user
    }
    next();
}
module.exports = passport;  