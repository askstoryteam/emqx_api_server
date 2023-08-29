const controllers   = require('../../controllers/places.js')
const router        = require('express').Router()

// url path is GET /v1/air_fan
router.get('/:company',controllers.getCompany);
router.get('/:company/:place1',controllers.getPlace1);
router.get('/:company/:place1/:place2',controllers.getPlace2);

module.exports = router;



