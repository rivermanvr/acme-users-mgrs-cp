const db = require( './db' );

const sync = () => {
  const sql = `
    DROP TABLE IF EXISTS users;
    CREATE TABLE users(
      id serial PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      isMgr TEXT NOT NULL,
      manager INTEGER
    );
  `;
  return db.query(sql);
}

// .......SEEDING THE DB..........

const createUser = (name, isMgr, manager) => {
  let sql = ``;
  if (!manager) sql = `insert into users (name, ismgr) values ('${name}', '${isMgr}')`
  else sql = `insert into users (name, ismgr, manager) values ('${name}', '${isMgr}', '${manager}')`
  return db.query(sql)
}

const seedUsers = () => {
  const name = ['Moe', 'Larry', 'Curly', 'Shep', 'Vince'];
  const isMgr = ['Y', 'N', 'N', 'Y', 'N'];
  const manager = [4, null, 1, null, 4];
  const promiseArr = [];
  for (let i = 0; i < name.length; i++) {
    promiseArr.push(createUser(name[i], isMgr[i], manager[i]));
  }
  return Promise.all(promiseArr);
}

const seed = () => {
  return db.connect()
    .then(() => sync())
    .then(() => seedUsers())
};

const listUsers = () => {
  return db.query(`select * from users`)
    .then(result => result.rows)
};

const listMgrs = () => {
  return db.query(`select * from users where isMgr = 'Y'`)
    .then(result => result.rows)
};

function add (user, isMgr){
  if (user) {
    if (!isMgr) isMgr = 'N';
    listUsers()
      .then(users => {
        return db.query('insert into users (name, ismgr) values ($1, $2) returning id', [ user, isMgr ]);
      });
  }
}

function remove(id){
  id = id * 1;
  return db.query('DELETE FROM users WHERE id = $1', [ id ]);
}

function change(id, isMgr){
  id = id * 1;
  return db.query(`UPDATE users SET ismgr = $2 WHERE id = $1`, [id, isMgr])
}

module.exports = { seed, listMgrs, listUsers, add, remove, change };
