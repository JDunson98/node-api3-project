const express = require('express');
const usersRouter = require('./users/userRouter');

const server = express();

server.use(logger);
server.use(express.json());
server.use(usersRouter);

// error middleware that "catches" any errors from other middleware functions
server.use((err, req, res, next) => {
	// log the error and return a generic response to avoid the risk
	// of leaking sensitive info that might be in the error
	console.log(err)

	res.status(500).json({
		message: "Something went wrong, try again later",
	})
})

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const time = new Date().toISOString()
  console.log(`${time} ${req.ip} ${req.method} ${req.url}`)

  next()
}

module.exports = server;
