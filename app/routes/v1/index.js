const express       = require('express');
const install       = require('./install');

const router        = express.Router();

router.use('/install',install);

module.exports = router;
