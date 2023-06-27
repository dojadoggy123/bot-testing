const express = require('express')
const PVA_Controller = require('../controllers/PVA_Controller')
const router = express.Router()

// routes for email requests
router.route('/email')    
    .get(PVA_Controller.getEmail)

router.route('/email/:address')
    .get(PVA_Controller.getEmailAdd)
    .delete(PVA_Controller.deleteEmailAdd)

router.route('/email/OTP/:address')
    .get(PVA_Controller.checkEmailAdd)   //Checks whether email address exists in db , & send OTP
    .post(PVA_Controller.postEmailAdd)

router.route('/transcript')
    .post(PVA_Controller.postTranscript)


module.exports = router