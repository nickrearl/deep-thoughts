const router = require('express').Router()
const {
  getAllUser,
  createUser,
  getUserbyId,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller')

router
  .route('/')
  .get(getAllUser)
  .post(createUser)

router
  .route('/:id')
  .get(getUserbyId)
  .put(updateUser)
  .delete(deleteUser)


  module.exports = router