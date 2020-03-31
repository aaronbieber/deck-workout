var express = require('express');
var router = express.Router();
var User = require('../models/user')
var Workout = require('../models/workout')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/session', function(req, res, next) {
  console.log(req.session)
  if ('user' in req.session && 'id' in req.session.user) {
    verifyUser(req.session.user)
      .then((user => res.json(stripIdFromUser(user))))
  } else {
    res.status(404)
    res.end('Not logged in')
  }
})

router.post('/login', function(req, res, next) {
  console.log('session:')
  console.log(req.session)

  var userLogin = req.body;

  getOrCreateUser(userLogin)
    .then(user => {
      console.log('you are:')
      console.log(user)
      req.session.user = { id: user.id }
      res.json(user)
    })
})

router.get('/logout', function(req, res, next) {
  req.session = null
  res.end('Goodbye')
})

router.post('/save', function(req, res, next) {
  if (!('user' in req.session) || !verifyUser(req.session.user)) {
    res.status(401)
    res.end('You must be logged in')
  }

  console.log('i will save now')

  var workout = new Workout({
    userId: req.session.user.id,
    deck: req.body.deck,
    exercises: req.body.exercises,
    time: req.body.time,
    from: req.body.from
  })

  console.log(workout)

  workout.save()
    .then(resp => {
      console.log(resp)
      res.json(workout)
    })
    .catch(err => {
      console.log(err)
      res.status(500)
      res.json(err)
    })
})

router.get('/workouts', function(req, res, next) {
  if (!('user' in req.session) || !verifyUser(req.session.user)) {
    res.status(401)
    res.end('You must be logged in')
  }

  Workout.find({ userId: req.session.user.id })
    .sort('-created')
    .then(workouts => {
      console.log(workouts)
      res.json(workouts)
    })
})

router.get('/load/:workoutId', function(req, res, next) {
  Workout.findOne({ _id: req.params.workoutId })
    .then(workout => {
      console.log(workout)

      User.findOne({ googleId: workout.userId })
        .then(user => {
          console.log(user.toObject())

          res.json(Object.assign(workout.toObject(), {
            by: stripIdFromUser(user.toObject())
          }))
        })

      //res.json(workout)
    })
})

router.get('/attribute/:workoutId', function(req, res, next) {
  Workout.findOne({ _id: req.params.workoutId })
    .then(workout => {
      console.log(workout)
      console.log('retrieve user by id ' + workout.userId)
      User.findOne({ googleId: workout.userId })
        .then(user => {
          console.log(user)
          res.json({
            user: stripIdFromUser(user),
            created: workout.created,
            time: workout.time
          })
        })
    })
})

function stripIdFromUser(user) {
  return {
    id: user.googleId,
    name: user.name,
    email: user.email
  }
}

function userFromGoogleUser(googleUser) {
  return {
    id: googleUser.googleId,
    name: googleUser.name,
    email: googleUser.email
  }
}

async function getOrCreateUser(user) {
  var foundUser = await User.findOne({ googleId: user.id })

  if (foundUser !== null) {
    console.log('found the user')
    return userFromGoogleUser(foundUser);
  }

  console.log('did not find the user')
  return await User.create({
    name: user.name,
    email: user.email,
    googleId: user.googleId
  }).then(user => userFromGoogleUser(user))
    .catch(err => console.log(err))
}

async function verifyUser(user) {
  return await User.findOne({ googleId: user.id })
    .catch(err => console.log(err))
}

module.exports = router;
