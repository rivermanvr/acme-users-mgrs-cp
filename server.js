const http = require( 'http' );
const app = require( './app' );
const db = require( './db' );
const server = http.createServer(app);

const port = process.env.PORT || 3001;

db.seed()
  .then(() => console.log('seeding done'))
  .then(() => server.listen(port, () => console.log(`Listening on ${port}`)))
  .catch(err => console.log(err));
