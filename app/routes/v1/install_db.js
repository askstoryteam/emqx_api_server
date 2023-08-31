const controllers   = require('../../controllers/install_db.js')
const router        = require('express').Router()

router.post('/',controllers.process_install_db);

module.exports = router;



