var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next) {
  console.log('why hello')
  req.app.locals.db.collection('users').find({})
    .toArray((e, docs) => {
      res.json(docs);
    })
})

module.exports = router;
