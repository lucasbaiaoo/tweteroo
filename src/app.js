import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const user = [];

const tweets = [];

server.post("/sign-up", (req, res) => {

    if(!req.body.username || !req.body.avatar){
        res.status(400).send("Todos os campos são obrigatórios!");
        return
    }

    user.push(req.body);
    res.send("OK");
})

server.post("/tweets", (req, res) => {

    if(!req.body.username || !req.body.tweet){
        res.status(400).send("Todos os campos são obrigatórios!");
        return
    }
    
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