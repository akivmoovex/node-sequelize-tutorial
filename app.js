const { sequelize } = require('./models')

async function main(){
  await sequelize.sync()
}

main()

/* const express = require('express');
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
*/