const express = require('express');
const FileIO = require('./FileIO');

class JsonAdmin {
  constructor(params = {}) {
    this._router = express.Router();
    this._init();

    return this._router;
  }

  _init() {
    this._assignRoutes();
  }

  _assignRoutes() {
    this._router.get('/', (req, res) => {
      res.status(200).send('<h1 style="text-align:center">Hello World!</h1>');
    });
  }
}

module.exports = JsonAdmin;
