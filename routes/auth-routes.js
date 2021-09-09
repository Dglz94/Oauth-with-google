const router = require("express").Router();
const passport = require("passport");

//Auth Login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

//Auth logout
router.get("/logout", (req, res) => {
  //handle passport
  req.logout();
  res.redirect("/");
});

//Auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

//callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  //   res.send(req.user);
  res.redirect("/profile/");
});

module.exports = router;
