// code away!
const server = require('./server');

const port = process.send.PORT || 4000

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
});