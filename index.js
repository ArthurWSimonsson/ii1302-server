var express = require("express");
var app = express();

const port = 3000

app.get('/get', (req, res) => res.send('Hello World!'))

app.post()



app.listen(port, () => console.log(`Example app listening on port ${port}!`))


