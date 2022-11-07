import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const user = [];

const tweets = [];

server.post("/sign-up", (req, res) => {
  if (!req.body.username || !req.body.avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  user.push(req.body);
  res.status(201).send("OK");
});

server.post("/tweets", (req, res) => {
  const userName = req.headers.user;

  if (!userName || !req.body.tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const userIcon = user.find(
    (userInfo) => userInfo.username === userName
  ).avatar;

  tweets.push({
    tweet: req.body.tweet,
    username: userName,
    avatar: userIcon,
  });
  res.status(201).send("OK");
});

server.get("/tweets", (req, res) => {
  const page = parseInt(req.query.page);

  if (!page && page < 1) {
    res.status(400).send("Informe uma página válida!");
    return;
  }

  if (page === 1) {
    res.send(tweets.slice(-10).reverse());
    return;
  }

  res.send(tweets.slice(-10 * page, -10 * page + 10).reverse());
});

server.get("/tweets/:username", (req, res) => {
  const username = req.params.username;
  const userTweets = tweets.filter(
    (tweetsInfo) => tweetsInfo.username === username
  );

  if (userTweets.length <= 10) {
    res.send([...userTweets].reverse());
  } else {
    const orderedUserTweets = userTweets.slice(-10).reverse();
    res.send(orderedUserTweets);
  }
});

server.listen(5000);
