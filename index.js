var express = require("express");
var app = express();

const port = 3000


var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

app.get('/get', (req, res) => res.send('Hello World!'))

// app.post()


// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});