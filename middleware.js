module.exports.isLoggedIn=(req,res,next)=>{
     if(!req.isAuthenticated()){
    req.flash("error","You much have to be logged in!");
    return res.redirect("/login");
  }
  next();
}