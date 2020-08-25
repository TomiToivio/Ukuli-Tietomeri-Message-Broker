const Config = require('config-js');
const configPath = require('path').join(__dirname, 'config.js');
const config = new Config(configPath);

const aedes_mq = config.get('aedes.mq');
const aedes_concurrency = config.get('aedes.concurrency');
const aedes_persistence = config.get('aedes.persistence');
const aedes_queueLimit = config.get('aedes.queueLimit');
const aedes_maxClientsIdLength = config.get('aedes.maxClientsIdLength');
const aedes_maxClientsIdLength = config.get('aedes.mq');
const aedes_connectTimeout = config.get('aedes.connectTimeOut');
const aedes_id = config.get('aedes.id');
const aedes_username = config.get('aedes.username');
const aedes_password = config.get('aedes.password');
const aedes_port = config.get('aedes.port');

const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const port = 1883;

server.listen(port, function () {
  console.log('server started and listening on port ', port)
});