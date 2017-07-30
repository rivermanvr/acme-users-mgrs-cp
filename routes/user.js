const express = require( 'express' );
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('users', { nav: 'users' });
});

router.get('/managers', (req, res, next) => {
  res.render('managers', { nav: 'managers' });
});

router.post('/', (req, res, next) => {
  res.send('posted a new user');  
  //res.redirect('/users');
});

module.exports = router;
