const {updateText, getText} = require("../controller/text.controller");
const textRouter = require('express').Router();

textRouter
    .route('/:id')
    .post(updateText)

textRouter
    .route('/')
    .get(getText)


module.exports = textRouter;