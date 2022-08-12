const {createStroke, getAllStrokes,updateStroke, getProposalsByStroke} = require("../controller/strokes.controller");
const strokesRouter = require('express').Router();

strokesRouter
    .route('/')
    .post(createStroke)
    .get(getAllStrokes)

strokesRouter
    .route('/:id')
    .put(updateStroke)
    .get(getProposalsByStroke)


module.exports = strokesRouter