const express = require( 'express' );
const app = express();
const path = require( 'path' );
const swig = require( 'swig' );
const routes = require( './routes/user' );

swig.setDefaults({ cache: false });
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/users', routes);

app.get('/', (req, res, next) => {
  res.render('index', { nav: 'home' });
});

module.exports = app;
