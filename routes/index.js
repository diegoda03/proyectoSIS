var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var camisetaSer = require('../services/camisetaService');
router.get('/camiseta', camisetaSer.getAllShirts);
router.get('/camiseta/:id', camisetaSer.getSingleShirt);
router.post('/camiseta/', camisetaSer.createShirt);
router.put('/camiseta/:id', camisetaSer.updateShirt);
router.delete('/camiseta/:id', camisetaSer.removeShirt);

var disenoSer = require('../services/disenoService');
router.get('/diseno', disenoSer.getAllDesigns);
router.get('/diseno/:id', disenoSer.getSingleDesign);
router.post('/diseno/', disenoSer.createDesign);
router.put('/diseno/:id', disenoSer.updateDesign);
router.delete('/diseno/:id', disenoSer.removeDesign);

module.exports = router;
