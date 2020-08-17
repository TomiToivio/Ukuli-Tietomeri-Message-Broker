var Config = require('config-js');
var config = new Config('./config/config.js');
const api_user = config.get('api.user');
const api_password = config.get('api.password');

const couch_user = config.get('couch.user');
const couch_password = config.get('couch.password');
const couch_host = config.get('couch.host');
const couch_port = config.get('couch.port');
const couch_database = config.get('couch.database');

const couch_url = 'http://' + couch_user + ':' + couch_password + '@' + couch_host + ':' + couch_port; 
const nano = require('nano')(couch_url), per_page = 1000000, params = {include_docs: true, limit: per_page, descending: true};

const express = require('express');
const app = express();
 
app.get('/', function (req, res) {
  res.status(200);  
  res.send('Ukuli Data Tietomeri API');
});

app.post('/data', function (req, res) {
    var user = req.body.user;
    var password = req.body.password;
    var topic = req.body.topic;
    if(user === api_user && password === api_password) {
        res.status(200);
        var topic_json = getTopic(topic);
        res.end();
    } else {
        res.status(403);
        res.send('Invalid credentials');
        res.end();
    }
  });
   
app.listen(3000);

function getTopic(topic) {
    const query = {
        selector: {
          topic: { "$eq": topic},
        },
        fields: [ "_id", "_rev", "topic", "message", "time" ],
        limit:50000
      };

      nano.find(query).then((doc) => {
        console.log(doc);
      });
      

    nano.find(query, (err, body, header) => {
        if (err) {
            console.log('Error thrown: ', err.message);
            return;
        }
        console.log('HTTP header received: ', header);
        console.log('HTTP body received: ', body);
    });
}
