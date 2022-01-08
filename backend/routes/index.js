var express = require('express');
var router = express.Router();
var CheckController = require('../controllers/CheckController.js'); 
var BrowseController = require('../controllers/BrowseController.js');
var TestController = require('../controllers/TestController.js')

router.get('/check', CheckController.checkUrlGet)
router.post('/check', CheckController.checkUrlPost)
router.post('/test', TestController.testFunc)
router.get('/browse', BrowseController.browseAllGet)
router.delete('/delete/:id', BrowseController.browseRemove)

module.exports = router;
