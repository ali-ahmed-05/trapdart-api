const {
    createProposal,
    getAllProposals,
    getSingleProposal,
    deleteSingleProposal,
    getTypeProposals
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

proposalRouter
    .route('/type/:type')
    .get(getTypeProposals)


module.exports = proposalRouter;