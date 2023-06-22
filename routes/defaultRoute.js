const express = require('express')
const userController = require('../controllers/defaultController')
const router = express.Router()

// routes for user requests

router.route('/')   //home page
    .get(userController.getHome)



module.exports = router