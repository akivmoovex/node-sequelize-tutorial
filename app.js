//DB connection
const { Client } = require('pg');

/* const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});*/

//fix ssl issue
const client = (() => {
  if (process.env.NODE_ENV !== 'production') {
      return new Client({
          connectionString: process.env.DATABASE_URL,
          ssl: false
      });
  } else {
      return new Client({
          connectionString: process.env.DATABASE_URL,
          //ssl: false
          ssl: {rejectUnauthorized: false}
      });
  } })();


/*const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres://u724pr3kon35lj:pdc7baf32a7fb356338b919f91995eef15476787ff020e1ebde3f01945845357b@c2dr1dq7r4d57i.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com:5432/dahf5q0eco5cc7',
  ssl: process.env.DATABASE_URL ? true : false
})*/

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

//app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode %s", this.address().port, app.settings.env);
});
