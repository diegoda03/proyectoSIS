var modeldb = require('../services/db');
var db = modeldb.getDB();

module.exports = {
  getAllTypes: getAllTypes,
  getColorByType: getColorByType,
  getAvailable: getAvailable
};

function getAllTypes(req, res, nex){
  db.any('select * from tipo_camiseta')
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL types of shirts'
      });
  })
  .catch(function (err) {
    return next(err);
  });


}

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

function getColorByType(req, res, next){
  var typeID = parseInt(req.params.id);
  db.any('select color from camiseta  where id_tipocam = $1',typeID)
    .then(function (data) {
      //console.log(data.unique());
      res.status(200)
        .json({
          status: 'success',
          data: data.unique(),
          message: 'Retrieved color'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAvailable(req, res, next){

  var typeID = parseInt(req.params.id_tipo);
  var color = req.params.color;
  var size = req.params.talla;
//console.log(size);
//console.log('select cantidad from stock_camiseta  where talla= '+size+' and id_camiseta = (select id_camiseta where color= "AZUL" and id_tipocam = 1)');
  db.one("select cantidad from stock_camiseta  where talla= '"+size+"' and id_camiseta = (select id_camiseta from camiseta where color='"+color+"'  and id_tipocam = $1)",typeID)
    .then(function (data) {
      //console.log(data.unique());
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved available'
        });
    })
    .catch(function (err) {
      res.status(200)
        .json({
          status: 'success',
          data: JSON.parse('{"cantidad":0}'),
          message: 'Retrieved available'
        });
    });

}
