const {createStroke, getAllStrokes,updateStroke} = require("../controller/strokes.controller");
const strokesRouter = require('express').Router();

strokesRouter
    .route('/')
    .post(createStroke)
    .get(getAllStrokes)

strokesRouter
    .route('/:id')
    .put(updateStroke)


module.exports = strokesRouter