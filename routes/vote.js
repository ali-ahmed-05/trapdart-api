const {createVote, getVote, deleteVote, getAllVotes} = require("../controller/vote.controller");
const voteRouter = require('express').Router();

voteRouter
    .route('/:id')
    .get(getVote)
    .post(createVote)
    .delete(deleteVote)

voteRouter
    .route('/')
    .get(getAllVotes)


module.exports = voteRouter;