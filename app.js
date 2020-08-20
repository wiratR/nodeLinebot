'use strict';

const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed

const app = express()

// create LINE SDK config from env variables
const config = {
  //channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  //channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: 'b975026f57306b763be009b04c01e8d1',
  channelSecret: 'ikcki1Ihb6ZlUIGdevxA+TDxsPH+CjB+OX8nBn9GDv4GUuPPkcaza5SkUKIfc3iOa2zx8cnvtWO6wBtxp1CTQO0e9FYN0xqh41PiOHUT4Bw8nUF46/F3Lx5aXGj5dN58l6sTOncCOkErZ0zXz/VTLAdB04t89/1O/w1cDnyilFU=',
};

app.use(middleware(config))

app.post('/webhook', (req, res) => {
  res.json(req.body.events) // req.body will be webhook event object
})

app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }
  next(err) // will throw default 500
})

app.listen(8080)