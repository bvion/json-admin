const path = require('path');
const async = require('async');
const express = require('express');
const FileIO = require('./FileIO');

class JsonAdmin {
  constructor(params = {fileIOConfig: {}}) {
    this._fioOverrides = params.fileIOConfig;
    this._router = express.Router();
    this._init();

    return this._router;
  }

  _init() {
    this._configFile = new FileIO(Object.assign({}, {fileName: path.join(__dirname, '../config/json-admin.json')}, this._fioOverrides));

    async.waterfall(
      [
        (cb) => {
          this._readConfigFile(cb);
        },

        (cb) => {
          this._assignRoutes();
        }
      ],

      (err) => {
        if(err) {
          throw err;
        }
      }
    );
  }

  _readConfigFile(cb) {
    this._configFile.read((err, contents) => {
      if(err) return cb(err);

      this._config = JSON.parse(contents);
      cb();
    });
  }

  _assignRoutes() {
    this._router.get('/', (req, res) => {
      res.status(200).send('<h1 style="text-align:center">Hello World!</h1>');
    });
  }
}

module.exports = JsonAdmin;
