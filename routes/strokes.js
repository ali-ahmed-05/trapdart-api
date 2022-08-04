const {createStroke, getAllStrokes} = require("../controller/strokes.controller");
const strokesRouter = require('express').Router();

strokesRouter
    .route('/')
    .post(createStroke)
    .get(getAllStrokes)

module.exports = strokesRouter