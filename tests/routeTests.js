const express = require('express');
const JsonAdmin = require('../index');
const app = express();
const jsonAdmin = new JsonAdmin();

app.use('/config', jsonAdmin);

app.listen(3000, () => {
  console.log('App started on port 3000');
});

