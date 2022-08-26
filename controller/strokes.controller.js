const pool = require("../db/pool");
const {ethers} = require("ethers");

//@desc     create stroke
//@route    POST /api/strokes
//@access   Public

const createStroke = async (req, res) => {
    try {

         const ids = JSON.stringify([]);

         const {signature} = req.body;


         const message = "Adding Stroke"
         const owner_address = process.env.owner_address

         const recoveredAddress = ethers.utils.verifyMessage(message, signature)
         console.log("RECOVERED_ADDRESS", recoveredAddress)

        if (owner_address.toLowerCase() !== recoveredAddress.toLowerCase())
            return res.status(401).send({error: 'Unauthorized Owner'})


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
        const {id : strokeId} = req.params;

        const {signature} = req.body;


        const message = "Updating Stroke"
        const owner_address = process.env.owner_address

        const recoveredAddress = ethers.utils.verifyMessage(message, signature)
        console.log("RECOVERED_ADDRESS", recoveredAddress)

       if (owner_address.toLowerCase() !== recoveredAddress.toLowerCase())
           return res.status(401).send({error: 'Unauthorized Owner'})

        const stringifyIDs = JSON.stringify(proposal_ids)
        const proposalIds = proposal_ids.map(id => `'${id}'`).join(',')
        
        const _data = await pool.query(`UPDATE votes SET voter_address = $1 WHERE proposals_id IN (${proposalIds})`,[""]);
        const data = await pool.query("UPDATE strokes SET proposal_ids = $1 WHERE id = $2", [stringifyIDs, strokeId]);

        
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
        const records = await pool.query('SELECT * FROM strokes ORDER BY id');
        console.log(records.rows);
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

const getSortedVoted = async (req, res) => {
    const { id } = req.params;

    const result = await pool.query(`SELECT * FROM strokes WHERE id=$1`, [id])
    const { proposal_ids } = result.rows[0];
    if( proposal_ids === null || proposal_ids.length == 0){
        return res.status(200).send('empty stokes')
    }

    const proposalIds = proposal_ids?.length > 0 && proposal_ids.map(id => `'${id}'`).join(',')

    const voteResult = await pool.query(`SELECT * FROM proposals WHERE id IN (${proposalIds}) ORDER BY total_votes DESC LIMIT 3`);

    console.log(voteResult.rows);

    res.status(200).send(voteResult.rows);
}

module.exports = {createStroke, getAllStrokes, updateStroke, getProposalsByStroke,getSortedVoted}