const express = require('express');
const app = express();
const os = require("os");

require('ejs');
require('./routes.js')(app, express);

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://` + os.hostname() + `:${port}...`)
})
