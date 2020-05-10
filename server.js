const express = require('express');

const server = express();

server.get('/', (req, res) => {

  res.status(200).send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const colors = {
    "noColor": "\033[0m",
    "red": "\033[1;31m",
    "green": "\033[1;32m",
    "yellow": "\033[1;33m",
    "blue": "\033[1;34m"
  }

  let code = res.statusCode

  if (code.toString()[0] === '2') {
    console.info(`${req.method} ${req.url} ${colors.green}${code}${colors.noColor}`)
  } else if (code.toString()[0] === '3') {
    console.info(`${req.method} ${req.url} ${colors.blue}${code}${colors.noColor}`)
  } else if (code.toString()[0] === '4') {
    console.info(`${req.method} ${req.url} ${colors.yellow}${code}${colors.noColor}`)
  } else if (code.toString()[0] === '5') {
    console.info(`${req.method} ${req.url} ${colors.red}${code}${colors.noColor}`)
  } else {
    console.info(`${req.method} ${req.url} ${code}`)
  }

  next()
}

module.exports = {
  server: server,
  logger: logger
}
