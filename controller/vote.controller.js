const { ethers } = require("ethers");
const callRaw = require("../services/callRaw");
const pool = require("../db/pool");

//@desc     create vote
//@route    POST /api/votes/:id
//@access   Public

const createVote = async (req, res) => {
  try {
    const {
      proposals_id,
      voter_address,
      selected_option,
      signature,
      strokeId = 0,
    } = req.body;
    const { id } = req.params;

    if (strokeId !== 0) {
      const strokes = await pool.query(
        "SELECT proposal_ids FROM strokes WHERE id=$1",
        [strokeId]
      );

      const proposal_ids =
        strokes.rows.length > 0
          ? strokes.rows.reduce((ids, { proposal_ids }) => {
              ids =
                ids.length > 0 ? [...proposal_ids] : [...ids, ...proposal_ids];
              return ids;
            }, [])
          : [];

      const proposalIds = proposal_ids.map((id) => `'${id}'`).join(",");

      const proposals = await pool.query(
        `SELECT * FROM votes WHERE voter_address='${voter_address}' AND proposals_id IN (${proposalIds})`
      );

      if (proposals.rowCount !== 0) {
        return res
          .status(401)
          .send({ status: false, message: "You have already voted" });
      }
    }

    const message = "Casting a vote";

    const recoveredAddress = ethers.utils.verifyMessage(message, signature);

    let result = await callRaw(voter_address);

    // let result = null;

    // if (recoveredAddress !== voter) {
    //     return res.status(401).send({status: false, message: 'Caller is not the owner'})
    // }

    if (result === "0") {
      return res
        .status(401)
        .send({ status: false, message: "Insufficient TRAP balance" });
    }
    let asd = 0;
    const vote = await pool.query(
      "SELECT * FROM votes WHERE proposals_id = $1 AND voter_address = $2",
      [proposals_id, voter_address]
    );
    result = vote.rows[0];

    if (vote.rowCount !== 0) {
      return res
        .status(401)
        .send({ status: false, message: "You have already voted" });
    }

    const newVote = await pool.query(
      "INSERT INTO votes (proposals_id,voter_address,selected_option) VALUES($1,$2,$3) RETURNING *",
      [proposals_id, voter_address, selected_option]
    );

    const records = await pool.query(
      "SELECT total_votes,options FROM proposals WHERE id = $1",
      [proposals_id]
    );

    let totalVotes = Number(records.rows[0].total_votes) + 1;
    let options = {
      ...records.rows[0].options,
      [selected_option]: Number(records.rows[0].options[selected_option]) + 1,
    };

    // console.log(options);

    const update = await pool.query(
      "UPDATE proposals SET total_votes = $1, options= $2 WHERE id = $3;",
      [totalVotes, options, proposals_id]
    );

    if (update.rowCount > 0) {
      res.status(200).send({ status: true, message: "successfully voted" });
    } else {
      res.status(200).send({ status: true, message: "some error occurred" });
    }
  } catch (err) {
    res.status(400).send({ status: false, message: err.message });
    console.error(err);
  }
};

//@desc     get vote
//@route    GET /api/votes/:id
//@access   Public

const getVote = async (req, res) => {
  try {
    const { id } = req.params;
    const vote = await pool.query(
      "SELECT voter_address FROM votes WHERE id = $1",
      [id]
    );
    res.json(vote.rowCount);
  } catch (err) {
    res.status(400).send({ status: false, message: err.message });
    console.error(err.message);
  }
};

//@desc     delete vote
//@route    DELETE /api/votes/:id
//@access   Public

const deleteVote = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM votes where id = $1", [
      id,
    ]);
    if (deleteTodo.rowCount > 0)
      res
        .status(200)
        .send({ status: true, message: "vote successfully deleted" });
    else {
      res.status(200).send({ status: false, message: "vote does not exist" });
    }
  } catch (err) {
    res.status(400).send({ status: false, message: err.message });
    console.log(err.message);
  }
};

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
};

module.exports = { createVote, getVote, deleteVote, getAllVotes };
