//DB connection
const { Client } = require('pg');

//fix ssl issue
const client = (() => {
  if (process.env.NODE_ENV !== 'production') {
    console.log("process.env.DATABASE_URL == %s", process.env.DATABASE_URL);
      return new Client({
          connectionString: process.env.DATABASE_URL,
          ssl: false
      });
  } else { //production
      console.log("process.env.DATABASE_URL == %s", process.env.DATABASE_URL);
      return new Client({
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false
          }
      });
  }})();

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
//End DB connection code

///Sequelize
const { sequelize } = require('./models')

async function main(){
  await sequelize.sync()
}

main()
//

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/url', function(req, res) {
    res.sendFile(path.join(__dirname + '/html2.html'));
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  console.log("DB connection string %s", process.env.DATABASE_URL)
  console.log("client.DATABASE_URL is %s", client.DATABASE_URL);

});
