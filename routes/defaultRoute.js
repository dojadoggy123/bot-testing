const express = require('express')
const defaultController = require('../controllers/defaultController')
const router = express.Router()

// routes for user requests

router.route('/')   //home page
    .get(defaultController.getHome)

router.route('/sign_in')
    .get(defaultController.getSignIn)



module.exports = router