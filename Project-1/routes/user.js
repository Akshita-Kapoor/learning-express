const express = require('express');
const router = express.Router();
const {handleGetAllUsers, getUserById,
    updateUserById, deleteUserById, createNewUser} = require('../controllers/user');

router.route('/')
    .get(handleGetAllUsers)
    .post(createNewUser)

router.route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById)

module.exports = router;
