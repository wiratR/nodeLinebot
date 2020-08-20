'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  //channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  //channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: 'b975026f57306b763be009b04c01e8d1',
  channelSecret: 'ikcki1Ihb6ZlUIGdevxA+TDxsPH+CjB+OX8nBn9GDv4GUuPPkcaza5SkUKIfc3iOa2zx8cnvtWO6wBtxp1CTQO0e9FYN0xqh41PiOHUT4Bw8nUF46/F3Lx5aXGj5dN58l6sTOncCOkErZ0zXz/VTLAdB04t89/1O/w1cDnyilFU=',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});