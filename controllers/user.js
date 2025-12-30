const User = require("../models/user.js");

// Render Signup Form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// Signup User
module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(newUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to HOMEIGO");
            return res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

// Render Login Form
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// Login User
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to HOMEIGO!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// Logout User
module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
};
