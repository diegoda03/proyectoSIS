var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:postgres@localhost:5432/proyectosis';
var db = pgp(connectionString);

module.exports = {
  getAllShirts: getAllShirts,
  getSingleShirt: getSingleShirt,
  createShirt: createShirt,
  updateShirt: updateShirt,
  removeShirt: removeShirt
};
//var db = require('db');
function getAllShirts(req, res, next){
  db.any('select * from camiseta')
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL shirts'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}
function getSingleShirt(req, res, next){
  var camID = parseInt(req.params.id);
  db.one('select * from camiseta where id_camisa = $1', camID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE shirt'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createShirt(req, res, next) {
  req.body.id = parseInt(req.body.id);
  req.body.id_tipo = parseInt(req.body.id_tipo);
  db.none('insert into camiseta(id_camisa, id_tipocam, color, img)' +
      'values(${id}, ${id_tipo}, ${color}, ${img})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one shirt'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateShirt(req, res, next) {
  db.none('update camiseta set id_tipocam=$1, color=$2, img=$3 where id_camisa=$4',
    [parseInt(req.body.id_tipo), req.body.color,
      req.body.img, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated shirt'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeShirt(req, res, next) {
  var camID = parseInt(req.params.id);
  db.result('delete from camiseta where id_camisa = $1', camID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} shirt`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
