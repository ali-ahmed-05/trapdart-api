const express = require("express");
const app = express();
const cors = require("cors");
const proposalRouter = require("./routes/proposals");
const voteRouter = require("./routes/vote");

require('dotenv').config({path: __dirname + '/.env'})

const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use('/api/proposals', proposalRouter);
app.use('/api/votes', voteRouter)

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
});