var modeldb = require('../services/db');
var db = modeldb.getDB();

module.exports = {
  getAllDesigns: getAllDesigns,
  getSingleDesign: getSingleDesign,
  createDesign: createDesign,
  updateDesign: updateDesign,
  removeDesign: removeDesign
};
//var db = require('db');
function getAllDesigns(req, res, next){
  db.any('select * from disenno')
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL desings'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}
function getSingleDesign(req, res, next){
  var disID = parseInt(req.params.id);
  db.one('select * from disenno where id_disenno = $1', disID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE desing'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createDesign(req, res, next) {
  req.body.id = parseInt(req.body.id);
  req.body.autor = parseInt(req.body.autor);
  db.none('insert into disenno(id_disenno, nombre, descripcion, imagen, autor)' +
      'values(${id}, ${nombre}, ${descripcion}, ${imagen}, ${autor})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one desing'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateDesign(req, res, next) {
  db.none('update disenno set nombre=$1, descripcion=$2, imagen=$3, autor=$4 where id_disenno=$5',
    [req.body.nombre, req.body.descripcion, req.body.imagen,
      req.body.autor, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated desing'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeDesign(req, res, next) {
  var disID = parseInt(req.params.id);
  db.result('delete from disenno where id_disenno = $1', disID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} desing`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
