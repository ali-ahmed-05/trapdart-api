const {ethers} = require("ethers");
const pool = require("../db");


//@desc     create proposal
//@route    POST /api/proposals
//@access   Public
const createProposal = async (req, res) => {
    try {
        const {title, ipfs, description, signature} = req.body;
        const message = "Add the proposal"
        const owner_address = process.env.owner_address

        const recoveredAddress = ethers.utils.verifyMessage(message, signature)
        console.log("RECOVERED_ADDRESS", recoveredAddress)

        if (owner_address !== recoveredAddress)
            return res.status(401).send({error: 'Unauthorized Owner'})

        const newProposal = await pool.query(
            "INSERT INTO proposal (title,ipfs, description,total_votes,total_passed) VALUES($1,$2,$3,$4,$5) RETURNING *",
            [title, ipfs, description, 0, 0]
        );

        const result = newProposal.rows[0];

        res.status(200).send(result);
        console.log('RESULT', result)
    } catch (err) {
        console.error("Creating Proposal Error occurred", err.message);
    }
}

//@desc     get All Proposals
//@route    GET /api/proposals
//@access   Public

const getAllProposals = async (req, res) => {
    try {
        const allProposals = await pool.query("SELECT * FROM proposal");
        res.status(200).send(allProposals.rows);
    } catch (err) {
        console.error('Error ');
    }
}

//@desc     get Single Proposal
//@route    GET /api/proposals/:id
//@access   Public

const getSingleProposal = async (req, res) => {
    try {
        const {id} = req.params;

        const proposal = await pool.query(
            "SELECT * FROM proposal WHERE proposal_id = $1",
            [id]
        );

        res.status(200).send(proposal.rows[0]);
    } catch (err) {
        console.error(`get Single Proposal error occured ${err}`);
    }
}

//@desc     delete Single Proposal
//@route    DELETE /api/proposals/:id
//@access   Public

const deleteSingleProposal = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM proposal WHERE id = $1", [id]);

        console.log('DELETE_TODO', deleteTodo)

        res.status(200).send('Proposal was deleted!')

    } catch (err) {
        console.log(`Error occurred while deleting proposal ${err}`);
    }
};

module.exports = {createProposal, getAllProposals, getSingleProposal, deleteSingleProposal}