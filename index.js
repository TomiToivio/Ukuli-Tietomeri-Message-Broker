var Config = require('config-js');
var config = new Config('./config/config.js');
const mqtt_client_id = config.get('mqtt.clientId');
const mqtt_hostname = config.get('mqtt.hostname');
const mqtt_port = config.get('mqtt.port');
const mqtt_userName = config.get('mqtt.userName');
const mqtt_password = config.get('mqtt.password');

const mqtt = require('mqtt');
const mqtt_client  = mqtt.connect('mqtt://' + mqtt_hostname + ":" + Number(mqtt_port));

const mongo_user = config.get('mongo.user');
const mongo_password = config.get('mongo.password');
const mongo_host = config.get('mongo.host');
const mongo_port = config.get('mongo.port');
const mongo_database = config.get('mongo.database');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongo_url = 'mongodb://' + mongo_user + ':' + mongo_password + '@' + mongo_host + ':' + mongo_port + '/' + mongo_database; 

mqtt_client.on('connect', function () {
    client.subscribe("ukuli/#");
});
 
client.on('message', function (topic, message) {
  var topic = topic;
  var message = message;
  mongodbSave(topic,message);
});

function mongodbSave(topic,message) {

}
