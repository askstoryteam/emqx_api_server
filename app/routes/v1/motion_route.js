const controllers   = require('../../controllers/motion.js')
const router        = require('express').Router()

// url path is /v1/motion
router.get('/',controllers.getMotion);
module.exports = router;
