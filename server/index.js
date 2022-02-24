const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 2277;
const app = express();

const url_online =
  "mongodb+srv://AuthClass:AuthClass@codelab.u4drr.mongodb.net/Election?retryWrites=true&w=majority";

const url = "mongodb://localhost/electionDB";

mongoose.connect(url).then(() => {
  console.log("db is now connected...!");
});

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .end(
      "This API is design for CodeLab fellow's Election, Let's start ROCKING 🚀👍"
    );
});

app.use("/api", require("./router"));

app.listen(port, () => {
  console.log("server is now running on port: ", port);
});
