const pool = require("../db/pool");

//@desc     create stroke
//@route    POST /api/strokes
//@access   Public

const createStroke = async (req, res) => {
    try {
        const {proposal_ids} = req.body;

        console.log(proposal_ids);

        const ids = JSON.stringify(proposal_ids);


        const data = await pool.query("INSERT INTO strokes (proposal_ids) VALUES($1)  RETURNING *", [ids]);

        if (data.rowCount > 0) {
            res.status(200).send({status: true, message: 'stoke successfully created'});
        } else {
            res.status(200).send({status: true, message: 'invalid input'});
        }

    } catch (e) {
        res.status(400).send({status: false, message: e.message});
        console.log(e);
    }
}


//@desc     update stroke
//@route    PUT /api/strokes
//@access   Public

const updateStroke = async (req, res) => {
    try {
        const {proposal_ids} = req.body;
        const {id} = req.params;

        console.log(proposal_ids);

        const ids = JSON.stringify(proposal_ids);

        const data = await pool.query("UPDATE strokes SET proposal_ids = $1 WHERE id =$2 RETURNING *", [ids, id]);

        if (data.rowCount > 0) {
            res.status(200).send({status: true, message: 'stoke successfully Updated'});
        } else {
            res.status(200).send({status: true, message: 'invalid input'});
        }
    } catch (e) {
        res.status(400).send({status: false, message: e.message});
        console.log(e);
    }
}

//@desc     get All stroke
//@route    GET /api/strokes
//@access   Public

const getAllStrokes = async (req, res) => {
    try {
        const records = await pool.query('SELECT * FROM strokes');
        console.log(records);
        res.status(200).send(records.rows);
    } catch (e) {
        res.status(400).send({status: false, message: e.message});
        console.log(e);
    }
}

//@desc     get proposals by stroke
//@route    GET /api/strokes/:id
//@access   Public

const getProposalsByStroke = async (req, res) => {
    try{
        const {id} = req.params;

        let proposalIds = await pool.query('SELECT proposal_ids FROM strokes WHERE id = $1', [id]);
        proposalIds = proposalIds.rows[0].proposal_ids;

        proposalIds = proposalIds.map(id => `'${id}'`).join(',')

        const records = await pool.query(`SELECT * FROM proposals WHERE id IN (${proposalIds})`);
        const proposals = records.rows;


        res.status(200).send(proposals);
    }catch (e) {
        res.status(400).send({status: false, message: e.message});
        console.log(e.message)
    }
}

module.exports = {createStroke, getAllStrokes, updateStroke, getProposalsByStroke}