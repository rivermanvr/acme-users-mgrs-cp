const express = require( 'express' );
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('users', { nav: 'users' });
});

router.get('/managers', (req, res, next) => {
  res.render('managers', { nav: 'managers' });
});

module.exports = router;
