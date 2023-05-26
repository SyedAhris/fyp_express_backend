const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//         const token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.JWT_KEY, (err, user) => {
//             if (err) {
//                 res.status(403).json("Token is not valid.");
//             } else {
//                 req.user = user;
//                 next();
//             }
//         });
//     } else {
//         return res.status(401).json("You do not have authentication!");
//     }
    next();
};

const verifyUserTokenAndID = (req, res, next) => {
//     verifyToken (req, res, () => {
//         if (req.user.id === req.params.id) {
//             next();
//         } else {
//             res.status(403).json("You do not have authentication to do that.")
//         }
//     })
    next();
}

module.exports = {
    verifyToken,
    verifyUserTokenAndID,
}
