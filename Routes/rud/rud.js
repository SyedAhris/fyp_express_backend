const CryptoJS = require("crypto-js")

// get Driver
const read = async ( model ,errName, req, res) => {
    try {
        const query = req.query;
        const data = await model.find({$and:[query]});
        if (data.length === 0) {
            res.status(404).json(`No ${errName} with such query weer found.`);
        } else {
            res.status(200).json(data);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


const updateWithPassword = async ( model, req, res) => {
    try{
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
            ).toString();
        }
        const updatedEntity = await model.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedEntity);
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateWithoutPassword = async ( model, req, res) => {
    try{
        const updatedEntity = await model.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedEntity);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteData = async ( model ,errName, req, res) => {
    try {
        await model.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json(`${errName} is successfully deleted`);
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    read, updateWithPassword, updateWithoutPassword, deleteData
}