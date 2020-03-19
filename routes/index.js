var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  console.log('session:')
  console.log(req.session)

  var userLogin = req.body.user;

  getOrCreateUser(userLogin)
    .then(user => {
      console.log('you are:')
      console.log(user)
      req.session.user = { id: user.googleId }
      res.end('complete')
    })
})

async function getOrCreateUser(user) {
  var foundUser = await User.findOne({ googleId: user.googleId })

  if (foundUser !== null) {
    console.log('found the user')
    return foundUser;
  }

  console.log('did not find the user')
  return await User.create({
    name: user.name,
    email: user.email,
    googleId: user.googleId
  }).catch(err => console.log(err))
}

module.exports = router;
