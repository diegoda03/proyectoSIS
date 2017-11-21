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
module.exports = router;
