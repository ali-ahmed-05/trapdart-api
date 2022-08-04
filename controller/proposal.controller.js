const {ethers} = require("ethers");
const pool = require("../db/pool");
const moment = require("moment");
// const db = require("../db");


//@desc     create proposal
//@route    POST /api/proposals
//@access   Public
const createProposal = async (req, res) => {
    try {
        const {title, description, options, image, vote_type,closing_date, signature} = req.body;

        const message = "Add the proposal"
        const owner_address = process.env.owner_address

        // const recoveredAddress = ethers.utils.verifyMessage(message, signature)
        // console.log("RECOVERED_ADDRESS", recoveredAddress)

        // if (owner_address !== recoveredAddress)
        //     return res.status(401).send({error: 'Unauthorized Owner'})

        const newProposal = await pool.query(
            "INSERT INTO proposals (title, description,options,image,vote_type, closing_date) VALUES($1,$2,$3,$4,$5, $6) RETURNING *",
            [title, description, options, image, vote_type, closing_date]
        );

        const result = newProposal.rows[0];

        res.status(201).send(result);
    } catch (err) {
        res.status(400).send({status: false, message: err.message});
        console.error('Error:', err.message);
    }
}

//@desc     get All Proposals
//@route    GET /api/proposals
//@access   Public

const getAllProposals = async (req, res) => {
    try {
        const allProposals = await pool.query("SELECT * FROM proposals");
        res.status(200).send(allProposals.rows);
    } catch (err) {
        console.error('error occurred while getting proposals', err);
    }
}


//@desc     get All Proposals
//@route    GET /api/proposals/:type
//@access   Public

const getTypeProposals = async (req, res) => {
    try {
        console.log("PARAMS",req.params)
        // const {type} = req.params;
        // const allProposals = await pool.query("SELECT * FROM proposals WHERE vote_type = $1",
        // [type]);
        // res.status(200).send(allProposals.rows);
    } catch (err) {
        console.log(req.params)
        console.error('error occurred while getting proposals', err);
    }
}

//@desc     get Single Proposal
//@route    GET /api/proposals/:id
//@access   Public

const getSingleProposal = async (req, res) => {
    try {
        const {id} = req.params;

        const proposal = await pool.query(
            "SELECT * FROM proposals WHERE id = $1",
            [id]
        );

        res.status(200).send(proposal.rows[0]);
    } catch (err) {
        res.status(400).send({status: false, message: err.message});
        console.log(err);
    }
}

//@desc     delete Single Proposal
//@route    DELETE /api/proposals/:id
//@access   Public

const deleteSingleProposal = async (req, res) => {
    try {
        const {id} = req.params;

        console.log(id);

        const record = await pool.query('SELECT * FROM proposals WHERE id = $1', [id]);

        if(record.rowCount > 0) {
            const deleteTodo = await pool.query("DELETE FROM proposals WHERE id = $1", [id]);
            if(deleteTodo.rowCount)
                res.status(200).send({status: true, message: 'proposal successfully deleted '});
        }else {
            res.status(200).send({status: true, message: 'proposal does not exist'});
        }


    } catch (err) {
        res.status(400).send({status: false, message: err.message});
        console.log(err);
    }
};

module.exports = {createProposal, getAllProposals, getSingleProposal, deleteSingleProposal , getTypeProposals}