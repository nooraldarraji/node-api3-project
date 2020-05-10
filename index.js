// code away!
const express = require('express')

const myServer = require('./server')
const server = myServer.server;
const logger = myServer.logger;

const postsRouter = require('./posts/postRouter')
const usersRouter = require('./users/userRouter')

server.use(express.json())
server.use(logger)


server.use('/api/posts', postsRouter)
server.use('/api/users', usersRouter)

const port = 6000;
server.listen(port, () => { console.log(`\n == Server up and running on port: ${port} == \n`) })