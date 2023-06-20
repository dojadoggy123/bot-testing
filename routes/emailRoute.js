const express = require('express')
const emailController = require('../controllers/emailController')
const router = express.Router()

// routes for email requests
router.route('/email')    
    .get(emailController.getEmail)

router.route('/email/:id')
    .get(emailController.getEmailID)
    .post(emailController.postEmailID)


module.exports = router