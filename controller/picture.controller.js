const {ethers} = require("ethers");
const callRaw = require("../services/callRaw");
const pool = require("../db/pool");


//@desc     get Picture
//@route    GET /api/picture
//@access   Public

const getPicture = async (req, res) => {
    try {
        const picture = await pool.query("SELECT * FROM picture");
        res.status(200).send(picture.rows[0]);
    } catch (err) {
        res.status(400).send({status: false, message: err.message});
        console.log(err);
    }
}

//@desc     get Picture
//@route    POST /api/picture/:id
//@access   Public

const updatePicture = async (req, res) => {
    try {
        const {image} = req.body;
        console.log(req.body)
        const picture = await pool.query("UPDATE picture SET image_url = $1 WHERE id = 1",[image]);
        console.log(picture)
        res.status(200).send({status: true, rowCount: picture.rowCount});
    } catch (err) {
        res.status(400).send({status: false, message: err.message});
        console.log(err);
    }
}

module.exports = {getPicture, updatePicture}