const express       = require('express');
const install_db    = require('./install_db');

const router        = express.Router();

router.use('/install_db',install_db);

module.exports = router;
