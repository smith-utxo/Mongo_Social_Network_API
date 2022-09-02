const router = require('express').Router();

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser, 
  addFriend, 
  removeFriend
} = require('../../controllers/user-controller');


// Get All Users and Create New User
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);


//  Get a single User, Update a user, and Delete a User 
router
  .route('/:id')
  .get(getUserById)
  .post(updateUser)
  .delete(deleteUser);

// add and remove a friend from a user's friend list

router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router; 