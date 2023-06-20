const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

// routes for user requests

router.route('/home')
    .get(userController.getHome)

router.route('/user')
    .get(userController.getUser)
    .post(userController.postUser)

router.route('/user/:id')
    .put(userController.putUser)
    .delete(userController.deleteUser)

module.exports = router