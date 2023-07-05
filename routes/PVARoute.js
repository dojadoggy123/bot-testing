const express = require('express')
const PVA_Controller = require('../controllers/PVA_Controller')
const router = express.Router()

// routes for email requests
router.route('/email')    
    .post(PVA_Controller.postEmail)       //Checks whether email address exists in db , & send OTP

router.route('/new_email')
    .post(PVA_Controller.postNewEmail)

router.route('/content')
    .post(PVA_Controller.postContent)

router.route('/transcript')
    .put(PVA_Controller.putTranscript)


    
module.exports = router