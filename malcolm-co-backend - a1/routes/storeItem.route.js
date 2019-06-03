const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const storeItem_controller = require('../controllers/storeItem.controller');
// a simple test url to check that all of our files are communicating correctly.
router.get('/test', storeItem_controller.test);
module.exports = router;