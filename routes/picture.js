const {updatePicture, getPicture} = require("../controller/picture.controller");
const pictureRouter = require('express').Router();

pictureRouter
    .route('/:id')
    .post(updatePicture)

pictureRouter
    .route('/')
    .get(getPicture)


module.exports = pictureRouter;