const express = require("express");
const app = express();
const {ethers} = require("ethers");
const cors = require("cors");
const pool = require("./db");
const { balance } = require('./services/callRaw');
const callRaw = require("./services/callRaw");

require('dotenv').config({path: __dirname+'/.env'})


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

app.get("/", async (req, res) => {
  try {
    res.json(200);
  } catch (err) {
    console.error(err.message);
  }
});

//create a Proposal

app.post("/proposals", async (req, res) => {
  try {
    const { title , ipfs , description , signature } = req.body;
    let message = "Add the proposal"
    let owner_address = process.env.owner_address

    const recoveredAddress = ethers.utils.verifyMessage(message,signature)
    console.log("recoveredAddress" , recoveredAddress)

    if(owner_address != recoveredAddress){
      result = "Caller is not the Owner"
    }else{

    const newproposal= await pool.query(
      "INSERT INTO proposal (title,ipfs,description,total_votes,total_passed) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [title,ipfs,description,0,0]
    );
     result = newproposal.rows[0]
    }

    res.json(result);
    console.log("result",result)
  } catch (err) {
    console.error("catch post proposals" , err.message);
  }
});

//get all proposal

app.get("/proposals", async (req, res) => {
  try {
    const allproposals = await pool.query("SELECT * FROM proposal");
    res.json(allproposals.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a proposal

app.get("/proposals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = await pool.query("SELECT * FROM proposal WHERE proposal_id = $1", [
      id
    ]);

    res.json(proposal.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a vote

app.post("/votes/:id", async (req, res) => {
    try {
      const { voter , vote_status ,signature  } = req.body;
      const { id } = req.params;

      let message = "Casting a vote"
  
      const recoveredAddress = ethers.utils.verifyMessage(message,signature)

      let result = await callRaw(voter)

      let total_votes
      let total_passed
      if(recoveredAddress!=voter){
        result = "Caller is not the owner"
      }else{
      if(result == "0" ){
        result = "Insufficient STZ balance"
      }else{

      const vote = await pool.query(
        "SELECT voter FROM votes WHERE proposal_id = $1 AND voter = $2",
        [id,voter]
      );
      result = vote.rows[0]
      if(vote.rowCount==0){
      const newVote= await pool.query(
        "INSERT INTO votes (proposal_id,voter,vote_status) VALUES($1,$2,$3) RETURNING *",
        [id,voter,vote_status]
      );

      total_votes = await pool.query(
        "SELECT total_votes FROM proposal WHERE proposal_id = $1",
        [id]
      );
      total_votes = total_votes.rows[0].total_votes
      total_votes++

      total_passed = await pool.query(
        "SELECT total_passed FROM proposal WHERE proposal_id = $1",
        [id]
      );
      total_passed = total_passed.rows[0].total_passed
      total_passed++
      
      if(vote_status){
        const update = await pool.query(
          "UPDATE proposal SET total_votes = $1, total_passed= $2 WHERE proposal_id = $3;",
          [total_votes,total_passed,id]
        );
      }else{
        const update = await pool.query(
          "UPDATE proposal SET total_votes = $1 WHERE proposal_id = $2;",
          [total_votes,id]
        );
      }
      
      result = newVote.rows[0]
      }
      }}
      res.json(result);
      //console.log(req.body)
    } catch (err) {
      console.error(err.message);
    }
  });

//get a vote

app.get("/hasvoted/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { voter } = req.body;
    const vote = await pool.query(
      "SELECT voter FROM votes WHERE proposal_id = $1 AND voter = $2",
      [id,voter]
    );

    res.json(vote.rowCount);
  } catch (err) {
    console.error(err.message);
  }
});


//get all proposal

app.get("/votes", async (req, res) => {
    try {
      const allvotes = await pool.query("SELECT * FROM votes");
      res.json(allvotes.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

//delete a votes DELETE FROM table_name;

app.delete("/deletevotes", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM votes");
    res.json("votes was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/deleteproposals", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM proposal");
      res.json("proposal was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen( process.env.PORT || 5000, () => {
  console.log("server has started on port 5000");
});