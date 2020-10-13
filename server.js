const express = require('express'); 
const MongoClient = require('mongodb').MongoClient; 
const bodyParser = require('body-parser'); 
const app = express(); 
const port = 8000;

const uri = "mongodb+srv://graff811:1998Andreiko09@clusterlab2.jvjtz.mongodb.net/test?retryWrites=true&w=majority";
const dbName = 'ClusterLab2'; // можете исправить на другое имя, если хотите

// Некоторые настройки безопасности
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Для отправки post-запросов и чтения get-запросов
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

(async function () {
  let client;
  try {
    client = await MongoClient.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected correctly to server");

    const db = client.db(dbName);
    require('./app/routes')(app, db);

    app.listen(port, () => {
      console.log('We are live on ' + port);
    });
  } catch (err) {
    console.log(err.stack);
  }
})();