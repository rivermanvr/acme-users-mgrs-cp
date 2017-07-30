const express = require( 'express' );
const app = express();
const path = require( 'path' );
const swig = require( 'swig' );
const db = require( './db' );
const bodyParser = require( 'body-parser' );
const methodOverride = require( 'method-override' );
const routes = require( './routes/user' );

swig.setDefaults({ cache: false });
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use((req, res, next) => {
  db.listUsers()
    .then(users => {
      res.locals.users = users;
      res.locals.userLen = users.length;
      return db.listMgrs()
    })
    .then( managers => {
      res.locals.managers = managers;
      res.locals.mgrLen = managers.length;
      return next();
    })
})

app.use('/users', routes);

app.get('/', (req, res, next) => {
  res.render('index', { nav: 'home' });
});

module.exports = app;
