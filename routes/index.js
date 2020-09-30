const express = require('express');

const router = express.Router();

router.use('/transformed-payload', require('./referenceData'));


module.exports = router;