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
  if (!manager) sql = `insert into users (name, isMgr) values ('${name}', '${isMgr}')`
  else sql = `insert into users (name, isMgr, manager) values ('${name}', '${isMgr}', '${manager}')`
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

module.exports = { seed, listMgrs, listUsers };
