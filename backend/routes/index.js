var express = require('express');
var router = express.Router();
var CheckController = require('../controllers/CheckController.js'); 


router.get('/check', CheckController.checkUrlGet)
router.post('/check', CheckController.checkUrlPost)

module.exports = router;
