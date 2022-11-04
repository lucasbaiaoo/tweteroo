import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const user = [];

const tweets = [];

server.post("/sign-up", (req, res) => {
    user.push(req.body);
    res.send("OK")
})

server.post("/tweets", (req, res) => {
    tweets.push(req.body);
    res.send("OK")
})

server.listen(5000);