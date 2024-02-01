const router = require("express").Router();

const { 
        getUsers, 
        getSingleUser, 
        createUser,
        updateUser,
        deleteUser,
        addFriend,
        removeFriend,
    } = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers);

// /api/users/:id         -- including populated thought and friend data
router.route("/:id").get(getSingleUser);

// /api/users/
router.route("/").post(createUser);

// /api/users/:id
router.route("/:id").put(updateUser);

// /api/users/:id
router.route("/:id").delete(deleteUser);

// /api/users/:id/friends/:friendId
router.route("/:id/friends/:friendId").post(addFriend);

// /api/users/:id/friends/:friendId
router.route("/:id/friends/:friendId").delete(removeFriend);

module.exports = router;
