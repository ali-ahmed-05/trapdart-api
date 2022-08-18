const {
  createStroke,
  getAllStrokes,
  updateStroke,
  getProposalsByStroke,
  getSortedVoted
} = require("../controller/strokes.controller");
const strokesRouter = require("express").Router();

strokesRouter.route("/").post(createStroke).get(getAllStrokes);

strokesRouter.route("/:id").put(updateStroke).get(getProposalsByStroke);

strokesRouter.route("/sorted/:id").get(getSortedVoted);

module.exports = strokesRouter;
