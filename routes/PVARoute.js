const express = require('express')
const PVA_Controller = require('../controllers/PVA_Controller')
const router = express.Router()

// routes for email requests
router.route('/email')    
    .get(PVA_Controller.getEmail)       //Checks whether email address exists in db , & send OTP
    .post(PVA_Controller.postEmail)

router.route('/transcript')
    .put(PVA_Controller.putTranscript)

router.route('/content')
    .put(PVA_Controller.putContent)

    
module.exports = router