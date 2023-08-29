const controllers   = require('../../controllers/install.js')
const router        = require('express').Router()

router.post('/',controllers.process_install);

module.exports = router;



