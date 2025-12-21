require('dotenv').config()

const app = require('./app')
const http = require('http')

const HOSTNAME = "0.0.0.0"
const PORT = process.env.PORT || 3000

app.set('port', PORT)

const server = http.createServer(app)

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running on http://${HOSTNAME}:${PORT}`)
})


// require('dotenv').config();

// const app = require('./app');
// const https = require('https');
// const fs = require('fs');

// const HOSTNAME = "192.168.1.196";
// const PORT = process.env.PORT || 3000;

// // const options = {
// //     key: fs.readFileSync('./certs/localhost-key.pem'),
// //     cert: fs.readFileSync('./certs/localhost.pem'),
// // };

// const server = https.createServer(options, app);

// server.listen(PORT, HOSTNAME, () => {
//     console.log(`HTTPS server running on https://${HOSTNAME}:${PORT}`);
// });
