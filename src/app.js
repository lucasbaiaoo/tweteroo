import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const user = [];

const tweets = [];

server.post("/sign-up", (req, res) => {
    user.push(req.body);
    res.send("OK");
})

server.post("/tweets", (req, res) => {
    
    const userIcon = user.find(userInfo => userInfo.username === req.body.username).avatar;
    
    tweets.push({
        tweet: req.body.tweet,
        username: req.body.username,
        avatar: userIcon
    });
    res.send("OK");
})

server.get("/tweets", (req,res) => {
    if(tweets.length <= 10){
        res.send([...tweets].reverse())
    } else{
        const orderedTweets = tweets.slice(- 10).reverse();
        res.send(orderedTweets);
    }
})

server.listen(5000);