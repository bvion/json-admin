const net = require('net');
const fs = require('fs');
const async = require('async');
const path = require('path');

class FileIO {
  constructor(params = {servicePort: 4139, fileName: null}) {
    if(!params.fileName) {
      throw "File name is not set for FileIO module!";
    }

    this._port = 4139;
    this._fileName = params.fileName;
  }

  read(cb) {
    let portListener;
    let fileContents;

    async.waterfall(
      [
        (cb) => {
          this._getLock((err, server) => {
            if(err) {
              cb(err)
            } else {
              portListener = server;
              cb();
            }
          });
        },

        (cb) => {
          fs.readFile(path.join(this._fileName), 'utf-8', cb);
        },

        (content, cb) => {
          fileContents = content;
          portListener.close(cb);
        }
      ],

      (err) => {
        cb(err, fileContents);
      }
    );
  }

  _getLock(cb) {
    const server = net.createServer()
    
    server.on('error', (err) => {
      setTimeout(() => {
        this._getLock(cb);
      }, 100);
    });

    server.listen(this._port, '127.0.0.1', () => {
      cb(null, server);
    });
  }

  write(content, cb) {
    let portListener;

    async.waterfall(
      [
        (cb) => {
          this._getLock((err, server) => {
            if(err) {
              cb(err)
            } else {
              portListener = server;
              cb();
            }
          });
        },

        (cb) => {
          fs.writeFile(path.join(this._fileName), content, cb);
        },

        (cb) => {
          portListener.close(cb);
        }
      ],

      (err) => {
        cb(err);
      }
    );
  }
}

module.exports = FileIO;
