var mongoose = require('mongoose');
const { session } = require('passport');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');

// Get user
router.get('/user', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401).json("Unauthorized"); }

    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

// Put user
router.put('/user', auth.required, function (req, res, next) {
  let emailChanged, usernameChanged = false;
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401).json("Unauthorized"); }

    // only update fields that were actually passed...
    if (typeof req.body.user.username !== 'undefined') {
      usernameChanged = req.body.user.username !== user.username;
      user.username = req.body.user.username;
    }
    if (typeof req.body.user.email !== 'undefined') {
      emailChanged = req.body.user.email !== user.email;
      user.email = req.body.user.email;
    }
    if (typeof req.body.user.bio !== 'undefined') {
      user.bio = req.body.user.bio;
    }
    if (typeof req.body.user.image !== 'undefined') {
      user.image = req.body.user.image;
    }
    if (typeof req.body.user.password !== 'undefined') {
      user.setPassword(req.body.user.password);
    }

    if (usernameChanged || emailChanged) {
      User.find({ $or: [{ email: req.body.user.email }, { username: req.body.user.username }] })
        .then((user) => {
          if (user[0]) return res.status(422).json("The email or username is already taken");
          else {
            user.save().then(function () {
              return res.json({ user: user.toAuthJSON() });
            }).catch(next);
          }
        }).catch(next);
    } else {
      user.save().then(function () {
        return res.json({ user: user.toAuthJSON() });
      }).catch(next);
    }
  });
});

// Login user
router.post('/users/login', function (req, res, next) {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }
    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

// Register
router.post('/users', function (req, res, next) {
  // We search if the username or email is already taken
  User.find({ $or: [{ email: req.body.user.email }, { username: req.body.user.username }] })
    .then((user) => {
      if (user[0]) return res.status(422).json("The email or username is already taken");
      else {
        var user = new User();

        user.username = req.body.user.username;
        user.email = req.body.user.email;
        user.setPassword(req.body.user.password);
        user.type = false;

        user.save().then(function () {
          return res.json({ user: user.toAuthJSON() });
        }).catch(next);
      }
    }).catch(next);
})

// Social login
router.post("/users/sociallogin", function (req, res, next) {
  let memorystore = req.sessionStore;
  let sessions = memorystore.sessions;
  let sessionUser;

  for (var key in sessions) {
    sessionUser = (JSON.parse(sessions[key]).passport.user)
  }

  User.findOne({ '_id': sessionUser }, function (err, user) {
    console.log(user);
    if (err) {
      return done(err);
    }

    if (user) {
      return res.json({ user: user.toAuthJSON() })
    } else
      return res.status(422).json(err);
  })
})

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: 'http://localhost:4000/#!/auth/sociallogin',
    failureRedirect: '/'
  }));

router.get('/auth/googleplus', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ]
}));
router.get('/auth/googleplus/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:4000/#!/auth/sociallogin',
    failureRedirect: '/'
  }));

module.exports = router;
