// This page is for user to render sign-in,sign-up and forget-password

const User = require('../models/user');

// redirects the user to sign up page
module.exports.signUp = async function(req, res) {
    try {
        return res.render('user_sign_up', {              //rendering sign-up 
            title: "Sign Up"
        });
    } catch (error) {
        console.log('Error in usersController/signUp: ', error);
        return res.redirect('back');
    }
}

// redirects the user to sign in page
module.exports.signIn = async function(req, res) {
    try {
        return res.render('user_sign_in', {              //rendering sign-in
            title: "Sign In"
        });
    } catch (error) {
        console.log('Error in usersController/signIn: ', error);
        return res.redirect('back');
    }
}

// creates a new user
module.exports.create = async function(req, res) {
    try {
        // console.log(req.body);
        if(req.body.password != req.body.confirm_password) {
            // console.log(req.body);
            console.log('Password mismatch!');
            req.flash('error', 'Password mismatch');//flash msg
            return res.redirect('back');
        }
        let user = await User.findOne({ email: req.body.email });
        // if user is not present 
        if (!user) {
            // create the user 
            await User.create(req.body);
            // redirect to sign in page
            return res.redirect("/users/sign-in");
        }
        console.log('User is already present');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in creating the user ', error);
        return res.redirect('back');
    }
}

// signs in existing user
module.exports.createSession = async function(req, res) {
    req.flash('success', 'You are logged in!');//flash msg
    return res.redirect('/');
}

// sign out
module.exports.destroySession = async function(req, res, done) {
    req.logout((err) => {
        if (err) {
            return done(err);
        }
    });
    req.flash('success' , 'You are logged out!'); //flash msg
    return res.redirect('/users/sign-in');
}

// redirects the user to foget password page
module.exports.forgetPassword = async function(req, res) {
    try {
        //rendering forget-password
        return res.render('forget_password', {
            title: "Reset Password"
        });
    } catch (error) {
        console.log('Error in usersController/forgetPassword: ', error);
        return res.redirect('back');
    }
}

// reset password
module.exports.resetPassword = async function(req, res) {
    try {
        let user = await User.findOne({email : req.body.email});

        if(!user) {
            return res.render('/users/sign-up')
        }
        if(req.body.password==req.body.confirm_password) {
            user.password = req.body.password;
            await user.updateOne({password : req.body.password});
            req.flash('success', 'Password changed successfully'); //flash msg
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log('Error in habitController/resetPassword: ', error);
        return;
    }
}