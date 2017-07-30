const express = require( 'express' );
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('users', { nav: 'users' });
});

router.get('/managers', (req, res, next) => {
  res.render('managers', { nav: 'managers' });
});

router.post('/', (req, res, next) => {
  //code add a user
  res.redirect('/users');
});

router.put('/users/:id', (req, res, next) => {
  //code make mgr
  res.redirect('/users/managers');
});

router.put('/users/managers/:id', (req, res, next) => {
  //code remove as manager
  res.redirect('/users/managers');
});

router.delete('/users/:id', (req, res, next) => {
  //code delete user
  res.redirect('/users/managers');
});

module.exports = router;
