var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};
var db;
module.exports = {
  getDB: getDB
};
function initDB(){
  console.log("si entra hp");
  var pgp = require('pg-promise')(options);

  var connectionString = 'postgres://postgres:postgres@localhost:5432/proyectosis';
  db = pgp(connectionString);
  return db;
}
function getDB() {
  console.log(db);
  if(db === undefined){
    db=initDB();
  }
  return db
}
