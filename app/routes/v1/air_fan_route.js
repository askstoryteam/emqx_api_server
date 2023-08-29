const controllers   = require('../../controllers/air_fan.js')
const router        = require('express').Router()

// url path is GET /v1/air_fan
router.get('/:id',controllers.getAirFan);

router.post('/',controllers.setAirFan);

module.exports = router;


//export { router } 
//,  router.post('/air_fan', controllers.sendControllInfo)
