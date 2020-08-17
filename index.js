var Config = require('config-js');
var config = new Config('./config/config.js');
const mqtt_client_id = config.get('mqtt.clientId');
const mqtt_hostname = config.get('mqtt.hostname');
const mqtt_port = config.get('mqtt.port');
const mqtt_userName = config.get('mqtt.userName');
const mqtt_password = config.get('mqtt.password');

const mqtt = require('mqtt');
const mqtt_client  = mqtt.connect('mqtt://' + mqtt_hostname + ":" + Number(mqtt_port));

const couch_user = config.get('couch.user');
const couch_password = config.get('couch.password');
const couch_host = config.get('couch.host');
const couch_port = config.get('couch.port');
const couch_database = config.get('couch.database');

const couch_url = 'http://' + couch_user + ':' + couch_password + '@' + couch_host + ':' + couch_port; 
const nano = require('nano')(couch_url);

mqtt_client.on('connect', function () {
    console.log("Connect");
    client.subscribe("tietomeri/#");
});
 
mqtt_client.on('message', function (topic, message) {
  var topic = topic;
  var message = message;
  console.log(topic);
  console.log(message);
  couchSave(topic,message);
});

function couchSave(topic,message) {
    var unixtime = new Date();
    const tietomeri_couch = nano.use(couch_database);
    var doc = { topic: topic, message: message, time: unixtime };
    tietomeri_couch.insert(doc).then((body) => {
        console.log(body);
    });
}
