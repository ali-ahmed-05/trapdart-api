const {ethers} = require("ethers");
const callRaw = require("../services/callRaw");
const pool = require("../db");

//@desc     create vote
//@route    POST /api/votes/:id
//@access   Public

const createVote = async (req, res) => {
    try {
        const {voter, vote_status, signature} = req.body;
        const {id} = req.params;

        const message = "Casting a vote"

        const recoveredAddress = ethers.utils.verifyMessage(message, signature)

        let result = await callRaw(voter)

        if (recoveredAddress !== voter) {
            return res.status(401).send({status: false, message: 'Caller is not the owner'})
        }

        if (result === "0") {
            return res.status(401).send({status: false, message: 'Insufficient STZ balance'})
        }

        const vote = await pool.query(
            "SELECT voter FROM votes WHERE proposal_id = $1 AND voter = $2",
            [id, voter]
        );
        result = vote.rows[0]

        if (vote.rowCount !== 0) {
            return res.status(401).send({status: false, message: 'You had already voted'})
        }

        const newVote = await pool.query(
            "INSERT INTO votes (proposal_id,voter,vote_status) VALUES($1,$2,$3) RETURNING *",
            [id, voter, vote_status]
        );

        let total_votes = await pool.query(
            "SELECT total_votes FROM proposal WHERE proposal_id = $1",
            [id]
        );
        total_votes = total_votes.rows[0].total_votes
        total_votes++

        let total_passed = await pool.query(
            "SELECT total_passed FROM proposal WHERE proposal_id = $1",
            [id]
        );
        total_passed = total_passed.rows[0].total_passed
        total_passed++

        if (vote_status) {
            const update = await pool.query(
                "UPDATE proposal SET total_votes = $1, total_passed= $2 WHERE proposal_id = $3;",
                [total_votes, total_passed, id]
            );
        } else {
            const update = await pool.query(
                "UPDATE proposal SET total_votes = $1 WHERE proposal_id = $2;",
                [total_votes, id]
            );
        }

        result = newVote.rows[0];

        res.json(result);
    } catch (err) {
        console.error(`error occurred while creating vote`);
    }
}

//@desc     get vote
//@route    GET /api/votes/:id
//@access   Public

const getVote = async (req, res) => {
    try {
        const {id} = req.params;
        const {voter} = req.body;
        const vote = await pool.query(
            "SELECT voter FROM votes WHERE proposal_id = $1 AND voter = $2",
            [id, voter]
        );

        res.json(vote.rowCount);
    } catch (err) {
        console.error(err.message);
    }
}

//@desc     delete vote
//@route    DELETE /api/votes/:id
//@access   Public

const deleteVote = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM votes where id = $1", [id]);
        res.json("votes was deleted!");
    } catch (err) {
        console.log(err.message);
    }
}

//@desc     get All votes
//@route    GET /api/votes
//@access   Public

const getAllVotes = async (req, res) => {
    try {
        const allVotes = await pool.query("SELECT * FROM votes");
        res.json(allVotes.rows);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {createVote, getVote, deleteVote, getAllVotes}