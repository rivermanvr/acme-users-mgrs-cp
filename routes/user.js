const express = require( 'express' );
const db = require( '../db' )
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('users', { nav: 'users' });
});

router.get('/managers', (req, res, next) => {
  res.render('managers', { nav: 'managers' });
});

router.post('/', (req, res, next) => {
  const isMgr = (req.body.isMgr) ? 'Y' : 'N';
  db.add(req.body.name, isMgr)
  res.redirect('/users')
});

router.put('/:id', (req, res, next) => {
  db.change(req.params.id, 'Y')
  res.redirect('/users');
});

router.put('/managers/:id', (req, res, next) => {
  db.change(req.params.id, 'N')
  res.redirect('/users/managers');
});

router.delete('/:id', (req, res, next) => {
  db.remove(req.params.id);
  res.redirect('/users');
});

module.exports = router;
