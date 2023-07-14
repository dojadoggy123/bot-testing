const express = require('express')
const PVA_Controller = require('../controllers/PVA_Controller')
const router = express.Router()

// routes for email requests
router.route('/email')    
    .post(PVA_Controller.postEmail)       //Checks whether email address exists in db , & send OTP
    .put(PVA_Controller.putEmail)

router.route('/content')
    .post(PVA_Controller.putContent)

    
module.exports = router
