const {
    createProposal,
    getAllProposals,
    getSingleProposal,
    deleteSingleProposal
} = require("../controller/proposal.controller");
const proposalRouter = require('express').Router();


proposalRouter
    .route('/')
    .get(getAllProposals)
    .post(createProposal)

proposalRouter
    .route('/:id')
    .get(getSingleProposal)
    .delete(deleteSingleProposal)


module.exports = proposalRouter;