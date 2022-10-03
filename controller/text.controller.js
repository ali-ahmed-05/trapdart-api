const {ethers} = require("ethers");
const callRaw = require("../services/callRaw");
const pool = require("../db/pool");


//@desc     get Text
//@route    GET /api/text
//@access   Public

const getText = async (req, res) => {
    try {
        const text = await pool.query("SELECT * FROM text");
        res.status(200).send(text.rows[0]);
    } catch (err) {
        res.status(400).send({status: false, message: err.message});
        console.log(err);
    }
}

//@desc     get text
//@route    POST /api/text/:id
//@access   Public

const updateText = async (req, res) => {
    try {
        const {tilte} = req.body;
        const {signature} = req.body;


         const message = "Adding Text"
         const owner_address = process.env.owner_address

         const recoveredAddress = ethers.utils.verifyMessage(message, signature)
         console.log("RECOVERED_ADDRESS", recoveredAddress)

        if (owner_address.toLowerCase() !== recoveredAddress.toLowerCase())
            return res.status(401).send({error: 'Unauthorized Owner'})

        console.log(req.body)
        const text = await pool.query("UPDATE text SET title = $1 WHERE id = 1",[tilte]);
        console.log(text)
        res.status(200).send({status: true, rowCount: text.rowCount});

    } catch (err) {
        res.status(400).send({status: false, message: err.message});
        console.log(err);
    }
}

module.exports = {getText, updateText}