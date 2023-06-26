const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/user/register", async (req, res) =>{

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        role: req.body.role,
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json("Success");
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json("User already exists");
        } else if (err.name === "ValidationError") {
            res.status(422).json(err.message);
        } else {
            res.status(500).json(err);
        }
    }
});

router.post("/user/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            res.status(404).json("User Not Found");
        } else {
            const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
            const originalPass = hashedPass.toString(CryptoJS.enc.Utf8);
            if (originalPass !== req.body.password) {
                res.status(401).json("Wrong Credentials");
            } else {

                const accessToken = jwt.sign({
                    id: user._id,
                }, process.env.JWT_KEY, {expiresIn:"3d"});

                res.status(200).json({'user': user, 'accessToken': accessToken});
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
