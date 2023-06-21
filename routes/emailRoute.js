const express = require('express')
const emailController = require('../controllers/emailController')
const router = express.Router()

// routes for email requests
router.route('/email')    
    .get(emailController.getEmail)

router.route('/email/:address')
    .get(emailController.getEmailAdd)

router.route('/email/OTP/:address')
    .get(emailController.checkEmailAdd)   //Checks whether email address exists in db , & send OTP
    .post(emailController.postEmailAdd)


module.exports = router