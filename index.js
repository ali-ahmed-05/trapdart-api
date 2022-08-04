const express = require("express");
const cors = require("cors");
const proposalRouter = require("./routes/proposals");
const voteRouter = require("./routes/vote");
const strokesRouter = require("./routes/strokes");

require('dotenv').config({path: __dirname + '/.env'})

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/proposals', proposalRouter);
app.use('/api/votes', voteRouter);
app.use('/api/strokes', strokesRouter)

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
});