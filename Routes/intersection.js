const router = require("express").Router();
const Intersection = require("../Models/Intersection");
const {
    verifyToken,
} = require("./Middleware/verification.js");
const { read, deleteData, updateWithoutPassword } = require("./rud/rud");


router.post("/", verifyToken, async (req, res) => {
    try {
        const newIntersection = new Intersection({
            name: req.body.name,
            location: req.body.location,
            signals: req.body.signals,
        });
        const savedIntersection = await newIntersection.save();
        res.status(200).json(savedIntersection);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/", verifyToken, async (req, res) => await read(Intersection, "Intersection", req, res));

router.patch("/:id", verifyToken, async (req, res) => await updateWithoutPassword(Intersection, req, res));

router.delete("/:id", verifyToken, async (req, res) => await deleteData(Intersection, "Intersection", req, res));

module.exports = router;