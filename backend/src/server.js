// require('dotenv').config()

// const app = require('./app')
// const http = require('http')
// const HOSTNAME = "192.168.1.196"

// app.set('port', process.env.PORT || 3000)

// const server = http.createServer(app)
// server.listen(process.env.PORT || 3000, HOSTNAME)

require('dotenv').config();

const app = require('./app');
const https = require('https');
const fs = require('fs');

const HOSTNAME = "192.168.1.196";
const PORT = process.env.PORT || 3000;

const options = {
    key: fs.readFileSync('./certs/localhost-key.pem'),
    cert: fs.readFileSync('./certs/localhost.pem'),
};

const server = https.createServer(options, app);

server.listen(PORT, HOSTNAME, () => {
    console.log(`HTTPS server running on https://${HOSTNAME}:${PORT}`);
});
