const router = require("express").Router();
const User = require("../Models/User");
const {
    verifyToken,
    verifyUserTokenAndID,
} = require("./Middleware/verification.js");
const { read , updateWithPassword, deleteData} = require("./rud/rud");


router.get("/", verifyToken, async (req, res) => await read(User, "Passenger", req, res));

router.patch("/:id", verifyUserTokenAndID, async (req, res) => await updateWithPassword(User, req, res));

router.delete("/:id", verifyUserTokenAndID, async (req, res) => await deleteData(User, "Passenger", req, res));

module.exports = router;